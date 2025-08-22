// graficos.js - Sistema completo de gráficos para o Sistema REGINA 2025

// Configurações globais
Chart.defaults.font.family = 'Inter, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#64748b';
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

// Paleta de cores consistente
const cores = {
    pei: '#3b82f6',
    regular: '#10b981', 
    primaria: '#8b5cf6',
    secundaria: '#f59e0b',
    terciaria: '#ef4444',
    fundo: {
        pei: 'rgba(59, 130, 246, 0.1)',
        regular: 'rgba(16, 185, 129, 0.1)',
        primaria: 'rgba(139, 92, 246, 0.1)',
        secundaria: 'rgba(245, 158, 11, 0.1)',
        terciaria: 'rgba(239, 68, 68, 0.1)'
    }
};

// Armazenar instâncias dos gráficos para destruição
let graficosAtivos = {};

// Função para destruir gráfico existente
function destruirGrafico(canvasId) {
    if (graficosAtivos[canvasId]) {
        try {
            graficosAtivos[canvasId].destroy();
            delete graficosAtivos[canvasId];
            console.log(`🗑️ Gráfico ${canvasId} destruído`);
        } catch (error) {
            console.warn(`⚠️ Erro ao destruir gráfico ${canvasId}:`, error);
            delete graficosAtivos[canvasId];
        }
    }
    
    // Força limpeza do canvas
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Remove qualquer instância de Chart.js associada
        if (Chart.getChart(canvas)) {
            Chart.getChart(canvas).destroy();
        }
    }
}

// Gráfico de Performance Geral da Rede
function criarGraficoPerformanceGeral(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.log(`❌ Canvas ${canvasId} não encontrado`);
        return;
    }

    destruirGrafico(canvasId);

    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.log('❌ Dados das escolas não disponíveis para gráfico de performance');
        return;
    }

    // Calcula médias por tipo
    const medias = calcularMediasPorTipo();
    if (!medias) {
        console.log('❌ Não foi possível calcular médias por tipo');
        return;
    }

    const dados = {
        labels: ['Frequência', 'Rendimento', 'Aprovação', 'Uso Plataformas', 'Score Super BI'],
        datasets: [
            {
                label: 'Escolas PEI',
                data: [
                    medias.pei.frequencia_media,
                    medias.pei.rendimento_medio * 10, // Convertendo para escala de 0-100
                    medias.pei.aprovacao_media,
                    medias.pei.plataformas_media,
                    medias.pei.score_medio
                ],
                backgroundColor: cores.fundo.pei,
                borderColor: cores.pei,
                borderWidth: 2
            },
            {
                label: 'Escolas Regulares',
                data: [
                    medias.regular.frequencia_media,
                    medias.regular.rendimento_medio * 10, // Convertendo para escala de 0-100
                    medias.regular.aprovacao_media,
                    medias.regular.plataformas_media,
                    medias.regular.score_medio
                ],
                backgroundColor: cores.fundo.regular,
                borderColor: cores.regular,
                borderWidth: 2
            }
        ]
    };

    const config = {
        type: 'bar',
        data: dados,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Performance Geral da Rede Escolar',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    };

    graficosAtivos[canvasId] = new Chart(ctx, config);
    console.log(`✅ Radar comparativo criado: ${canvasId}`);
}

// Gráfico de Distribuição por Classificação
function criarGraficoDistribuicaoClassificacao(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.log(`❌ Canvas ${canvasId} não encontrado`);
        return;
    }

    destruirGrafico(canvasId);

    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.log('❌ Dados das escolas não disponíveis para gráfico de distribuição');
        return;
    }

    // Conta escolas por classificação
    const classificacoes = {};
    dadosEscolas.forEach(escola => {
        const classif = escola.classificacao || 'SEM CLASSIFICAÇÃO';
        classificacoes[classif] = (classificacoes[classif] || 0) + 1;
    });

    const labels = Object.keys(classificacoes);
    const valores = Object.values(classificacoes);
    const coresClassificacao = [
        '#10b981', // EXCELENTE - Verde
        '#3b82f6', // MUITO BOM - Azul
        '#f59e0b', // BOM - Amarelo
        '#ef4444', // REGULAR - Vermelho
        '#6b7280'  // SEM CLASSIFICAÇÃO - Cinza
    ];

    const dados = {
        labels: labels,
        datasets: [{
            data: valores,
            backgroundColor: coresClassificacao.slice(0, labels.length),
            borderWidth: 1,
            borderColor: '#ffffff'
        }]
    };

    const config = {
        type: 'doughnut',
        data: dados,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição por Classificação',
                    font: { size: 14, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    };

    graficosAtivos[canvasId] = new Chart(ctx, config);
    console.log(`✅ Gráfico de distribuição criado: ${canvasId}`);
}

