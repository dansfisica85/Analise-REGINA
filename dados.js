// dados.js - Sistema completo de carregamento de dados para o Sistema REGINA 2025

let dadosEscolas = null;
let resumoRede = null;
let dadosCarregados = false;

// Função principal para carregar dados
async function carregarDados() {
    if (dadosCarregados && dadosEscolas && resumoRede) {
        return { escolas: dadosEscolas, resumo_rede: resumoRede };
    }

    try {
        console.log('Carregando dados do JSON...');
        const response = await fetch('./dados_escolas.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        dadosEscolas = data.escolas;
        resumoRede = data.resumo_rede;
        dadosCarregados = true;

        console.log('✅ Dados carregados com sucesso:', {
            escolas: dadosEscolas.length,
            resumo: resumoRede
        });

        return data;
    } catch (error) {
        console.warn('Erro ao carregar JSON, usando dados de fallback:', error);
        return carregarDadosFallback();
    }
}

// Dados de fallback caso o JSON não carregue
function carregarDadosFallback() {
    console.log('Usando dados de fallback...');

    dadosEscolas = [
        {
            id: "pei_edith_silveira",
            nome: "PEI EE Profª Edith Silveira Dalmaso",
            tipo: "PEI",
            frequencia_1bi: 91.9,
            frequencia_2bi: 93.0,
            rendimento_1bi: 7.7,
            rendimento_2bi: 7.6,
            aprovacao: 87.8,
            uso_plataformas: 90.0,
            engajamento_docente: 4.5,
            score_super_bi: 86.7,
            classificacao: "MUITO BOM"
        },
        {
            id: "ee_plinio_berardo",
            nome: "EE Profº Plínio Berardo", 
            tipo: "Regular",
            frequencia_1bi: 84.8,
            frequencia_2bi: 87.0,
            rendimento_1bi: 6.9,
            rendimento_2bi: 6.8,
            aprovacao: 80.9,
            uso_plataformas: 76.7,
            engajamento_docente: 3.8,
            score_super_bi: 79.8,
            classificacao: "BOM"
        }
    ];

    resumoRede = {
        total_escolas: 26,
        escolas_pei: 12,
        escolas_regulares: 14,
        score_medio_geral: 83.6,
        score_medio_pei: 87.3,
        score_medio_regular: 79.8
    };

    dadosCarregados = true;
    return { escolas: dadosEscolas, resumo_rede: resumoRede };
}

// Funções de processamento de dados
function obterEscolasPorTipo(tipo) {
    if (!dadosEscolas) return [];
    return dadosEscolas.filter(escola => 
        tipo ? escola.tipo.toLowerCase() === tipo.toLowerCase() : true
    );
}

function calcularMediasPorTipo() {
    if (!dadosEscolas) return null;

    const pei = dadosEscolas.filter(e => e.tipo === 'PEI');
    const regular = dadosEscolas.filter(e => e.tipo === 'Regular');

    const calcularMedia = (escolas, campo) => {
        const valores = escolas.map(e => e[campo]).filter(v => v !== undefined);
        return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
    };

    return {
        pei: {
            total: pei.length,
            frequencia_media: calcularMedia(pei, 'frequencia_2bi'),
            rendimento_medio: calcularMedia(pei, 'rendimento_2bi'),
            aprovacao_media: calcularMedia(pei, 'aprovacao'),
            plataformas_media: calcularMedia(pei, 'uso_plataformas'),
            score_medio: calcularMedia(pei, 'score_super_bi')
        },
        regular: {
            total: regular.length,
            frequencia_media: calcularMedia(regular, 'frequencia_2bi'),
            rendimento_medio: calcularMedia(regular, 'rendimento_2bi'),
            aprovacao_media: calcularMedia(regular, 'aprovacao'),
            plataformas_media: calcularMedia(regular, 'uso_plataformas'),
            score_medio: calcularMedia(regular, 'score_super_bi')
        }
    };
}

// Função para carregar o seletor de escolas
function carregarSeletorEscolas() {
    console.log('🔧 Carregando seletor de escolas...');
    const selector = document.getElementById('escola-selector');
    
    if (!selector) {
        console.log('❌ Seletor de escola não encontrado');
        return;
    }

    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.log('❌ Dados das escolas não disponíveis');
        return;
    }

    // Limpa as opções existentes
    selector.innerHTML = '<option value="">Escolha uma escola...</option>';

    // Ordena escolas por nome
    const escolasOrdenadas = [...dadosEscolas].sort((a, b) => a.nome.localeCompare(b.nome));

    // Adiciona opções ao seletor
    escolasOrdenadas.forEach((escola, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = escola.nome;
        selector.appendChild(option);
    });

    // Adiciona evento de mudança
    selector.addEventListener('change', function() {
        const escolaIndex = this.value;
        if (escolaIndex !== '') {
            exibirDetalhesEscola(escolasOrdenadas[escolaIndex]);
        } else {
            ocultarDetalhesEscola();
        }
    });

    console.log(`✅ Seletor carregado com ${escolasOrdenadas.length} escolas`);
}

