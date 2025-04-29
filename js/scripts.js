const playBoardElement = document.getElementById('playBoard');

let pokemons = [];
let spinCard = [];

let lockBoard = false;

const getClickCard = event => {
  const getClick = event.target;

  if (!getClick.classList.contains('card-back')) return;

  const card = getClick.parentElement;

  // ❌ Bloquear si ya está girada o acertada
  if (
    card.classList.contains('click') ||
    card.classList.contains('matched') ||
    lockBoard
  )
    return;

  card.classList.add('click');
  spinCard.push(card);

  if (spinCard.length === 2) {
    lockBoard = true; // ⛔ Bloquear más clics temporalmente

    const firstId = spinCard[0].dataset.id;
    const secondId = spinCard[1].dataset.id;

    if (firstId === secondId) {
      // ✅ Cartas iguales
      spinCard[0].classList.add('matched');
      spinCard[1].classList.add('matched');
      spinCard = [];
      lockBoard = false;
    } else {
      // ❌ Cartas distintas → girarlas de nuevo tras delay
      setTimeout(() => {
        spinCard[0].classList.remove('click');
        spinCard[1].classList.remove('click');
        spinCard = [];
        lockBoard = false; // 🔓 Desbloquear clics
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

  // Duplicar y mezclar los pokémon para formar las parejas
  pokemons = [...pokemons, ...pokemons].sort(() => Math.random() - 0.5);
};

const printCards = () => {
  const fragment = document.createDocumentFragment();

  pokemons.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = pokemon; // ← ahora sí tienen identificador para compararlas

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.setProperty(
      '--pokemon-img',
      `url(../assets/images/${pokemon}.png)`
    );
    card.append(cardFront);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    card.append(cardBack);

    fragment.append(card);
  });

  playBoardElement.append(fragment);
};

// Mostrar todas al principio
setTimeout(() => {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('card-clicked');
  });
}, 1000);

setTimeout(() => {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('card-clicked');
  });
}, 2000);

// 🚀 Ejecutar el juego
pokemonImage();
printCards();
playBoardElement.addEventListener('click', getClickCard);
