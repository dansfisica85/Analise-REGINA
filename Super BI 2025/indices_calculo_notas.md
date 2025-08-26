# Índices e Cálculo de Notas

## Sumário
- Texto completo bruto
- Fórmulas detectadas
- Pesos / Percentuais detectados

## 1. Texto completo bruto
### Página 1
```
Entenda o Super BI
```
### Página 2
```
Novo Painel reformulado
Aluno Professor Apoio Ajuste de
Plataformas Formação SARESP NOTA
Presente Presente Presencial Desigualdades
Peso
1,5 1,0 2,0 2,0 3,0 0,5 1,0 11
```
### Página 3
```
Painel Aluno Presente:
Foco na Frequência em Sala de Aula
Número de Registros de Número de Registros Totais de
Presenças lançadas Presenças e Ausências lançadas
no Diário de Classe no Diário de Classe
97% de Frequência
Sobe exponencialmente até
atingir o peso máximo
Máximo de 1,5 no Super BI
```
### Página 4
```
Painel Aluno Presente:
Foco na Frequência em Sala de Aula
PESO
X
1,5
```
### Página 5
```
Painel Professor Presente:
Foco na Frequência em Sala de Aula
Número de Registros de Número de Registros Totais de
Presença no BFE Presenças e Ausências no BFE
100% de Frequência
Sobe exponencialmente até
atingir o peso máximo
Máximo de 1 no Super BI
```
### Página 6
```
Painel Professor Presente:
Foco na Frequência em Sala de Aula
PESO
X
1
```
### Página 7
```
Painel Plataformas:
Foco na Aprendizagem
Desempenho dos estudantes em cada
plataforma resultando em uma Nota
Final
Nota 10
Sobe linearmente até atingir o
peso máximo
Máximo de 2 no Super BI
```
### Página 8
```
Painel Plataformas:
Foco na Aprendizagem do Estudante
PESO
2
```
### Página 9
```
Painel Plataformas:
Metas por Plataforma (Super BI)
Plataforma​ Meta​
PESO
Tarefa SP​ >= 80% de acertos por alunos
2
Elefante Letrado​ >= 25 minutos por aluno por semana​
Redação SP​ >= 0,8 redações concluída a cada 5 semanas
Leia SP​ >= 120 minutos de leitura a cada 5 semanas
Speak >= 0,375 lições por semana
Alura >= 3 exercícios corretos até a 2ª tentativa
Matific >= 2 atividades concluídas por semana
Khan​ >= 3 atividades realizadas por aluno a cada 5 semanas
* Corresponde ao mensal
```
### Página 10
```
Plataformas
Percentuais de acordo com cada ciclo
Anos
Elefante Letrado Matific
Iniciais
Percentual 50% 50%
Redação
Anos Finais Tarefa SP Leia SP SPeak Matific Alura
Paulista
Percentual 30% 15% 15% 10% 20% 10%
Ensino Redação Khan
Tarefa SP LeiaSP SPeak Alura
Médio Paulista Academy
Percentual 30% 15% 15% 10% 20% 10%
```
### Página 11
```
Plataformas
Pontuação
PESO
X
2
```
### Página 12
```
APOIO PRESENCIAL
Foco no Apoio ao Professor em em Sala de Aula
Número de
Total de Apoios Número de
Semanas no
Realizados Membros da Equipe
Período
Gestora
Selecionado
3 Apoios por Gestor, por Semana
Sobe linearmente até atingir o peso
máximo
Máximo de 0,5 ponto no Super BI
```
### Página 13
```
APOIO PRESENCIAL
Foco no Apoio ao Professor em em Sala de Aula
PESO
X
0,5
```
### Página 14
```
SARESP
Novidade no Super BI
IC (Índice de Cumprimento) da Meta da própria
Unidade Escolar
100% da meta do IC
SARESP Sobe linearmente até atingir o peso
máximo
Máximo de 3 no Super BI
```
### Página 15
```
SARESP
PESO
X
3
Considerando (I) o último resultado do SARESP da unidade escolar, (II) o desempenho no SARESP 2024
e (III) a meta estabelecida para 2024, o IC representa a porcentagem de cumprimento dessa meta —
sendo que 50% equivale à meta ouro e 100% à meta diamante.
```
### Página 16
```
Formação
Planejamento de Aula e Multiplica
÷
50% PdA: Aulas concluídas Aulas Previstas
÷
50% Multiplica: Tempo assistido Tempo previsto
Planejamento de Aula:
100% dos ATPLs concluídos
Multiplica
100% de tempo de Aulas Assistidas
Formação
Sobe linearmente até atingir o peso máximo
Máximo de 2 ponto no Super BI
```
### Página 17
```
Formação
PESO
X
2
PdA Realizados Presenças Multiplica
NOTA (50% PdA + 50% Multiplica) = +
PdA Previstos Presenças + Faltas Multiplica
```
### Página 18
```
Planejamento de Aula
Multiplica
PESO
Para ser considerado "concluído"
2
deve ser assistido integralmente
Os ATPLs Previstos levam em consideração o
quantitativo geral de atribuições que o docente
tem em todas as escolas que leciona, bem como
os ATPLs Concluídos são contabilizados para
todasas Unidades Escolares
A % de tempo assistido reflete quanto
tempo de aula o cursista assistiu em
relação a quantidade de tempo (em
minutos) prevista.
```
### Página 19
```
Ajuste de Desigualdades
Com o objetivo de equilibrar a nota, temos agora o Ajuste de Desigualdades que agora leva em consideração,
além da % de alunos em vulnerabilidade, também o tamanho, o tipo de Escola e o Ciclo.
% ALUNOS TAMANHO (alunos) PONTOS TIPO PONTOS CICLO PONTOS
PONTOS
VULNERÁVEIS
Abaixo de 300 0 PEI 0 AI 0
10% 0,1
De 300 a 499 0 a 0,075 Parcial 0,3 AF 0,12
20% 0,2
DE 500 a 865 0,1 a 0,18 EM 0,3
…
Acima de 865 0,225 a 0,3
Ajuste de desigualdades = Alunos em Vulnerabilidade + Tamanho + Tipo + Ciclo
COM LIMITAÇÃO DE ATÉ 1 PONTO NO SUPER BI
% Alunos vulneráveis Tamanho Tipo Ciclo Total
50% 866 alunos Parcial Ensino Médio
0,5 0,225 0,3 0,3 1,325 1
* Média ponderada pelo quantitativo de alunos de cada
Ciclo
```
### Página 20
```
Novo Super BI
Faróis de Acompanhamento
Cores Vermelho Amarelo Verde
Métrica
Indicadores Menor que Entre Maior igual
Aluno Presente 85% 85% a 90% 90% Frequência aluno
Professor Presente 87,5% 87,5% a 92,5% 92,5% Frequência professor
Plataformas 5 5 e 7,5 7,5 Nota plataforma
Formação 50% 50% a 75% 75% PdA + Multiplica
Apoio 2 2 e 3 3 Apoio por gestor
SARESP 60% 60% e 90% 90% Nota SARESP
Observação: a meta do SARESP diz respeito ao piso das 20% melhores escolas, levando em consideração ciclo e se a
Unidade Escolar é do PEI ou de tempoparcial.
```
### Página 21
```
PLATAFORMAS
```
### Página 22
```
TAREFA SP
Painel Plataformas
TotaldeRespostas no Período
Índice de Acertos
=
por Aluno
Total de Matrículas × Total de Semanas
>= 80% de tarefas corretas por alunos
Sobe linearmente até atingir o peso máximo
Máximo de 3 no Painel Plataformas
```
### Página 23
```
TAREFA SP
Painel Plataformas
```
### Página 24
```
ELEFANTE LETRADO
Painel Plataformas
Tempo de Leitura em Tempo Total de Leitura em Minutos
=
Minutos por Aluno
Total de Matrículas × Total de Semanas
>= 25 minutos por aluno por semana​
Sobe linearmente até atingir o peso
máximo
Máximo de 2 no Painel Plataformas
```
### Página 25
```
ELEFANTE LETRADO
Painel Plataformas
```
### Página 26
```
REDAÇÃO SP
Painel Plataformas
Índice de Redações (Redações Concluídas + Redações Devolvidas)
=
Concluídas (mês)
Total de Matrículas (nos últimos 30 dias)
>= 0,8 redações concluída a cada
5 semanas (mensal)
Sobe linearmente até atingir o peso máximo
Máximo de 1,5 no Painel Plataformas
```
### Página 27
```
REDAÇÃO SP
Painel Plataformas
```
### Página 28
```
LEIA SP
Painel Plataformas
Tempo de Leitura em Tempo total de leitura (últimas 5 semanas)
=
Minutos por Aluno
Total de alunos x Total de semanas
>= 120 minutos de leitura a cada
*5 semanas
Sobe linearmente até atingir o peso
máximo
Máximo de 1,5 no Painel Plataformas
```
### Página 29
```
LEIA SP
Painel Plataformas
```
### Página 30
```
SPeak
Painel Plataformas
Índice de Lições Total de Lições Realizadas
=
Realizadas
Total de Matrículas x Total de Semanas
>= 0,375 lições por semana
Sobe linearmente até atingir o peso máximo
Máximo de 1 no Painel Plataformas
```
### Página 31
```
SPeak
Painel Plataformas
```
### Página 32
```
ALURA
Painel Plataformas
Índice de Exercícios Exercícios certos até a 2ª tentativa
=
Corretos até a 2ª Tentativa
Total de Matrículas ×Total de Semanas
>= 3 exercícios corretos até a 2ª tentativa
Sobe linearmente até atingir o peso
máximo
Máximo de 1 no Painel Plataformas
```
### Página 33
```
ALURA
Painel Plataformas
```
### Página 34
```
MATIFIC
Painel Plataformas
Índice Semanal de Atividades Atividades Concluídas
=
Concluídas por Aluno
Total de Matrículas ×Total de Semanas
>= 2 atividades concluídas por semana
(com um tempo total ou inferior a 30 minutos de uso)
Sobe linearmente até atingir o peso máximo
Máximo de 2 no Painel Plataformas
```
### Página 35
```
MATIFIC
Painel Plataformas
```
### Página 36
```
KHAN ACADEMY
Painel Plataformas
Índice de Questões Total de Questões Realizadas
=
Realizadas por Aluno
Alunos Previstos ×Total de Semanas
>= 3 atividades realizadas por aluno a
cada 5 semanas (mensal)
Sobe linearmente até atingir o peso
máximo
Máximo de 2 no Painel Plataformas
```
### Página 37
```
KHAN ACADEMY
Painel Plataformas
```
### Página 38
```

```
### Página 39
```
Dúvidas Frequentes
```
### Página 40
```
Aluno Presente
1. Os alunos foram participar de uma atividade de visita em um museu no início do
mês e na semana seguinte participaram de Jogos Escolares Estaduais. Minha
escola teve a frequência no Painel prejudicada.
R: Não
2. Na última quinta-feira minha escola esteve fechada por motivo de feriado
municipal. A frequência no Painel ficou prejudicada.
R: Não
3. O registro de conteúdo das aulas ministradas não reflete no Indicador de Aulas
Dadas.
R: Sim
```
### Página 41
```
Professor Presente
1.A Unidade Escolar só pontua no Professor Presente no Super BI após
80% de presença.
R: Sim
2. Meu professor levou seus alunos em uma visita no museu da cidade e teve
ausência computada no Painel.
R: Não
3. A partir de 95% de presença a Unidade Escolar “pontua 1” no Super BI.
R: Não. Apenas 100% pontua 1.
```
### Página 42
```
SARESP
1. As metas do SARESP para o super BI são diferentes para os Anos Iniciais,
Finais e Ensino Médio.
R: Sim
2. As metas do SARESP para o super BI são iguais para PEI e Parciais.
R: Não
3. A minha nota do SARESP impactará na minha nota do Super BI durante o ano
todo ?
R: Sim
```
### Página 43
```
Apoio Presencial
1. O feedback ao professor em apoio nesta segunda-feira, ficará para a semana
seguinte, não havendo prejuízo no indicador.
R: Não
2. O Super BI vai considerar Apoios realizados também nos Anos Iniciais.
R: Sim
3. O apoio realizado em qualquer turma será contabilizado para o Super BI.
R: Sim.
```

## 2. Fórmulas detectadas (agrupadas por variável)
### Variável / Grupo: AM
- A + M

## 3. Pesos / Percentuais identificados
- 10%
- 100%
- 15%
- 20%
- 30%
- 50%
- 60%
- 75%
- 80%
- 85%
- 87,5%
- 90%
- 92,5%
- 95%
- 97%

## 4. Observações e Próximos Passos
- As fórmulas foram extraídas por regex heurísticas; revisar manualmente para validar.
- Adaptar nomes das variáveis a um dicionário controlado (ex: NF = Nota Final, MI = Média Inicial, etc.).
- Caso existam imagens com fórmulas, usar OCR adicional (ex: `pytesseract`).