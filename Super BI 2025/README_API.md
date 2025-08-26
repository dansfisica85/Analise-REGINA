# Super BI 2025 - API e Ferramentas

## Executar Extração

```bash
python extract_formulas.py
```

Gera arquivos:

- `indices_calculo_notas.md` / `.json`
- `componentes_pesos.csv` / `.xlsx`

## Iniciar API

```bash
python extract_formulas.py api
```

Endpoints:

- GET `/health`
- GET `/componentes`
- POST `/calcular`  (JSON com chaves AP,PP,PLAT,FORM,SARESP,APOIO,AJ)

Exemplo:

```json
{
  "AP": 1.2,
  "PP": 0.8,
  "PLAT": 1.5,
  "FORM": 1.0,
  "SARESP": 2.4,
  "APOIO": 0.3,
  "AJ": 0.5
}
```

Resposta:

```json
{"super_bi": 7.7}
```

## Testes

```bash
pytest -q
```

## OCR

Se páginas vazias, tenta OCR com pytesseract (necessário instalar Tesseract no sistema e garantir que esteja no PATH).
