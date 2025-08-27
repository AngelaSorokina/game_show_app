const qwerty = document.getElementById('qwerty');
const ul = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');


let missed = 0;

const phrases = [
  "javascript is fun",
  "never give up",
  "open your mind",
  "keep moving forward",
  "practice makes perfect"
];

btnReset.addEventListener('click', () => {
btnReset.parentNode.style.display = 'none';
});

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
const randomIndex  = Math.floor(Math.random() * arr.length);
const phrase = arr[randomIndex];
return phrase.split('');
};

//adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i<arr.length; i++ ) {
        const li = document.createElement('li');
        const character = arr[i];
        li.textContent = character;
        if (character === ' ') {
           li.className = 'space';
        } else {
           li.className = 'letter';
        }
        ul.appendChild(li);
    }
    
};

// check if a letter is in the phrase
const checkLetter = button => {
  const letters = document.querySelectorAll('li');
  let match = null;
  for (let i = 0; i<letters.length; i++) {
    const li = letters[i];
    if(button.textContent === li.textContent) {
      li.classList.add('show');
       match = button.textContent;
    } else {

    }
  }
return match;
};

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' && e.target.className != 'chosen') {
    const button = e.target;
    button.className = 'chosen';
    button.disabled = true;
    const letterFound = checkLetter(button);
    if (letterFound === null) {
      const hearts = document.querySelectorAll('.tries img');
      for (let i = 0; i<hearts.length; i++) {
        if (hearts[i].src.includes('liveHeart')) {
        hearts[i].src = 'images/lostHeart.png';
        break;
        }
      } 
      missed++;
    } 
  } 
});