// Função para exibir detalhes da escola selecionada
function exibirDetalhesEscola(escola) {
    console.log('🏫 Exibindo detalhes da escola:', escola.nome);
    
    const detalhesDiv = document.getElementById('escola-detalhes');
    const nomeElement = document.getElementById('escola-nome');
    const tipoElement = document.getElementById('escola-tipo');
    const alunosElement = document.getElementById('escola-alunos');
    const mediaElement = document.getElementById('escola-media');
    const analiseElement = document.getElementById('escola-analise');

    if (!detalhesDiv) {
        console.log('❌ Elemento de detalhes não encontrado');
        return;
    }

    // Atualiza informações básicas
    if (nomeElement) nomeElement.textContent = escola.nome;
    if (tipoElement) tipoElement.textContent = escola.tipo;
    if (alunosElement) alunosElement.textContent = escola.total_alunos || 'N/A';
    
    // Calcula média geral
    const media = calcularMediaEscola(escola);
    if (mediaElement) mediaElement.textContent = media.toFixed(1);

    // Gera análise textual
    const analise = gerarAnaliseEscola(escola);
    if (analiseElement) analiseElement.innerHTML = analise;

    // Mostra a seção de detalhes
    detalhesDiv.classList.remove('hidden');

    // Cria gráficos
    criarGraficosEscola(escola);
}

// Função para calcular média geral da escola
function calcularMediaEscola(escola) {
    const metricas = [
        escola.frequencia_1bi || 0,
        escola.frequencia_2bi || 0,
        escola.rendimento_1bi || 0,
        escola.rendimento_2bi || 0,
        escola.aprovacao || 0
    ].filter(v => v > 0);

    return metricas.length > 0 ? metricas.reduce((a, b) => a + b, 0) / metricas.length : 0;
}

