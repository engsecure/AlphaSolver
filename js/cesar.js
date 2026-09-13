// [IDX-12]
function cifrarCesar(texto, desplazamiento, alfabeto) {
    let resultado = '';
    const len = alfabeto.length;
    if (len === 0) return texto; 
    
    // [IDX-13]
    const shift = ((desplazamiento % len) + len) % len;

    // [IDX-14]
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        let lowerChar = char.toLowerCase();
        let upperChar = char.toUpperCase();

        if (alfabeto.includes(char)) {
            let index = alfabeto.indexOf(char);
            resultado += alfabeto[(index + shift) % len];
        } else if (alfabeto.includes(lowerChar)) {
            let index = alfabeto.indexOf(lowerChar);
            resultado += alfabeto[(index + shift) % len].toUpperCase();
        } else if (alfabeto.includes(upperChar)) {
            let index = alfabeto.indexOf(upperChar);
            resultado += alfabeto[(index + shift) % len].toLowerCase();
        } else {
            resultado += char;
        }
    }
    return resultado;
}

// [IDX-15]
function descifrarCesar(texto, desplazamiento, alfabeto) {
    return cifrarCesar(texto, -desplazamiento, alfabeto);
}