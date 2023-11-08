function irParaRedesSociais(){
    rolarSuavemente(3000, 500)
}


function irParaALista(){
    rolarSuavemente(1130, 300)
}

function irParaTopo(){
    rolarSuavemente(0, 300)
}


function rolarSuavemente(destino, duracao){
    const inicio = window.pageYOffset;
    const distancia = destino - inicio
    const passos = 50; // Número de etapas na animação
    const intervalo = duracao / passos;
    let etapa = 0;

    function animarScroll() {
        etapa++;
        const progresso = etapa / passos;
        const deslocamento = inicio + distancia * progresso;
        window.scrollTo(0, deslocamento);

        if (etapa < passos) {
            setTimeout(animarScroll, intervalo);
        }
    }
    animarScroll();
}

const ratingInputs = document.querySelectorAll('input[name="rating"]');
let selectedRating = 0;

ratingInputs.forEach(input => {
    input.addEventListener('change', (event) => {
        selectedRating = parseInt(event.target.value);
        alert(`Classificação selecionada: ${selectedRating}`);
    });
});