// Função para criar gráfico com verificação
function criarGrafico(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`Canvas ${canvasId} não encontrado`);
        return null;
    }

    destruirGrafico(canvasId);

    try {
        const ctx = canvas.getContext('2d');
        const grafico = new Chart(ctx, config);
        graficosAtivos[canvasId] = grafico;
        return grafico;
    } catch (error) {
        console.error(`Erro ao criar gráfico ${canvasId}:`, error);
        return null;
    }
}

// Gráfico comparativo PEI vs Regular
function criarGraficoComparativo(canvasId) {
    const dadosPorTipo = calcularMediasPorTipo();
    if (!dadosPorTipo) return null;

    const config = {
        type: 'bar',
        data: {
            labels: ['Frequência', 'Rendimento', 'Aprovação', 'Plataformas', 'Score BI'],
            datasets: [{
                label: 'Escolas PEI',
                data: [
                    dadosPorTipo.pei.frequencia_media,
                    dadosPorTipo.pei.rendimento_medio * 10,
                    dadosPorTipo.pei.aprovacao_media,
                    dadosPorTipo.pei.plataformas_media,
                    dadosPorTipo.pei.score_medio
                ],
                backgroundColor: cores.pei,
                borderColor: cores.pei,
                borderWidth: 1
            }, {
                label: 'Escolas Regulares',
                data: [
                    dadosPorTipo.regular.frequencia_media,
                    dadosPorTipo.regular.rendimento_medio * 10,
                    dadosPorTipo.regular.aprovacao_media,
                    dadosPorTipo.regular.plataformas_media,
                    dadosPorTipo.regular.score_medio
                ],
                backgroundColor: cores.regular,
                borderColor: cores.regular,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparativo PEI vs Regular'
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Pontuação'
                    }
                }
            }
        }
    };

    return criarGrafico(canvasId, config);
}

// Gráfico de evolução temporal
function criarGraficoEvolucao(canvasId) {
    if (!dadosEscolas) return null;

    const dadosPorTipo = calcularMediasPorTipo();
    if (!dadosPorTipo) return null;

    const config = {
        type: 'line',
        data: {
            labels: ['1º Bimestre', '2º Bimestre'],
            datasets: [{
                label: 'PEI - Frequência',
                data: [91.5, dadosPorTipo.pei.frequencia_media],
                borderColor: cores.pei,
                backgroundColor: cores.fundo.pei,
                tension: 0.4
            }, {
                label: 'Regular - Frequência',
                data: [84.2, dadosPorTipo.regular.frequencia_media],
                borderColor: cores.regular,
                backgroundColor: cores.fundo.regular,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução da Frequência por Bimestre'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Frequência (%)'
                    }
                }
            }
        }
    };

    return criarGrafico(canvasId, config);
}

// Gráfico radar comparativo
function criarRadarComparativo(canvasId) {
    const dadosPorTipo = calcularMediasPorTipo();
    if (!dadosPorTipo) return null;

    const config = {
        type: 'radar',
        data: {
            labels: ['Frequência', 'Rendimento', 'Aprovação', 'Plataformas', 'Engajamento'],
            datasets: [{
                label: 'PEI',
                data: [
                    dadosPorTipo.pei.frequencia_media,
                    dadosPorTipo.pei.rendimento_medio * 10,
                    dadosPorTipo.pei.aprovacao_media,
                    dadosPorTipo.pei.plataformas_media,
                    80 // Engajamento estimado
                ],
                borderColor: cores.pei,
                backgroundColor: cores.fundo.pei,
                pointBackgroundColor: cores.pei
            }, {
                label: 'Regular',
                data: [
                    dadosPorTipo.regular.frequencia_media,
                    dadosPorTipo.regular.rendimento_medio * 10,
                    dadosPorTipo.regular.aprovacao_media,
                    dadosPorTipo.regular.plataformas_media,
                    75 // Engajamento estimado
                ],
                borderColor: cores.regular,
                backgroundColor: cores.fundo.regular,
                pointBackgroundColor: cores.regular
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Radar Comparativo'
                }
            },
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    };

    return criarGrafico(canvasId, config);
}

// Gráfico de distribuição de scores
function criarGraficoDistribuicao(canvasId) {
    if (!dadosEscolas) return null;

    const pei = dadosEscolas.filter(e => e.tipo === 'PEI');
    const regular = dadosEscolas.filter(e => e.tipo === 'Regular');

    const config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Escolas PEI',
                data: pei.map((escola, index) => ({
                    x: index + 1,
                    y: escola.score_super_bi
                })),
                backgroundColor: cores.pei,
                borderColor: cores.pei,
                pointRadius: 8
            }, {
                label: 'Escolas Regulares', 
                data: regular.map((escola, index) => ({
                    x: index + 1,
                    y: escola.score_super_bi
                })),
                backgroundColor: cores.regular,
                borderColor: cores.regular,
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Scores por Escola'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Escolas'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Score Super BI'
                    },
                    min: 70,
                    max: 95
                }
            }
        }
    };

    return criarGrafico(canvasId, config);
}