// Função para gerar análise textual da escola
function gerarAnaliseEscola(escola) {
    const analises = [];
    
    // Análise de frequência
    const freq1 = escola.frequencia_1bi || 0;
    const freq2 = escola.frequencia_2bi || 0;
    const evolucaoFreq = freq2 - freq1;
    
    if (evolucaoFreq > 0) {
        analises.push(`📈 <strong>Melhoria na Frequência:</strong> Aumento de ${evolucaoFreq.toFixed(1)}% do 1º para o 2º bimestre.`);
    } else if (evolucaoFreq < 0) {
        analises.push(`📉 <strong>Queda na Frequência:</strong> Redução de ${Math.abs(evolucaoFreq).toFixed(1)}% do 1º para o 2º bimestre.`);
    } else {
        analises.push(`➡️ <strong>Frequência Estável:</strong> Manteve a mesma frequência entre os bimestres.`);
    }

    // Análise de rendimento
    const rend1 = escola.rendimento_1bi || 0;
    const rend2 = escola.rendimento_2bi || 0;
    const evolucaoRend = rend2 - rend1;
    
    if (evolucaoRend > 0) {
        analises.push(`🎯 <strong>Melhoria no Rendimento:</strong> Aumento de ${evolucaoRend.toFixed(1)}% no rendimento acadêmico.`);
    } else if (evolucaoRend < 0) {
        analises.push(`⚠️ <strong>Queda no Rendimento:</strong> Redução de ${Math.abs(evolucaoRend).toFixed(1)}% no rendimento.`);
    }

    // Análise de plataformas
    const usoPlataformas = escola.uso_plataformas || 0;
    if (usoPlataformas > 80) {
        analises.push(`💻 <strong>Excelente Uso de Plataformas:</strong> ${usoPlataformas.toFixed(1)}% de utilização das ferramentas digitais.`);
    } else if (usoPlataformas > 60) {
        analises.push(`💻 <strong>Bom Uso de Plataformas:</strong> ${usoPlataformas.toFixed(1)}% de utilização, com potencial para crescimento.`);
    } else {
        analises.push(`💻 <strong>Uso Limitado de Plataformas:</strong> ${usoPlataformas.toFixed(1)}% de utilização - oportunidade de melhoria.`);
    }

    // Análise de aprovação
    const aprovacao = escola.aprovacao || 0;
    if (aprovacao > 90) {
        analises.push(`🏆 <strong>Excelente Taxa de Aprovação:</strong> ${aprovacao.toFixed(1)}% dos alunos aprovados.`);
    } else if (aprovacao > 80) {
        analises.push(`✅ <strong>Boa Taxa de Aprovação:</strong> ${aprovacao.toFixed(1)}% de aprovação.`);
    } else {
        analises.push(`📚 <strong>Oportunidade de Melhoria:</strong> ${aprovacao.toFixed(1)}% de aprovação - foco em estratégias pedagógicas.`);
    }

    return analises.join('<br><br>');
}

// Função para ocultar detalhes da escola
function ocultarDetalhesEscola() {
    const detalhesDiv = document.getElementById('escola-detalhes');
    if (detalhesDiv) {
        detalhesDiv.classList.add('hidden');
    }
}

function obterEscolaPorId(id) {
    if (!dadosEscolas) return null;
    return dadosEscolas.find(escola => escola.id === id);
}

function atualizarKPIs() {
    console.log('🔧 Atualizando KPIs...');
    console.log('📊 Resumo da rede:', resumoRede);
    console.log('🏫 Dados das escolas:', dadosEscolas ? dadosEscolas.length : 'null');
    
    if (!resumoRede) {
        console.error('❌ Resumo da rede não encontrado');
        return;
    }

    // KPIs principais
    const elementos = {
        'total-escolas': resumoRede.total_escolas,
        'escolas-pei': resumoRede.escolas_pei,
        'escolas-regulares': resumoRede.escolas_regulares,
        'score-medio': resumoRede.score_medio_geral?.toFixed(1),
        'frequencia-media': resumoRede.frequencia_media_rede?.toFixed(1) + '%',
        'rendimento-medio': resumoRede.rendimento_medio_rede?.toFixed(1),
        'aprovacao-media': resumoRede.aprovacao_media_rede?.toFixed(1) + '%'
    };

    Object.entries(elementos).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento && valor !== undefined) {
            console.log(`✅ Atualizando ${id}: ${valor}`);
            elemento.textContent = valor;
        } else {
            console.warn(`⚠️ Elemento ${id} não encontrado ou valor undefined:`, valor);
        }
    });

    // Atualizar dados comparativos PEI vs Regular
    atualizarComparativoPEIRegular();
    
    // Atualizar contadores adicionais
    atualizarContadoresAdicionais();
}

function atualizarContadoresAdicionais() {
    const contadores = {
        'escolas-pei': resumoRede.escolas_pei,
        'escolas-pei-count': resumoRede.escolas_pei,
        'escolas-regulares': resumoRede.escolas_regulares,
        'escolas-reg-count': resumoRede.escolas_regulares
    };

    Object.entries(contadores).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento && valor !== undefined) {
            console.log(`✅ Atualizando contador ${id}: ${valor}`);
            elemento.textContent = valor;
        }
    });
}

