"strict mode";

function renderSelect(id, options, defaultValue) {
    const select = document.getElementById(id);
    options.forEach(op => {
        const option = document.createElement("option");
        option.value = op;
        option.textContent = op;
        if (op === defaultValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

window.onload = function() {
    const {diametros} = window.constantes;
    renderSelect("diametroTQ", diametros,100);
    renderSelect("diametroCV_", diametros,100);
}

