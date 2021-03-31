
import { multiply, visualAnswear } from "./multiply.js";
import { checkInput } from "./validation.js";

const culcButton = document.querySelector(".calc-button");
const clearButton = document.querySelector(".clear-button");
const warning = document.querySelector('.notice');

const form = document.getElementById('form');
const cardFooter = document.getElementById('solution');
const inputs = form.getElementsByTagName("input");
const operands = [...inputs];

//start of calculations
culcButton.addEventListener('click', startCalc);

clearButton.addEventListener('click', () => {
  operands.forEach((elem) => elem.value = '');
  warning.classList.add('d-none');

  if (cardFooter.hasChildNodes()) {
    cardFooter.firstChild.remove();
  }
});
//element is showed when something went wrong

form.addEventListener("focus", function (event) {
  let elem = event.target;
  if (elem.tagName === 'INPUT') {
    warning.classList.remove('d-block');
    warning.classList.add('d-none');
  }
}, true);

function startCalc() {
  //insert the answer here

  if (cardFooter.hasChildNodes()) {
    cardFooter.firstChild.remove();
  }

  for (let elem of operands) {
    const { error, message } = checkInput(elem.value);
    if (error) {
      let text = warning.querySelector('.notice-text');
      text.textContent = message;
      warning.classList.remove('d-none');
      warning.classList.add('d-block');
      return;
    }
  }

  //multyple returns array (arr[0], arr[1] - multiplicanda, multiplier, arr[length -1] - answear, 
  //arr[other] - steps long multiplication
  //all elements are arrays in reverse order

  let answear = multiply(operands[0].value, operands[1].value);

  visualAnswear(answear, cardFooter);
}