# Modelo Consolidado de Cálculo – Super BI 2025

Este documento organiza, de forma estruturada, as componentes, fórmulas, pesos e limites usados para compor a Nota Final (Super BI). Baseado no conteúdo textual extraído do PDF `Super_BI_2025_05.pdf`.

## 1. Estrutura Geral e Pesos Máximos

| Componente                | Símbolo | Peso Máximo |
|---------------------------|---------|-------------|
| Aluno Presente            | AP      | 1.5         |
| Professor Presente        | PP      | 1.0         |
| Plataformas               | PLAT    | 2.0         |
| Formação (PdA + Multiplica)| FORM   | 2.0         |
| SARESP (IC da Meta)       | SARESP  | 3.0         |
| Apoio Presencial          | APOIO   | 0.5         |
| Ajuste de Desigualdades   | AJ      | 1.0 (teto)  |
| TOTAL                     |         | 11.0        |

Nota Final (Super BI):

```text
SUPER_BI = AP + PP + PLAT + FORM + SARESP + APOIO + AJ   (limite superior teórico = 11.0)
```

---
## 2. Regras / Fórmulas por Componente

### 2.1 Aluno Presente (AP)

- Métrica base: Frequência de alunos em sala (F_aluno, em % ou 0–1).
- Crescimento: “Sobe exponencialmente até atingir o peso máximo”. (Função exata não especificada no material – requer confirmação oficial.)
- Modelo sugerido (placeholder, ajustar quando fórmula oficial estiver disponível):

```text
AP = 1.5 * f_exp(F_aluno)
onde f_exp(F) ∈ [0,1] e f_exp(limiar_alta) ≈ 1 (ex.: F ≥ 0.97)
```

### 2.2 Professor Presente (PP)

- Métrica base: Frequência de lançamentos de presença do professor (F_prof).
- Também “sobe exponencialmente” até o máximo de 1.0 (função exata não detalhada).

```text
PP = 1.0 * f_exp(F_prof)
```
Observação: Cores/faróis indicam faixas (ex.: 87,5%, 92,5%, 100%).

### 2.3 Plataformas (PLAT)

Peso máximo agregado: 2.0. Composição depende do ciclo.

#### 2.3.1 Pesos Internos por Ciclo

| Ciclo / Ano        | Subindicadores (ordem)                                  | Percentuais (somam 100%) |
|--------------------|---------------------------------------------------------|--------------------------|
| Anos Iniciais      | Elefante Letrado, Matific                               | 50%, 50%                |
| Anos Finais        | Tarefa SP, Leia SP, SPeak, Matific, Alura, Redação SP   | 30%,15%,15%,10%,20%,10% |
| Ensino Médio       | Tarefa SP, Leia SP, SPeak, Alura, Redação SP, Khan Acad.| 30%,15%,15%,20%,10%,10% |

Cada subindicador i gera um score normalizado si ∈ [0,1] via relação linear até sua meta alvo (≥ meta → si=1), salvo indicação distinta. A nota da componente Plataformas:

```text
PLAT = 2.0 * Σ ( w_i * s_i )
onde Σ w_i = 1 para o ciclo correspondente
```

#### 2.3.2 Fórmulas dos Subindicadores

| Nome              | Fórmula Base                                                                                           | Meta (s_i=1)                         |
|-------------------|---------------------------------------------------------------------------------------------------------|--------------------------------------|
| Tarefa SP         | Índice de Acertos = (Total de Respostas no Período) / (Matrículas × Semanas)                            | ≥ 80%                                |
| Elefante Letrado  | Minutos por Aluno = (Tempo Total Leitura em Minutos) / (Matrículas × Semanas)                           | ≥ 25 min / aluno / semana           |
| Redação SP        | Índice Redações = (Redações Concluídas + Redações Devolvidas) / Matrículas (últimos 30 dias)            | ≥ 0,8 por 5 semanas (mensal)        |
| Leia SP           | Minutos por Aluno (5 sem.) = (Tempo total leitura 5 sem.) / (Alunos × Semanas)                          | ≥ 120 min a cada 5 semanas          |
| SPeak             | Lições por Aluno = (Total de Lições Realizadas) / (Matrículas × Semanas)                                | ≥ 0,375 lições / semana             |
| Alura             | Exercícios corretos (2ª tentativa) / (Matrículas × Semanas)                                             | ≥ 3                                  |
| Matific           | Atividades Concluídas / (Matrículas × Semanas)                                                          | ≥ 2 / semana                         |
| Khan Academy      | Questões Realizadas / (Alunos Previstos × Semanas)                                                      | ≥ 3 atividades / 5 semanas          |

Normalização linear típica (quando aplicável):

```text
se metric < meta: s = metric / meta
senão:           s = 1
```
Observação: Algumas descrições citam crescimento linear (“Sobe linearmente…”). Caso haja plataformas com regras diferentes (exponencial), ajustar.

### 2.4 Formação (FORM)

Composta por Planejamento de Aula (PdA) e Multiplica.

```text
PdA = Aulas Concluídas / Aulas Previstas
Multiplica = Tempo Assistido / Tempo Previsto
FORM = 2.0 * ( 0.5 * min(PdA,1) + 0.5 * min(Multiplica,1) )
```

