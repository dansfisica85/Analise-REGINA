#!/bin/bash

# Script para criar páginas HTML das 26 escolas válidas

cd /workspaces/An-lise-REGINA/escolas

# Array com os dados das escolas (nome_arquivo:nome_completo:tipo:freq2:rend2:aprov:plataformas:score)
escolas=(
    "ee_luiz_marcari:EE Luiz Marcari:Regular:86.1:8.6:85.2:74.8:78.9"
    "pei_nestor_gomes:PEI EE Prof. Nestor Gomes de Araújo:PEI:90.6:9.9:89.5:88.4:87.2"
    "ee_dr_mario_lins:EE Dr. Mário Lins:Regular:86.7:9.3:87.2:79.5:82.3"
    "ee_prof_plinio_berardo:EE Prof. Plínio Berardo:Regular:75.2:8.6:80.9:76.7:79.8"
    "pei_domingos_paro:PEI EE Domingos Paro:PEI:93.2:10.0:92.1:90.5:90.8"
    "pei_maria_falconi:PEI EE Maria Falconi de Felício:PEI:90.6:10.0:93.2:91.8:91.5"
    "ee_mauricio_montecchi:EE Maurício Montecchi:Regular:92.0:9.9:88.5:82.3:84.7"
    "ee_orminda_guimaraes:EE Orminda Guimarães Cotrim:Regular:84.5:9.5:85.8:78.9:81.2"
    "ee_basilio_rodrigues:EE Prof. Basílio Rodrigues da Silva:Regular:88.4:8.8:84.6:77.2:80.5"
    "pei_dolores_belem:PEI EE Profª Dolores Belém Novaes:PEI:89.2:9.5:88.9:87.1:86.4"
    "ee_dolores_martins:EE Profª Dolores Martins de Castro:Regular:91.5:9.2:87.3:81.5:83.8"
    "ee_josepha_castro:EE Profª Josepha Castro:Regular:82.3:9.4:84.8:76.5:79.2"
    "ee_yolanda_sichieri:EE Profª Yolanda Luiz Sichieri:Regular:78.6:9.5:86.2:75.3:78.5"
    "ee_adelia_frascino:EE Dona Adélia Frascino:Regular:92.6:10.0:89.8:85.2:87.1"
    "ee_anna_balardin:EE Anna Passamonti Balardin:Regular:78.4:9.2:83.8:74.2:77.5"
    "pei_antonio_furlan:PEI EE Dr. Antônio Furlan Júnior:PEI:89.3:9.8:90.1:89.7:88.3"
    "ee_bruno_pieroni:EE Prof. Bruno Pieroni:Regular:85.5:9.8:87.9:80.8:83.2"
    "ee_edith_silveira:EE Profª Edith Silveira Dalmaso:Regular:90.8:8.5:85.1:76.9:79.4"
    "ee_ferrucio_chiaratti:EE Ferrúcio Chiaratti:Regular:74.8:9.0:82.1:72.8:76.2"
    "ee_isaias_ferreira:EE Dr. Isaías José Ferreira:Regular:88.0:9.6:86.8:78.7:81.8"
    "pei_maria_conceicao:PEI EE Profª Maria Conceição R. Silva Magon:PEI:93.4:9.4:88.7:86.3:85.9"
    "ee_nicia_giraldi:EE Profª Nícia Fabíola Zanutto Giraldi:Regular:80.5:9.2:85.6:78.2:81.1"
    "pei_winston_churchill:PEI EE Winston Churchill:PEI:87.6:9.5:87.8:85.9:85.2"
    "pei_maria_elyde:PEI EE Profª Maria Élyde Mônaco dos Santos:PEI:88.2:10.0:91.1:90.5:89.2"
    "ee_odulfo_guimaraes:EE Odulfo de Oliveira Guimarães:Regular:80.0:9.3:84.7:76.5:79.8"
)

# Template HTML base
template='<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NOME_ESCOLA - Sistema REGINA</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: "Inter", sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body class="bg-gray-50">
    <header class="gradient-bg text-white py-6">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold">NOME_ESCOLA</h1>
                    <p class="text-blue-100 mt-2">TIPO_ESCOLA | Sistema REGINA 2025</p>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold">SCORE_BI</div>
                    <div class="text-sm text-blue-100">Score Super BI</div>
                </div>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- KPIs -->
            <div class="lg:col-span-3">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="text-2xl font-bold text-green-600">FREQ_2BI%</div>
                        <div class="text-sm text-gray-600">Frequência 2º Bi</div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="text-2xl font-bold text-blue-600">REND_2BI</div>
                        <div class="text-sm text-gray-600">Rendimento 2º Bi</div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="text-2xl font-bold text-purple-600">APROVACAO%</div>
                        <div class="text-sm text-gray-600">Taxa de Aprovação</div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <div class="text-2xl font-bold text-indigo-600">PLATAFORMAS%</div>
                        <div class="text-sm text-gray-600">Uso de Plataformas</div>
                    </div>
                </div>
            </div>

            <!-- Status -->
            <div class="lg:col-span-3">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold mb-4">Status Atual da Escola</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                <span class="text-sm">Classificação: Muito Bom</span>
                            </div>
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                <span class="text-sm">Evolução Frequência: Positiva</span>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                <span class="text-sm">Evolução Rendimento: Positiva</span>
                            </div>
                            <div class="flex items-center">
                                <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                <span class="text-sm">Tendência: Crescimento</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 text-center">
            <a href="../index.html" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                ← Voltar ao Dashboard
            </a>
        </div>
    </main>
</body>
</html>'

# Gerar páginas para cada escola
for escola_data in "${escolas[@]}"; do
    IFS=':' read -r arquivo nome tipo freq2 rend2 aprov plataformas score <<< "$escola_data"
    
    # Substituir placeholders no template
    html_content="${template//NOME_ESCOLA/$nome}"
    html_content="${html_content//TIPO_ESCOLA/$tipo}"
    html_content="${html_content//SCORE_BI/$score}"
    html_content="${html_content//FREQ_2BI/$freq2}"
    html_content="${html_content//REND_2BI/$rend2}"
    html_content="${html_content//APROVACAO/$aprov}"
    html_content="${html_content//PLATAFORMAS/$plataformas}"
    
    # Criar arquivo
    echo "$html_content" > "${arquivo}.html"
    echo "Criado: ${arquivo}.html"
done

echo "Todas as páginas das escolas foram criadas!"
