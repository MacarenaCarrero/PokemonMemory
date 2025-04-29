const playBoardElement = document.getElementById('playBoard');
let pokemons = [];
let spinCard = [];

// Función para manejar los clics en las cartas
const handleCardClick = e => {
  const clickedCard = e.target.closest('.card');

  if (
    !clickedCard ||
    clickedCard.classList.contains('click') ||
    clickedCard.classList.contains('matched')
  )
    return;

  // No dejar girar más de 2 cartas
  if (spinCard.length === 2) return;

  clickedCard.classList.add('click');
  spinCard.push(clickedCard);

  // Comparar cuando haya dos cartas
  if (spinCard.length === 2) {
    const [first, second] = spinCard;
    const id1 = first.dataset.id;
    const id2 = second.dataset.id;

    if (id1 === id2) {
      // Coinciden: se quedan giradas
      first.classList.add('matched');
      second.classList.add('matched');
      spinCard = [];
    } else {
      // No coinciden: se giran de nuevo
      setTimeout(() => {
        first.classList.remove('click');
        second.classList.remove('click');
        spinCard = [];
      }, 1000);
    }
  }
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 151 + 1);
};

const pokemonImage = () => {
  while (pokemons.length < 6) {
    const randomNumber = getRandomNumber();
    if (!pokemons.includes(randomNumber)) {
      pokemons.push(randomNumber);
    }
  }
  pokemons = [...pokemons, ...pokemons].sort(() => Math.random() - 0.5);
};

const printCards = () => {
  const fragment = document.createDocumentFragment();

  pokemons.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = pokemon;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.setProperty(
      '--pokemon-img',
      `url(../assets/images/${pokemon}.png)`
    );

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    card.append(cardFront, cardBack);
    fragment.append(card);
  });

  playBoardElement.append(fragment);
};

// Mostrar todas al inicio por 1 segundo
const showAllCardsInitially = () => {
  setTimeout(() => {
    document
      .querySelectorAll('.card')
      .forEach(card => card.classList.add('click'));
  }, 1000);

  setTimeout(() => {
    document
      .querySelectorAll('.card')
      .forEach(card => card.classList.remove('click'));
  }, 2000);
};

// Lanzar juego
pokemonImage();
printCards();
showAllCardsInitially();
playBoardElement.addEventListener('click', handleCardClick);