// Função para inicializar todos os gráficos de uma página
async function inicializarGraficos() {
    console.log('Inicializando gráficos...');

    // Aguardar carregamento dos dados
    await carregarDados();

    // Lista de gráficos para tentar criar
    const graficos = [
        { id: 'graficoPerformanceGeral', func: criarGraficoPerformanceGeral },
        { id: 'graficoComparativo', func: criarGraficoComparativo },
        { id: 'graficoComparacaoGeral', func: criarGraficoComparativo },
        { id: 'graficoEvolucao', func: criarGraficoEvolucao },
        { id: 'graficoEvolucaoTemporal', func: criarGraficoEvolucao },
        { id: 'radarComparativo', func: criarRadarComparativo },
        { id: 'graficoDistribuicao', func: criarGraficoDistribuicaoClassificacao },
        { id: 'radarSimulacao', func: criarRadarSimulacao },
        { id: 'graficoContribuicao', func: criarGraficoContribuicao },
        { id: 'graficoCenarios', func: criarGraficoCenarios },
        { id: 'grafico1', func: criarGraficoComparativo },
        { id: 'grafico2', func: criarGraficoEvolucao },
        { id: 'grafico3', func: criarRadarComparativo }
    ];

    graficos.forEach(({ id, func }) => {
        if (document.getElementById(id)) {
            console.log(`Criando gráfico: ${id}`);
            func(id);
        }
    });

    console.log('✅ Gráficos inicializados');
}

// Inicializar automaticamente
document.addEventListener('DOMContentLoaded', inicializarGraficos);

// Reinicializar gráficos quando necessário
function reinicializarGraficos() {
    Object.keys(graficosAtivos).forEach(destruirGrafico);
    inicializarGraficos();
}

// Gráfico Radar de Simulação
function criarRadarSimulacao(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.log(`❌ Canvas ${canvasId} não encontrado`);
        return;
    }

    destruirGrafico(canvasId);

    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.log('❌ Dados das escolas não disponíveis para radar de simulação');
        return;
    }

    // Calcula médias dos componentes
    const medias = calcularMediasPorTipo();
    if (!medias) {
        console.log('❌ Não foi possível calcular médias para radar');
        return;
    }

    const dados = {
        labels: [
            'Frequência',
            'Rendimento',
            'Aprovação',
            'Uso Plataformas',
            'Score Super BI'
        ],
        datasets: [
            {
                label: 'Escolas PEI',
                data: [
                    medias.pei.frequencia_media,
                    medias.pei.rendimento_medio * 10, // Escala 0-100
                    medias.pei.aprovacao_media,
                    medias.pei.plataformas_media,
                    medias.pei.score_medio
                ],
                borderColor: cores.pei,
                backgroundColor: cores.fundo.pei,
                borderWidth: 2,
                pointBackgroundColor: cores.pei,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: cores.pei
            },
            {
                label: 'Escolas Regulares',
                data: [
                    medias.regular.frequencia_media,
                    medias.regular.rendimento_medio * 10, // Escala 0-100
                    medias.regular.aprovacao_media,
                    medias.regular.plataformas_media,
                    medias.regular.score_medio
                ],
                borderColor: cores.regular,
                backgroundColor: cores.fundo.regular,
                borderWidth: 2,
                pointBackgroundColor: cores.regular,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: cores.regular
            }
        ]
    };

    const config = {
        type: 'radar',
        data: dados,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Radar de Componentes - PEI vs Regular',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    };

    graficosAtivos[canvasId] = new Chart(ctx, config);
    console.log(`✅ Radar de simulação criado: ${canvasId}`);
}

