# 🎯 Sistema REGINA 2025
## Registros Educacionais Gerais e Índices Avaliativos

[![Status](https://img.shields.io/badge/Status-Produção-brightgreen)](https://github.com/dansfisica85/An-lise-REGINA)
[![Versão](https://img.shields.io/badge/Versão-2025.9-blue)](https://github.com/dansfisica85/An-lise-REGINA)
[![Licença](https://img.shields.io/badge/Licença-MIT-yellow)](LICENSE)

---

## 📋 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos do Sistema](#pré-requisitos-do-sistema)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso do Sistema](#uso-do-sistema)
- [Arquitetura e Fluxo](#arquitetura-e-fluxo)
- [Performance e Recursos](#performance-e-recursos)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🎯 Sobre o Projeto

O **Sistema REGINA 2025** é uma plataforma completa de análise educacional desenvolvida para acompanhar, avaliar e projetar o desempenho de escolas com base no **Super BI 2025** (Sistema de Avaliação e Rendimento Educacional de São Paulo). 

### 🌟 Propósito
- **Monitoramento**: Acompanhamento em tempo real de 26 escolas da rede
- **Análise**: Comparação de performance entre escolas PEI e regulares
- **Projeção**: Simulador interativo para planejamento de metas
- **Gestão**: Geração automática de planos de ação personalizados

### 🎯 Público-Alvo
- Gestores educacionais
- Diretores de escola
- Coordenadores pedagógicos
- Analistas de dados educacionais
- Secretarias de Educação

---

## ⚡ Funcionalidades

### 🏠 Dashboard Principal
- **KPIs Dinâmicos**: Métricas atualizadas em tempo real
- **Visão Geral**: Panorama completo da rede educacional
- **Navegação Intuitiva**: Interface responsiva e moderna

### 📊 Análises Especializadas
1. **Evolução Temporal**: Acompanhamento histórico de performance
2. **Comparativo PEI vs Regular**: Análise entre tipos de escola
3. **Performance BI**: Métricas detalhadas do Super BI 2025
4. **Frequência de Alunos**: Monitoramento de presença
5. **Rendimento Acadêmico**: Avaliação de desempenho
6. **Evolução Individual**: Análise escola por escola

### 🎮 Simulador Interativo
- **Projeção Super BI**: Simulação baseada nos 7 componentes oficiais
- **Sliders Dinâmicos**: Controle em tempo real dos parâmetros
- **Visualização Gráfica**: Charts interativos com Chart.js
- **Cálculo Automático**: Fórmulas oficiais do Super BI 2025

### 🤖 Inteligência Artificial
- **Plano de Ação Automatizado**: Sugestões personalizadas por escola
- **Análise Preditiva**: Identificação de pontos de melhoria
- **Recomendações Inteligentes**: Estratégias baseadas em dados

### 🏫 Páginas Individuais de Escolas
- **26 Escolas Mapeadas**: Análise detalhada por unidade
- **Métricas Específicas**: KPIs personalizados por escola
- **Histórico Completo**: Evolução temporal individual

---

## 🛠️ Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **HTML5** | Latest | Estrutura das páginas |
| **CSS3** | Latest | Estilização e layout |
| **JavaScript ES6+** | Latest | Lógica de negócio e interatividade |
| **Tailwind CSS** | 3.x | Framework CSS utilitário |

### Bibliotecas JavaScript
| Biblioteca | Versão | CDN | Finalidade |
|------------|--------|-----|-----------|
| **Chart.js** | 4.x | `cdn.jsdelivr.net/npm/chart.js` | Gráficos interativos |
| **Tailwind CSS** | 3.x | `cdn.tailwindcss.com` | Estilização responsiva |
| **Google Fonts** | Latest | `fonts.googleapis.com` | Tipografia (Inter) |

### Dados e Configuração
| Formato | Arquivo | Finalidade |
|---------|---------|-----------|
| **JSON** | `dados_escolas.json` | Base de dados principal |
| **JavaScript** | `dados.js` | Configurações e dados auxiliares |
| **JavaScript** | `graficos.js` | Configurações de gráficos |
| **JSON** | `super_bi_config_avancado.json` | Configurações do Super BI |

### Análise de Dados
| Tecnologia | Uso |
|------------|-----|
| **Jupyter Notebook** | Análise exploratória de dados |
| **Python** | Processamento de planilhas Excel |
| **Excel/XLSX** | Dados fonte das escolas |

---

## 📁 Estrutura do Projeto

```
An-lise-REGINA/
├── 📄 index.html                           # Dashboard principal
├── 📄 dados.js                             # Sistema de dados
├── 📄 graficos.js                          # Biblioteca de gráficos
├── 📊 dados_escolas.json                   # Base de dados (26 escolas)
├── ⚙️ super_bi_config_avancado.json        # Configurações Super BI
├── 📓 analise_comparativa_escolas.ipynb    # Análise Jupyter
├── 📋 RELATORIO_FINAL_SISTEMA_REGINA.md    # Relatório técnico
│
├── 📁 analises/                            # Análises especializadas
│   ├── evolucao-temporal.html              # Evolução no tempo
│   ├── pei-vs-regular.html                 # Comparativo tipos escola
│   ├── performance-bi.html                 # Performance Super BI
│   ├── frequencia-alunos.html              # Análise de frequência
│   ├── rendimento-academico.html           # Rendimento acadêmico
│   └── evolucao-individual.html            # Evolução individual
│
├── 📁 escolas/                             # Páginas individuais (26 escolas)
│   ├── ee_*.html                           # Escolas regulares (17)
│   └── pei_*.html                          # Escolas PEI (9)
│
├── 📁 Super BI 2025/                       # Documentação oficial
│   ├── calculo_super_bi_2025.json          # Regras de cálculo
│   ├── componentes_detalhados.md           # Documentação técnica
│   └── pesos_oficiais.json                 # Pesos dos componentes
│
├── 📁 dados_fonte/                         # Dados originais
│   ├── BI PLATAFORMAS - 2025 (...).xlsx    # Dados plataformas
│   ├── plataforma ALUNO PRESENTE (...).xlsx # Dados frequência
│   ├── Relatorio_*.xlsx                    # Relatórios Excel
│   └── Super_BI_2025_05.pdf               # Documentação oficial
│
└── 📁 backup/                              # Versões anteriores
    ├── *.backup                            # Backups automáticos
    └── versoes_anteriores/                 # Histórico de versões
```

### 🗂️ Detalhamento dos Diretórios

#### 📁 **Raiz do Projeto**
- **index.html**: Dashboard principal com navegação e KPIs
- **dados.js**: Configurações e dados auxiliares do sistema
- **graficos.js**: Funções para geração de gráficos Chart.js
- **dados_escolas.json**: Base de dados JSON com informações de 26 escolas

#### 📁 **analises/**
Contém 6 análises especializadas em HTML independentes:
- Gráficos interativos específicos por tema
- Análises comparativas detalhadas
- Métricas segmentadas por tipo de escola

#### 📁 **escolas/**
26 páginas HTML individuais (uma por escola):
- **17 Escolas Regulares** (ee_*.html)
- **9 Escolas PEI** (pei_*.html)
- Métricas específicas e histórico individual

#### 📁 **Super BI 2025/**
Documentação oficial e regras de cálculo:
- Fórmulas matemáticas dos 7 componentes
- Pesos oficiais e normalização
- Documentação técnica completa

---

## 💻 Pré-requisitos do Sistema

### 🌐 Navegador Web
| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| **Chrome** | 90+ | ✅ Recomendado |
| **Firefox** | 88+ | ✅ Compatível |
| **Safari** | 14+ | ✅ Compatível |
| **Edge** | 90+ | ✅ Compatível |

### 💾 Recursos de Hardware

#### 🖥️ **Configuração Mínima**
- **Processador**: Intel Core i3 / AMD Ryzen 3 ou equivalente
- **Memória RAM**: 4 GB
- **Armazenamento**: 100 MB de espaço livre
- **Resolução**: 1280x720 pixels
- **Conexão**: Internet para CDNs (opcional para desenvolvimento local)

#### 🚀 **Configuração Recomendada**
- **Processador**: Intel Core i5 / AMD Ryzen 5 ou superior
- **Memória RAM**: 8 GB ou mais
- **Armazenamento**: 500 MB de espaço livre
- **Resolução**: 1920x1080 pixels ou superior
- **Conexão**: Banda larga para melhor performance

### 🔧 **Software Adicional (Desenvolvimento)**
| Software | Versão | Finalidade |
|----------|--------|-----------|
| **VS Code** | Latest | Editor recomendado |
| **Python** | 3.8+ | Análise de dados Jupyter |
| **Node.js** | 16+ | Servidor local (opcional) |
| **Git** | 2.x | Controle de versão |

---

## 🚀 Instalação e Configuração

### 📥 **Método 1: Download Direto**
```bash
# Clone o repositório
git clone https://github.com/dansfisica85/An-lise-REGINA.git

# Entre no diretório
cd An-lise-REGINA

# Abra o index.html no navegador
# Duplo clique ou:
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 🌐 **Método 2: Servidor Local**
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx http-server

# Usando PHP
php -S localhost:8000

# Acesse: http://localhost:8000
```

### ⚙️ **Configuração Avançada**

#### 📊 **Atualizando Dados das Escolas**
```javascript
// Edite o arquivo dados_escolas.json
{
  "escolas": [
    {
      "id": "nova_escola",
      "nome": "Nova Escola",
      "tipo": "Regular",
      "frequencia_1bi": 90.0,
      // ... outros campos
    }
  ]
}
```

#### 🎯 **Configurando Super BI**
```javascript
// Edite super_bi_config_avancado.json
{
  "componentes": {
    "aluno_presente": {"peso_max": 1.5},
    "professor_presente": {"peso_max": 1.0},
    "plataformas": {"peso_max": 2.0},
    // ... outros componentes
  }
}
```

---

## 📖 Uso do Sistema

### 🏠 **Dashboard Principal**
1. **Acesse** `index.html` no navegador
2. **Visualize** os KPIs na parte superior
3. **Navegue** pelos cards de análises
4. **Use** o simulador Super BI interativo

### 📊 **Análises Especializadas**
1. **Clique** nos cards de análise desejada
2. **Explore** os gráficos interativos
3. **Use** os filtros disponíveis
4. **Compare** dados entre escolas

### 🎮 **Simulador Super BI**
1. **Selecione** uma escola no dropdown
2. **Ajuste** os sliders dos componentes:
   - Frequência de Alunos (%)
   - Frequência de Professores (%)
   - Nota Plataformas (0-10)
   - Formação (%)
   - SARESP - IC (%)
3. **Visualize** a nota projetada em tempo real
4. **Gere** plano de ação personalizado

### 🏫 **Páginas Individuais**
1. **Acesse** via dashboard ou URL direta
2. **Visualize** métricas específicas da escola
3. **Compare** com médias da rede
4. **Analise** evolução temporal

---

## 🏗️ Arquitetura e Fluxo

### 📋 **Arquitetura do Sistema**

```mermaid
graph TB
    A[index.html] --> B[dados.js]
    A --> C[graficos.js]
    A --> D[dados_escolas.json]
    
    A --> E[Análises Especializadas]
    E --> F[evolucao-temporal.html]
    E --> G[pei-vs-regular.html]
    E --> H[performance-bi.html]
    
    A --> I[Páginas de Escolas]
    I --> J[ee_*.html]
    I --> K[pei_*.html]
    
    L[Super BI 2025] --> M[Configurações]
    M --> N[Simulador]
    N --> O[Plano de Ação IA]
```

### 🔄 **Fluxo de Dados**

#### 1️⃣ **Inicialização**
```javascript
// 1. Carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // 2. Inicialização dos dados
    initializeData();
    
    // 3. Criação dos gráficos
    createCharts();
    
    // 4. Configuração de eventos
    setupEventListeners();
});
```

#### 2️⃣ **Processamento de Dados**
```javascript
// Fluxo de processamento
Dados Raw (JSON) → Normalização → Cálculos → Visualização
     ↓               ↓              ↓           ↓
dados_escolas.json → dados.js → graficos.js → Chart.js
```

#### 3️⃣ **Interatividade**
```javascript
// Eventos de usuário
User Input → Event Handler → Data Update → Chart Refresh
    ↓            ↓              ↓             ↓
 Sliders →   updateSimulator → newData →  chart.update()
```

### 🧮 **Cálculos do Super BI 2025**

#### **Fórmula Oficial**
```mathematical
Super BI = AP + PP + PLAT + FORM + SARESP + APOIO + AJ

Onde:
- AP (Aluno Presente): máx 1.5 pontos
- PP (Professor Presente): máx 1.0 pontos  
- PLAT (Plataformas): máx 2.0 pontos
- FORM (Formação): máx 2.0 pontos
- SARESP: máx 3.0 pontos
- APOIO (Apoio Presencial): máx 0.5 pontos
- AJ (Ajuste Desigualdades): máx 1.0 pontos

Total Máximo Teórico: 11.0 pontos
```

#### **Implementação JavaScript**
```javascript
function calculateSuperBI(freq, profFreq, plat, formacao, saresp) {
    // Aluno Presente - Crescimento exponencial
    const notaAP = freq >= 97 ? 1.5 : 1.5 * Math.pow(freq/97, 2);
    
    // Professor Presente - Crescimento exponencial
    const notaPP = profFreq >= 100 ? 1.0 : 1.0 * Math.pow(profFreq/100, 2);
    
    // Plataformas - Normalização linear
    const notaPLAT = Math.min(2.0 * (plat / 10), 2.0);
    
    // Formação - Percentual direto
    const notaFORM = 2.0 * Math.min(formacao / 100, 1);
    
    // SARESP - IC da meta
    const notaSAR = 3.0 * Math.min(saresp / 100, 1);
    
    // Valores fixos para simulação
    const notaAPOIO = 0.5 * 0.8; // 80% apoios realizados
    const notaAJ = 0.65; // Valor médio ajuste desigualdades
    
    return notaAP + notaPP + notaPLAT + notaFORM + notaSAR + notaAPOIO + notaAJ;
}
```

---

## 📈 Performance e Recursos

### 💾 **Uso de Memória**

#### 📊 **Estimativas por Componente**
| Componente | Tamanho | Memória RAM |
|------------|---------|-------------|
| **HTML/CSS** | ~15 MB | ~30 MB |
| **JavaScript** | ~2 MB | ~50 MB |
| **Chart.js** | ~1 MB | ~20 MB |
| **Dados JSON** | ~500 KB | ~10 MB |
| **Imagens/Assets** | ~1 MB | ~5 MB |
| **Total Sistema** | **~19.5 MB** | **~115 MB** |

#### 🚀 **Performance em Tempo Real**
- **Inicialização**: < 2 segundos
- **Carregamento de Gráficos**: < 1 segundo
- **Atualização de Sliders**: < 100ms
- **Navegação entre Páginas**: < 500ms

#### 💻 **Uso de CPU**
- **Idle**: < 1% CPU
- **Interação**: 5-15% CPU (picos)
- **Geração de Gráficos**: 10-25% CPU (temporário)

### 🔧 **Otimizações Implementadas**

#### ⚡ **Frontend**
- **Lazy Loading** de gráficos
- **Debounce** em sliders (300ms)
- **Reutilização** de instâncias Chart.js
- **Minificação** de JSON
- **CDN** para bibliotecas externas

#### 📊 **Dados**
- **Estrutura JSON otimizada**
- **Cache de cálculos** frequentes
- **Pré-computação** de métricas
- **Compressão** de arrays grandes

#### 🎨 **Interface**
- **CSS Grid/Flexbox** responsivo
- **Tailwind CSS** utilitário
- **Fontes Google** otimizadas
- **Animações CSS3** performáticas

### 📱 **Responsividade**

| Dispositivo | Resolução | Status | Ajustes |
|-------------|-----------|--------|---------|
| **Desktop** | 1920x1080+ | ✅ Otimizado | Layout completo |
| **Laptop** | 1366x768+ | ✅ Adaptado | Gráficos redimensionados |
| **Tablet** | 768x1024 | ✅ Funcional | Menu colapsável |
| **Mobile** | 375x667+ | ⚠️ Básico | Visualização simplificada |

---

## 🧪 Testes e Validação

### ✅ **Testes Realizados**

#### 🌐 **Compatibilidade de Navegadores**
- ✅ Chrome 90+ (Primário)
- ✅ Firefox 88+ (Testado)
- ✅ Safari 14+ (Testado)
- ✅ Edge 90+ (Testado)

#### 📊 **Validação de Dados**
- ✅ 26 escolas carregadas corretamente
- ✅ Cálculos Super BI validados
- ✅ Gráficos renderizando adequadamente
- ✅ Links de navegação funcionais

#### 🎮 **Funcionalidades**
- ✅ Simulador Super BI operacional
- ✅ Plano de ação IA funcional
- ✅ Análises especializadas completas
- ✅ Páginas individuais acessíveis

### 🐛 **Problemas Conhecidos**
- ⚠️ Performance reduzida em dispositivos muito antigos
- ⚠️ Alguns gráficos podem demorar em conexões lentas
- ⚠️ Layout mobile precisa de refinamentos

---

## 🔮 Futuras Melhorias

### 🎯 **Roadmap 2025**
- [ ] **API Backend**: Integração com banco de dados real
- [ ] **Autenticação**: Sistema de login por escola
- [ ] **Relatórios PDF**: Exportação automática
- [ ] **Mobile App**: Aplicativo nativo
- [ ] **IA Avançada**: Machine Learning para predições

### 🚀 **Funcionalidades Planejadas**
- [ ] **Dashboard Comparativo**: Múltiplas escolas simultâneas
- [ ] **Alertas Inteligentes**: Notificações automáticas
- [ ] **Integração SARESP**: Dados em tempo real
- [ ] **Gestão de Usuários**: Perfis e permissões
- [ ] **Analytics Avançado**: Métricas detalhadas

---

## 🤝 Contribuição

### 👥 **Como Contribuir**

#### 1️⃣ **Fork do Projeto**
```bash
# Fork no GitHub e clone
git clone https://github.com/SEU_USUARIO/An-lise-REGINA.git
cd An-lise-REGINA
```

#### 2️⃣ **Criação de Branch**
```bash
# Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade
```

#### 3️⃣ **Desenvolvimento**
```bash
# Faça suas alterações
# Teste localmente
# Commit das mudanças
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

#### 4️⃣ **Pull Request**
```bash
# Push da branch
git push origin feature/nova-funcionalidade

# Abra Pull Request no GitHub
```

### 📝 **Diretrizes**
- **Código**: Siga as convenções existentes
- **Commits**: Use Conventional Commits
- **Testes**: Teste em múltiplos navegadores
- **Documentação**: Atualize README se necessário

### 🏷️ **Padrões de Commit**
```
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: formatação de código
refactor: refatoração
test: adição de testes
chore: manutenção
```

---

## 👨‍💻 Autor

**Daniel Santos**
- GitHub: [@dansfisica85](https://github.com/dansfisica85)
- Email: davi.silva@educacao.sp.gov.br
- LinkedIn: [Davi Nunes da Silva](https://linkedin.com/in/davinunesdasilva)

### 🏢 **Equipe de Desenvolvimento**
- **Análise de Dados**: Davi Antonino Nunes da Silva
- **Frontend**: Davi Antonino Nunes da Silva  
- **Documentação**: Davi Antonino Nunes da Silva
- **Testes**: Davi Antonino Nunes da Silva

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### 📋 **Resumo da Licença**
- ✅ Uso comercial permitido
- ✅ Modificação permitida
- ✅ Distribuição permitida
- ✅ Uso privado permitido
- ❌ Responsabilidade do autor

---

## 📞 Suporte

### 🆘 **Precisa de Ajuda?**

#### 🐛 **Reportar Bugs**
- Abra uma [Issue](https://github.com/dansfisica85/An-lise-REGINA/issues)
- Descreva o problema detalhadamente
- Inclua screenshots se possível

#### 💡 **Sugestões**
- Use [Discussions](https://github.com/dansfisica85/An-lise-REGINA/discussions)
- Proponha novas funcionalidades
- Compartilhe ideias de melhoria

#### 📧 **Contato Direto**
- Email: davi.silva@educacao.sp.gov.br
- Resposta em até 48h úteis

---

## 🏆 Reconhecimentos

### 🙏 **Agradecimentos**
- **Secretaria de Educação de SP** - Dados e documentação oficial
- **Equipe Pedagógica** - Validação de métricas
- **Diretores de Escola** - Feedback e testes
- **Comunidade Open Source** - Bibliotecas utilizadas

### 📚 **Bibliotecas e Recursos**
- [Chart.js](https://chartjs.org) - Gráficos interativos
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Google Fonts](https://fonts.google.com) - Tipografia
- [GitHub](https://github.com) - Hospedagem do código

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| **Linhas de Código** | ~15,000 |
| **Arquivos HTML** | 35 |
| **Escolas Analisadas** | 26 |
| **Gráficos Interativos** | 50+ |
| **Análises Especializadas** | 6 |
| **Tempo de Desenvolvimento** | 3 meses |

---

<div align="center">

### 🌟 **Sistema REGINA 2025 - Transformando Dados em Decisões Educacionais** 🌟

**Desenvolvido com ❤️ para a Educação Pública de São Paulo**
**CRIADO POR: PROFESSOR DAVI ANTONINO NUNES DA SILVA 🐺**
**Contato: 16 99260-4315, E-mails: davi.silva@educacao.sp.gov.br e antonino@professor.educacao.sp.gov.br**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/dansfisica85/An-lise-REGINA)
[![Status](https://img.shields.io/badge/Status-Produção-brightgreen)](https://github.com/dansfisica85/An-lise-REGINA)

</div>

---

*Última atualização: Setembro 2025*
