# Extração de Texto, Fórmulas e Pesos – Super BI 2025

Este projeto extrai o texto do PDF `Super_BI_2025_05.pdf`, tenta identificar fórmulas de cálculo de notas e pesos/percentuais, organizando tudo em arquivos estruturados.

## Arquivos Gerados

- `indices_calculo_notas.md` – Documento Markdown organizado com:
	- Texto completo (por página)
	- Fórmulas heurísticas agrupadas
	- Pesos / percentuais detectados
- `indices_calculo_notas.json` – Mesmo conteúdo em formato estruturado para uso programático.

## Dependências

Listadas em `requirements.txt`:

```text
pdfplumber
pdfminer.six
```

Instalação (Windows PowerShell):

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Uso

```powershell
python extract_formulas.py
```

## Estratégia de Extração

1. Extração de texto página a página (`pdfplumber`).
2. Varredura com expressões regulares para localizar padrões de fórmulas (ex: `VAR = expressão`, menções a "Nota Final", "Média", etc.).
3. Busca de pesos e percentuais (palavra "peso" ou números seguidos de `%`).
4. Agrupamento por variável (normalizando o lado esquerdo da igualdade) para facilitar revisão.

## Limitações & Próximos Passos

- Fórmulas contidas apenas em imagens não serão detectadas (necessário OCR com `pytesseract`).
- Pode haver falsos positivos (linhas de texto comuns interpretadas como fórmulas) e falsos negativos (fórmulas mais complexas não reconhecidas).
- Recomenda-se revisão manual do arquivo Markdown para normalizar nomes e consolidar a fórmula oficial da nota final.
- Caso haja uma fórmula canônica de índice final, ela pode ser adicionada manualmente em uma seção específica no Markdown.

## Extensões Possíveis

- Adicionar um mapeamento de variáveis para descrições (ex: `NF -> Nota Final`).
- Calcular automaticamente uma nota exemplo a partir de valores simulados.
- Exportar para Excel/CSV uma tabela de componentes e pesos.

---
Gerado automaticamente pelo script `extract_formulas.py`.
