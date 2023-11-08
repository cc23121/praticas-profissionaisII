fetch('/cards')
.then(response => response.json())
.then(data => {
  const cardsContainer = document.getElementsByClassName('filmes');
  data.forEach(cardData => {
    const card = document.createElement('div class="card"');
    /*<img src="${cardData.url_foto}">
      <h2>${cardData.Titulo}</h2>
      <p> Diretor: ${cardData.diretor}</p>
      <p> Ano: ${cardData.Ano}</p>
      <p> Sinopse: ${cardData.sinopse}</p>
      <p> Nota: ${cardData.nota}</p>*/
    card.innerHTML = `
      <h4>${cardData.Titulo}</h4>
                <img src="${cardData.url_foto}">
                <p id="sinopse">Sinopse:</p>
                <label for="sinopse">${cardData.sinopse}</label>
                
                <p id="diretor">Diretor:</p>
                <label for="diretor">${cardData.diretor}</label>

                <p>Ano Lançamento:</p>
                <label for="ano">${cardData.Ano}</label>
                
                <p>Nota:</p>
                <label for="nota">${cardData.nota}</label>

                <div class="rating">
                    <input type="radio" id="star5" name="rating" value="5">
                    <label for="star5"></label>
                    <input type="radio" id="star4" name="rating" value="4">
                    <label for="star4"></label>
                    <input type="radio" id="star3" name="rating" value="3">
                    <label for="star3"></label>
                    <input type="radio" id="star2" name="rating" value="2">
                    <label for="star2"></label>
                    <input type="radio" id="star1" name="rating" value="1">
                    <label for="star1"></label>
                </div>
    `;
    cardsContainer.appendChild(card);
  });
})
.catch(error => {
  console.error('Erro ao buscar dados da API:', error);
});

/////////////////////////////////////////////////////////////////////////////////////////////


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