### 2.5 SARESP

Índice de Cumprimento (IC) da meta da Unidade Escolar.

```text
SARESP = 3.0 * min( IC / 100%, 1 )
```
Meta diamante: 100% (IC). Meta ouro (intermediária) ~ 50% (referência de comunicação visual / faróis).

### 2.6 Apoio Presencial (APOIO)

Regra: “3 Apoios por Gestor por Semana” → linear até o máximo.
Definir:

```text
Razão_Apoio = Apoios Realizados / (3 × Nº Gestores × Nº Semanas)
APOIO = 0.5 * min(Razão_Apoio, 1)
```

### 2.7 Ajuste de Desigualdades (AJ)

Composição aditiva de quatro fatores, com teto de 1 ponto:

```text
AJ = min( PctVuln + PontosTamanho + PontosTipo + PontosCiclo, 1.0 )
```
Exemplo dado:

```text
PctVuln = 0.50
PontosTamanho (866 alunos) = 0.225
PontosTipo (Parcial) = 0.30
PontosCiclo (Ensino Médio) = 0.30
Soma = 1.325 ⇒ AJ = 1.0 (após teto)
```
Observação: Tabela textual indicou faixas (ex.: % vulneráveis: 10% → 0,1; 20% → 0,2; 50% → 0,5). Interpolação entre marcos pode exigir esclarecimento oficial.

---
## 3. Fórmula Consolidada

```text
SUPER_BI = AP + PP + PLAT + FORM + SARESP + APOIO + AJ
    ≤ 11.0
```

Onde cada parcela é calculada conforme seções anteriores. Funções exatas de crescimento “exponencial” (AP, PP) devem ser confirmadas; placeholders lineares ou exponenciais parametrizadas podem ser provisoriamente aplicadas.

---
## 4. Possível Implementação (Pseudo‑código)

```python
def linear_ratio(value, target):
    return min(value / target, 1.0)

def plataformas_score(metricas, metas, pesos, peso_max=2.0):
    # metricas/metas/pesos: dict chave -> valor
    total = 0.0
    for k, meta in metas.items():
        m = metricas.get(k, 0.0)
        s = linear_ratio(m, meta)
        total += pesos[k] * s
    return peso_max * total

def formacao_score(pda, multiplica):
    return 2.0 * (0.5 * linear_ratio(pda, 1) + 0.5 * linear_ratio(multiplica, 1))

def apoio_score(apoios_realizados, gestores, semanas):
    denom = 3 * gestores * semanas
    return 0.5 * linear_ratio(apoios_realizados / denom if denom else 0, 1)

def saresp_score(ic):  # ic em 0..1
    return 3.0 * linear_ratio(ic, 1)

def ajuste_desigualdades(pct_vuln_pts, tam_pts, tipo_pts, ciclo_pts):
    return min(pct_vuln_pts + tam_pts + tipo_pts + ciclo_pts, 1.0)

def super_bi(ap, pp, plat, form, saresp, apoio, ajuste):
    return ap + pp + plat + form + saresp + apoio + ajuste
```

---
## 5. Lacunas / Itens a Confirmar

| Item | Descrição | Ação Recomendada |
|------|-----------|------------------|
| Função exponencial AP/PP | Não documentada | Solicitar fórmula oficial (curva ou pontos) |
| Faixas detalhadas ajuste tamanho | Intervalos com subfaixas (0 a 0,075; 0,1 a 0,18; 0,225 a 0,3) | Confirmar regra de interpolação |
| Khan vs Redação no Ensino Médio | Tabela sugere Khan Academy no EM | Validar se Redação permanece ou troca por Khan |
| Precisão metas Redação (0,8/5 sem) | Interpretação mensal | Confirmar janela cálculo oficial |

---
## 6. Referência de Percentuais (Faróis)

Indicadores possuem faixas de cor; úteis para dashboards / alertas:

| Indicador          | Vermelho        | Amarelo              | Verde                 |
|--------------------|-----------------|----------------------|-----------------------|
| Aluno Presente     | < 85%           | 85% – < 90%          | ≥ 90%                 |
| Professor Presente | < 87,5%         | 87,5% – < 92,5%      | ≥ 92,5% (100% = 1,0)  |
| Plataformas (nota) | < 5             | 5 – < 7,5            | ≥ 7,5                 |
| Formação           | < 50%           | 50% – < 75%          | ≥ 75%                 |
| Apoio (apoios/gest)| < 2             | 2 – < 3              | ≥ 3                   |
| SARESP (IC)        | < 60%           | 60% – < 90%          | ≥ 90% (100% = máximo) |

---
## 7. Resumo Rápido

```text
SUPER_BI = (Frequência Aluno) + (Frequência Professor) + (Σ Plataformas normalizadas *2) +
           (0.5 PdA + 0.5 Multiplica)*2 + (IC SARESP *3) + (Apoios *0.5) + (Ajuste cap 1)
```

Onde cada termo é previamente limitado ao seu peso máximo.

---
Documento gerado e estruturado a partir da extração automática; revise e ajuste conforme normas oficiais.