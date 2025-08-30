const qwerty = document.getElementById('qwerty');
const phraseUL = document.querySelector('#phrase ul');
const btnReset = document.querySelector('.btn__reset');

// game state
let missed = 0;

// data
const phrases = [
  "javascript is fun",
  "never give up",
  "open your mind",
  "keep moving forward",
  "practice makes perfect"
];

// Create a ready-to-use <li> for a single character (letter or space)
function createLetterLI(ch) {
  const li = document.createElement('li');
  li.textContent = ch;
  // space gets .space, any other character gets .letter
  li.className = (ch === ' ') ? 'space' : 'letter';
  return li;
}

// Generic overlay presenter: set status class and message, then show
function showOverlay(status, text) {
  const overlay  = document.getElementById('overlay');
  const headline = overlay.querySelector('h2');
  overlay.classList.remove('win', 'lose');
  overlay.classList.add(status);
  headline.textContent = text;
  overlay.style.display = 'flex';
}

// Start/Reset: hide overlay, reset keyboard/hearts/state, render a new random phrase
btnReset.addEventListener('click', () => {
  // hide the start overlay (parent of the reset button)
  btnReset.parentNode.style.display = 'none';

  // enable all keys and clear visual state
  const buttons = document.querySelectorAll('button');
  for (let i = 0; i<buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].className = '';
  }

  // restore all hearts and reset missed counter
  const hearts = document.querySelectorAll('.tries img');
  for (let i = 0; i<hearts.length; i++) {
    hearts[i].src = 'images/liveHeart.png';
  }
  missed = 0;

  // pick & render a fresh random phrase
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});

// Return a random phrase split into an array of characters
const getRandomPhraseAsArray = arr => {
const randomIndex  = Math.floor(Math.random() * arr.length);
return arr[randomIndex].split('');
};

// Render the given array of characters into the phrase <ul>
const addPhraseToDisplay = arr => {
  phraseUL.innerHTML = '';
    for (let i = 0; i<arr.length; i++ ) {
      const li = createLetterLI(arr[i]);
      phraseUL.appendChild(li);
  }
};

// Reveal matching letters; return the matched character or null if not found
const checkLetter = button => {
  const letters = document.querySelectorAll('#phrase li');
  let match = null;
  for (let i = 0; i<letters.length; i++) {
    const li = letters[i];
    if(button.textContent === li.textContent) {
      li.classList.add('show');
       match = button.textContent;
    } 
  }
return match;
};

// On-screen keyboard clicks (event delegation)
qwerty.addEventListener('click', e => {
  const isButton = e.target.tagName === 'BUTTON';
  const isFresh  = e.target.className != 'chosen';
  if (isButton && isFresh) {
    const button = e.target;
    // mark the key as chosen and prevent further clicks
    button.className = 'chosen';
    button.disabled = true;

    // check if this letter exists in the phrase
    const letterFound = checkLetter(button);

    // miss: no matches found
    const isMiss = (letterFound === null);
    if (isMiss) {
      button.classList.add('lose');

       // flip one live heart to a lost heart
      const hearts = document.querySelectorAll('.tries img');
      for (let i = 0; i<hearts.length; i++) {
        const hasLiveHeart = hearts[i].src.includes('liveHeart');
        if (hasLiveHeart) {
        hearts[i].src = 'images/lostHeart.png';
        break;
        }
      } 
      missed++;
    } 
    checkWin();
  } 
});

// Decide if the game has been won or lost, then show the overlay
const checkWin = () => {
  const letter = document.querySelectorAll('#phrase li.letter');
  const show = document.querySelectorAll('#phrase li.show');

  const allLettersRevealed = (letter.length > 0 && letter.length === show.length);
  const outOfLives = missed > 4;
  if(allLettersRevealed) {
    showOverlay('win', 'You Win!');
  } else if (outOfLives) {
    showOverlay('lose', 'You Lose!');
  }
};