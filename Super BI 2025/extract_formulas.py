import re
import json
from pathlib import Path
from typing import List, Dict, Tuple, Optional

import pdfplumber

try:
	import pytesseract  # OCR
	from PIL import Image
except Exception:  # optional
	pytesseract = None  # type: ignore
	Image = None  # type: ignore

PDF_PATH = Path("Super_BI_2025_05.pdf")
OUTPUT_MD = Path("indices_calculo_notas.md")
OUTPUT_JSON = Path("indices_calculo_notas.json")
OUTPUT_CSV = Path("componentes_pesos.csv")
OUTPUT_XLSX = Path("componentes_pesos.xlsx")

# Padrões de fórmulas mais ricos (inclui divisões, porcentagens normalizadas, expressões com parênteses)
FORMULA_PATTERNS = [
	r"([A-ZÁÉÍÓÚÃÕÇ]{1,8}\s*=\s*[^\n]+)",  # VAR = expressão
	r"([Ii]nd[ií]c[ei]\w*\s*=\s*[^\n]+)",
	r"(Nota Final[^\n:=]*[:=]\s*[^\n]+)",
	r"(M[ée]dia[^\n]*=\s*[^\n]+)",
	r"([A-Z]{1,6}\d?\s*/\s*[A-Z]{1,6}\d?(?:\s*[+\-*/]\s*[A-Z]{1,6}\d?)*)",  # divisões compostas
	r"([A-Z]{1,6}\d?\s*[+\-*/]\s*[A-Z]{1,6}\d?(?:\s*[+\-*/]\s*[A-Z]{1,6}\d?)*)",  # expressões simples
]

WEIGHT_PATTERNS = [
	r"peso\s*(\d+(?:[,.]\d+)?)",
	r"(\d+(?:[,.]\d+)?)[ ]*%",
]

COMPONENTES_BASE = [
	{"componente": "Aluno Presente", "simbolo": "AP", "peso_max": 1.5},
	{"componente": "Professor Presente", "simbolo": "PP", "peso_max": 1.0},
	{"componente": "Plataformas", "simbolo": "PLAT", "peso_max": 2.0},
	{"componente": "Formação", "simbolo": "FORM", "peso_max": 2.0},
	{"componente": "SARESP", "simbolo": "SARESP", "peso_max": 3.0},
	{"componente": "Apoio Presencial", "simbolo": "APOIO", "peso_max": 0.5},
	{"componente": "Ajuste Desigualdades", "simbolo": "AJ", "peso_max": 1.0},
]

def extract_text(pdf_path: Path, ocr: bool = True) -> List[str]:
	pages_text: List[str] = []
	with pdfplumber.open(pdf_path) as pdf:
		for i, page in enumerate(pdf.pages):
			try:
				txt = page.extract_text() or ""
			except Exception:
				txt = ""
			# OCR fallback se página quase vazia e OCR disponível
			if ocr and pytesseract and len(txt.strip()) < 15:
				try:
					im = page.to_image(resolution=300).original
					ocr_txt = pytesseract.image_to_string(im, lang="por")
					if len(ocr_txt.strip()) > len(txt.strip()):
						txt = ocr_txt
				except Exception:
					pass
			pages_text.append(txt)
	return pages_text

def _normalize_line(line: str) -> str:
	# remove múltiplos espaços, normaliza % com vírgula para ponto
	line = re.sub(r"\s+", " ", line.strip())
	return line

def _join_broken_formula_lines(lines: List[str]) -> List[str]:
	joined: List[str] = []
	buffer = ""
	for line in lines:
		l = line.rstrip()
		if buffer:
			# se parece continuação (começa com operador ou fecha parênteses ausente)
			if re.match(r"^[+\-*/=)]", l) or not re.search(r"[.=]$", buffer):
				buffer += " " + l
				if re.search(r"=.+", buffer):
					joined.append(buffer)
					buffer = ""
				continue
			else:
				joined.append(buffer)
				buffer = ""
		if re.search(r"=\s*$", l):  # linha termina com '=' provável continuação
			buffer = l
		else:
			joined.append(l)
	if buffer:
		joined.append(buffer)
	return joined

def find_formulas(lines: List[str]) -> List[str]:
	cleaned = [_normalize_line(l) for l in lines if l.strip()]
	cleaned = _join_broken_formula_lines(cleaned)
	formulas = set()
	for line in cleaned:
		for pat in FORMULA_PATTERNS:
			for m in re.finditer(pat, line):
				frag = m.group(1).strip()
				if len(frag) < 5:
					continue
				# normalizar porcentagens: 80% -> 0.80 (mantém original também?)
				def pct_to_decimal(s: str) -> str:
					return re.sub(r"(\d{1,3})(?:,(\d+))?%", lambda mm: str(round(float(mm.group(1).replace(',', '.') + ('.' + (mm.group(2) or '')))/100,4)), s)
				frag_norm = pct_to_decimal(frag)
				formulas.add(frag_norm)
	return sorted(formulas)

def find_weights(lines: List[str]) -> List[str]:
	weights = set()
	for line in lines:
		low = line.lower()
		if 'peso' in low or '%' in low:
			for pat in WEIGHT_PATTERNS:
				for m in re.finditer(pat, low):
					weights.add(m.group(0).strip())
	return sorted(weights)

