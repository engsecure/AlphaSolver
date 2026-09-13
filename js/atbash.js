// [IDX-09]
function procesarAtbash(texto, alfabeto) {
    let resultado = '';
    const len = alfabeto.length;
    if (len === 0) return texto;

    // [IDX-10]
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        let lowerChar = char.toLowerCase();
        let upperChar = char.toUpperCase();

        if (alfabeto.includes(char)) {
            let index = alfabeto.indexOf(char);
            resultado += alfabeto[(len - 1) - index];
        } else if (alfabeto.includes(lowerChar)) {
            let index = alfabeto.indexOf(lowerChar);
            resultado += alfabeto[(len - 1) - index].toUpperCase();
        } else if (alfabeto.includes(upperChar)) {
            let index = alfabeto.indexOf(upperChar);
            resultado += alfabeto[(len - 1) - index].toLowerCase();
        } else {
            resultado += char;
        }
    }
    return resultado;
}

// [IDX-11]
function cifrarAtbash(texto, alfabeto) { return procesarAtbash(texto, alfabeto); }
function descifrarAtbash(texto, alfabeto) { return procesarAtbash(texto, alfabeto); }