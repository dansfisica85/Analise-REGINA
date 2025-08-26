import json
from pathlib import Path
import importlib

import extract_formulas as mod

def test_calculo_super_bi_limite():
    metricas = {"AP":2,"PP":5,"PLAT":10,"FORM":10,"SARESP":10,"APOIO":10,"AJ":10}
    # valores acima do peso máximo devem ser limitados
    val = mod.calcular_super_bi(metricas)
    assert val == sum(c['peso_max'] for c in mod.COMPONENTES_BASE)

def test_calculo_super_bi_zero():
    metricas = {}
    val = mod.calcular_super_bi(metricas)
    assert val == 0

def test_find_formulas_basic():
    lines = ["NF = AP + PP + PLAT", "AP = 0,75% * X", "Texto qualquer"]
    formulas = mod.find_formulas(lines)
    assert any("NF = AP + PP + PLAT" in f for f in formulas)


def test_group_related():
    formulas = ["NF = AP + PP", "NF = AP + 2*PP"]
    grouped = mod.group_related(formulas)
    assert 'NF' in grouped
    assert len(grouped['NF']) == 2
