function obter_tipos_de_tubo(){
    const cells = document.querySelectorAll("#tabela_tubos td:nth-child(1)");
    const values = [];
    cells.forEach(cell => values.push(cell.textContent));
    const tipos_de_tubo = Array.from(new Set(values));
    console.log(tipos_de_tubo);
    return tipos_de_tubo
}

obter_tipos_de_tubo();