function atualizarComparativoPEIRegular() {
    console.log('🔧 Atualizando comparativo PEI vs Regular...');
    
    if (!dadosEscolas || dadosEscolas.length === 0) {
        console.warn('⚠️ Dados das escolas não disponíveis para comparativo');
        return;
    }

    const pei = dadosEscolas.filter(e => e.tipo === 'PEI');
    const regular = dadosEscolas.filter(e => e.tipo === 'Regular');
    
    console.log(`📊 PEI: ${pei.length} escolas, Regular: ${regular.length} escolas`);

    const calcularMedia = (escolas, campo) => {
        const valores = escolas.map(e => e[campo]).filter(v => v !== undefined && v !== null);
        return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
    };

    const dadosPEI = {
        count: pei.length,
        score: calcularMedia(pei, 'score_super_bi'),
        frequencia: calcularMedia(pei, 'frequencia_2bi'),
        rendimento: calcularMedia(pei, 'rendimento_2bi')
    };

    const dadosRegular = {
        count: regular.length,
        score: calcularMedia(regular, 'score_super_bi'),
        frequencia: calcularMedia(regular, 'frequencia_2bi'),
        rendimento: calcularMedia(regular, 'rendimento_2bi')
    };

    console.log('📈 Dados PEI:', dadosPEI);
    console.log('📉 Dados Regular:', dadosRegular);

    // Função auxiliar para atualizar elementos com verificação
    const atualizarElemento = (id, valor, sufixo = '') => {
        const elemento = document.getElementById(id);
        if (elemento && valor !== undefined && valor !== null) {
            const valorFormatado = typeof valor === 'number' ? valor.toFixed(1) : valor;
            elemento.textContent = valorFormatado + sufixo;
            console.log(`✅ ${id}: ${valorFormatado}${sufixo}`);
        } else {
            console.warn(`⚠️ Elemento ${id} não encontrado ou valor inválido:`, valor);
        }
    };

    // Atualizar elementos PEI
    atualizarElemento('escolas-pei-count', dadosPEI.count);
    atualizarElemento('score-medio-pei', dadosPEI.score);
    atualizarElemento('freq-media-pei', dadosPEI.frequencia, '%');
    atualizarElemento('rend-medio-pei', dadosPEI.rendimento);

    // Atualizar elementos Regular
    atualizarElemento('escolas-reg-count', dadosRegular.count);
    atualizarElemento('score-medio-reg', dadosRegular.score);
    atualizarElemento('freq-media-reg', dadosRegular.frequencia, '%');
    atualizarElemento('rend-medio-reg', dadosRegular.rendimento);

    // Cálculos estatísticos
    const diferencaScore = dadosPEI.score - dadosRegular.score;
    atualizarElemento('diferenca-score', '+' + diferencaScore.toFixed(1));

    // Taxa de excelência (score >= 85)
    const peiExcelencia = pei.filter(e => e.score_super_bi && e.score_super_bi >= 85).length;
    const regularExcelencia = regular.filter(e => e.score_super_bi && e.score_super_bi >= 85).length;
    const taxaPEI = pei.length > 0 ? (peiExcelencia / pei.length * 100).toFixed(0) : 0;
    const taxaRegular = regular.length > 0 ? (regularExcelencia / regular.length * 100).toFixed(0) : 0;
    atualizarElemento('taxa-excelencia', `${taxaPEI}% vs ${taxaRegular}%`);
    
    console.log('✅ Comparativo PEI vs Regular atualizado');
}

// Função para popular seletores de escola
function popularSeletorEscolas(seletorId) {
    const seletor = document.getElementById(seletorId);
    if (!seletor || !dadosEscolas) return;

    seletor.innerHTML = '<option value="">Selecione uma escola...</option>';

    dadosEscolas.forEach(escola => {
        const option = document.createElement('option');
        option.value = escola.id;
        option.textContent = escola.nome;
        seletor.appendChild(option);
    });
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Inicializando sistema de dados...');
    await carregarDados();
    atualizarKPIs();

    // Popular seletores se existirem
    const seletores = ['escolaSelect', 'seletorEscola', 'escola-select'];
    seletores.forEach(id => popularSeletorEscolas(id));

    // Carregar seletor de evolução individual
    carregarSeletorEscolas();

    console.log('✅ Sistema de dados inicializado');
});