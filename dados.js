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

    console.log('✅ KPIs atualizados');
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

    // Disparar evento personalizado para indicar que os dados foram carregados
    document.dispatchEvent(new CustomEvent('dadosCarregados'));
    
    console.log('✅ Sistema de dados inicializado');
});