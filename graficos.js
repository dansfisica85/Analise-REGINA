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
        graficosAtivos[canvasId].destroy();
        delete graficosAtivos[canvasId];
    }
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
        { id: 'graficoComparativo', func: criarGraficoComparativo },
        { id: 'graficoComparacaoGeral', func: criarGraficoComparativo },
        { id: 'graficoEvolucao', func: criarGraficoEvolucao },
        { id: 'graficoEvolucaoTemporal', func: criarGraficoEvolucao },
        { id: 'radarComparativo', func: criarRadarComparativo },
        { id: 'graficoDistribuicao', func: criarGraficoDistribuicao },
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