const div = document.getElementById('qwerty');
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