// Gráfico de Contribuição por Componente
function criarGraficoContribuicao(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.log(`❌ Canvas ${canvasId} não encontrado`);
        return;
    }

    destruirGrafico(canvasId);

    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.log('❌ Dados das escolas não disponíveis para gráfico de contribuição');
        return;
    }

    // Calcula a contribuição média de cada componente para o score final
    const componentes = [
        { nome: 'Frequência', peso: 0.25, campo: 'frequencia_2bi' },
        { nome: 'Rendimento', peso: 0.30, campo: 'rendimento_2bi' },
        { nome: 'Aprovação', peso: 0.20, campo: 'aprovacao' },
        { nome: 'Uso Plataformas', peso: 0.15, campo: 'uso_plataformas' },
        { nome: 'Engajamento', peso: 0.10, campo: 'engajamento_docente' }
    ];

    const contribuicoes = componentes.map(comp => {
        const mediaComponente = dadosEscolas.reduce((sum, escola) => {
            const valor = escola[comp.campo] || 0;
            return sum + (comp.campo === 'rendimento_2bi' ? valor * 10 : valor); // Normalizar rendimento
        }, 0) / dadosEscolas.length;
        
        return {
            nome: comp.nome,
            contribuicao: mediaComponente * comp.peso
        };
    });

    const dados = {
        labels: contribuicoes.map(c => c.nome),
        datasets: [{
            label: 'Contribuição (%)',
            data: contribuicoes.map(c => c.contribuicao),
            backgroundColor: [
                cores.fundo.pei,
                cores.fundo.regular,
                cores.fundo.primaria,
                cores.fundo.secundaria,
                cores.fundo.terciaria
            ],
            borderColor: [
                cores.pei,
                cores.regular,
                cores.primaria,
                cores.secundaria,
                cores.terciaria
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'doughnut',
        data: dados,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Contribuição de Cada Componente',
                    font: { size: 14, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    };

    graficosAtivos[canvasId] = new Chart(ctx, config);
    console.log(`✅ Gráfico de contribuição criado: ${canvasId}`);
}

// Gráfico de Cenários de Melhoria
function criarGraficoCenarios(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.log(`❌ Canvas ${canvasId} não encontrado`);
        return;
    }

    destruirGrafico(canvasId);

    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.log('❌ Dados das escolas não disponíveis para cenários de melhoria');
        return;
    }

    // Simula cenários de melhoria baseados nos dados atuais
    const scoreAtual = dadosEscolas.reduce((sum, e) => sum + (e.score_super_bi || 0), 0) / dadosEscolas.length;
    
    const cenarios = [
        {
            nome: 'Atual',
            score: scoreAtual,
            cor: '#6b7280'
        },
        {
            nome: 'Melhoria Frequência (+5%)',
            score: scoreAtual + 3.5,
            cor: cores.pei
        },
        {
            nome: 'Melhoria Plataformas (+10%)',
            score: scoreAtual + 2.8,
            cor: cores.regular
        },
        {
            nome: 'Melhoria Geral (+5%)',
            score: scoreAtual + 5.2,
            cor: cores.primaria
        },
        {
            nome: 'Cenário Otimista (+15%)',
            score: Math.min(scoreAtual + 12.5, 100),
            cor: cores.secundaria
        }
    ];

    const dados = {
        labels: cenarios.map(c => c.nome),
        datasets: [{
            label: 'Score Projetado',
            data: cenarios.map(c => c.score),
            backgroundColor: cenarios.map(c => c.cor + '40'), // Transparência
            borderColor: cenarios.map(c => c.cor),
            borderWidth: 2
        }]
    };

    const config = {
        type: 'bar',
        data: dados,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Cenários de Melhoria - Projeções',
                    font: { size: 14, weight: 'bold' }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Score: ' + context.parsed.y.toFixed(1);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    };

    graficosAtivos[canvasId] = new Chart(ctx, config);
    console.log(`✅ Gráfico de cenários criado: ${canvasId}`);
}