def group_related(formulas: List[str]) -> Dict[str, List[str]]:
	groups: Dict[str, List[str]] = {}
	for f in formulas:
		left = f.split('=')[0].strip() if '=' in f else f
		key = re.sub(r"[^A-ZÁÉÍÓÚÃÕÇ]+", "", left.upper())[:12] or 'OUTROS'
		groups.setdefault(key, []).append(f)
	return groups

def build_markdown(full_text: List[str], formulas: Dict[str, List[str]], weights: List[str]) -> str:
	md = [
		"# Índices e Cálculo de Notas",
		"",
		"## Sumário",
		"- Texto completo bruto",
		"- Fórmulas detectadas",
		"- Pesos / Percentuais detectados",
		"",
		"## 1. Texto completo bruto"
	]
	for i, page in enumerate(full_text, start=1):
		md.append(f"### Página {i}")
		md.append("```text")
		md.append(page.strip())
		md.append("```")
	md.append("\n## 2. Fórmulas detectadas (agrupadas por variável)")
	if not formulas:
		md.append("Nenhuma fórmula claramente identificada pelos padrões heurísticos.")
	else:
		for key, items in formulas.items():
			md.append(f"### Variável / Grupo: {key}")
			for f in items:
				md.append(f"- {f}")
	md.append("\n## 3. Pesos / Percentuais identificados")
	if weights:
		for w in weights:
			md.append(f"- {w}")
	else:
		md.append("Nenhuma referência de peso/percentual encontrada pelos padrões.")
	md.append("\n## 4. Observações e Próximos Passos")
	md.append("- As fórmulas foram extraídas por regex heurísticas; revisar manualmente para validar.")
	md.append("- Adaptar nomes das variáveis a um dicionário controlado (ex: NF = Nota Final, MI = Média Inicial, etc.).")
	md.append("- Caso existam imagens com fórmulas, usar OCR adicional (ex: `pytesseract`).")
	return "\n".join(md)

# ================= Cálculo SUPER_BI ====================
def calcular_super_bi(metricas: Dict[str, float]) -> float:
	"""Calcula SUPER_BI a partir de um dicionário de métricas já normalizadas ou brutas.
	Espera chaves: AP, PP, PLAT, FORM, SARESP, APOIO, AJ (cada uma no intervalo 0..peso_max correspondente)."""
	pesos = {c['simbolo']: c['peso_max'] for c in COMPONENTES_BASE}
	total = 0.0
	for simbolo, peso_max in pesos.items():
		valor = float(metricas.get(simbolo, 0.0))
		if valor > peso_max:
			valor = peso_max
		total += valor
	return round(total, 4)

def export_componentes_csv_excel():
	try:
		import pandas as pd  # lazy import
		df = pd.DataFrame(COMPONENTES_BASE)
		df.to_csv(OUTPUT_CSV, index=False, encoding='utf-8')
		df.to_excel(OUTPUT_XLSX, index=False)
	except Exception as e:
		print(f"Falha exportando CSV/Excel: {e}")

# ================= API (FastAPI) =======================
def build_api_app():
	from fastapi import FastAPI, HTTPException
	from pydantic import BaseModel, Field

	class MetricasInput(BaseModel):
		AP: float = Field(0, ge=0)
		PP: float = Field(0, ge=0)
		PLAT: float = Field(0, ge=0)
		FORM: float = Field(0, ge=0)
		SARESP: float = Field(0, ge=0)
		APOIO: float = Field(0, ge=0)
		AJ: float = Field(0, ge=0)

	app = FastAPI(title="Super BI API", version="1.0")

	@app.get("/health")
	def health():
		return {"status": "ok"}

	@app.post("/calcular")
	def calcular(m: MetricasInput):
		total = calcular_super_bi(m.dict())
		return {"super_bi": total}

	@app.get("/componentes")
	def componentes():
		return COMPONENTES_BASE

	return app

def main(run_api: bool = False):
	if not PDF_PATH.exists():
		raise SystemExit(f"Arquivo PDF não encontrado: {PDF_PATH}")
	pages = extract_text(PDF_PATH)
	all_lines: List[str] = []
	for p in pages:
		all_lines.extend(p.splitlines())
	formulas_list = find_formulas(all_lines)
	weights_list = find_weights(all_lines)
	grouped = group_related(formulas_list)

	OUTPUT_MD.write_text(build_markdown(pages, grouped, weights_list), encoding='utf-8')
	OUTPUT_JSON.write_text(json.dumps({
		'formulas_grouped': grouped,
		'weights': weights_list,
		'pages': pages
	}, ensure_ascii=False, indent=2), encoding='utf-8')
	export_componentes_csv_excel()
	print(f"Gerado: {OUTPUT_MD}, {OUTPUT_JSON}, {OUTPUT_CSV}, {OUTPUT_XLSX}")

	if run_api:
		import uvicorn
		app = build_api_app()
		uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == '__main__':
	# Para iniciar API: python extract_formulas.py api
	import sys
	main(run_api=(len(sys.argv) > 1 and sys.argv[1].lower() == 'api'))
