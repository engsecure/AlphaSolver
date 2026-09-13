// [IDX-01]
let metodoActual = 'auto';
const palabrasComunesEspanol = ["de", "la", "el", "en", "que", "y", "los", "un", "una", "se", "por", "con", "no", "su", "para", "es", "al", "lo", "como", "más", "hola", "mundo"];

// [IDX-02]
function cambiarMetodo(metodo) {
    metodoActual = metodo;
    
    document.getElementById('btn-auto').classList.remove('activo');
    document.getElementById('btn-atbash').classList.remove('activo');
    document.getElementById('btn-cesar').classList.remove('activo');
    document.getElementById(`btn-${metodo}`).classList.add('activo');

    const configCesar = document.getElementById('config-cesar');
    if (metodo === 'cesar') {
        configCesar.classList.remove('oculto');
    } else if (metodo === 'atbash') {
        configCesar.classList.add('oculto');
    }
    
    procesarTexto();
}

// [IDX-03]
function evaluarTextoEspanol(texto) {
    const palabras = texto.toLowerCase().match(/[a-záéíóúñ]+/g) || [];
    let puntuacion = 0;
    
    palabras.forEach(palabra => {
        if (palabrasComunesEspanol.includes(palabra)) {
            puntuacion += 10; 
        }
    });

    const vocales = texto.match(/[aeiouáéíóú]/gi);
    if (vocales) {
        puntuacion += vocales.length;
    }
    
    return puntuacion;
}

// [IDX-04]
function encontrarMejorDesplazamiento(texto, alfabeto) {
    let mejorShift = 0;
    let mejorPuntuacion = -1;
    const maxCombinaciones = alfabeto.length || 26;

    for (let i = 1; i <= maxCombinaciones; i++) {
        const prueba = descifrarCesar(texto, i, alfabeto);
        const puntuacion = evaluarTextoEspanol(prueba);

        if (puntuacion > mejorPuntuacion) {
            mejorPuntuacion = puntuacion;
            mejorShift = i;
        }
    }
    return { shift: mejorShift, score: mejorPuntuacion };
}

// [IDX-05]
function procesarTexto() {
    const textoEntrada = document.getElementById('texto-origen').value;
    const textoCifrado = document.getElementById('texto-cifrado');
    const textoDescifrado = document.getElementById('texto-descifrado');
    const inputDesplazamiento = document.getElementById('desplazamiento');
    const configCesar = document.getElementById('config-cesar');
    const alfabeto = document.getElementById('alfabeto').value;

    if (!textoEntrada || textoEntrada.trim() === '') {
        textoCifrado.value = '';
        textoDescifrado.value = '';
        if (metodoActual === 'auto') {
            configCesar.classList.add('oculto');
        }
        return;
    }

    // [IDX-06]
    if (metodoActual === 'auto') {
        const pruebaAtbash = descifrarAtbash(textoEntrada, alfabeto);
        const scoreAtbash = evaluarTextoEspanol(pruebaAtbash);

        const cesarMejor = encontrarMejorDesplazamiento(textoEntrada, alfabeto);

        if (scoreAtbash > cesarMejor.score) {
            textoCifrado.value = cifrarAtbash(textoEntrada, alfabeto);
            textoDescifrado.value = descifrarAtbash(textoEntrada, alfabeto);
            configCesar.classList.add('oculto');
        } else {
            inputDesplazamiento.value = cesarMejor.shift;
            textoCifrado.value = cifrarCesar(textoEntrada, cesarMejor.shift, alfabeto);
            textoDescifrado.value = descifrarCesar(textoEntrada, cesarMejor.shift, alfabeto);
            configCesar.classList.remove('oculto');
        }
    } 
    // [IDX-07]
    else if (metodoActual === 'atbash') {
        textoCifrado.value = cifrarAtbash(textoEntrada, alfabeto);
        textoDescifrado.value = descifrarAtbash(textoEntrada, alfabeto);
    } else if (metodoActual === 'cesar') {
        const desplazamiento = parseInt(inputDesplazamiento.value) || 0;
        textoCifrado.value = cifrarCesar(textoEntrada, desplazamiento, alfabeto);
        textoDescifrado.value = descifrarCesar(textoEntrada, desplazamiento, alfabeto);
    }
}

// [IDX-08]
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('texto-origen').addEventListener('input', procesarTexto);
    document.getElementById('alfabeto').addEventListener('input', procesarTexto);
    
    document.getElementById('desplazamiento').addEventListener('input', () => {
        if (metodoActual === 'auto') {
            cambiarMetodo('cesar');
        }
        procesarTexto();
    });
});