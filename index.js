const result = document.getElementById('result1');
const lengthEl = document.getElementById('length');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const buttonEl = document.getElementById('button');
const clipBoard = document.getElementById('clipboard');
const tooltip = document.querySelector('.tooltip');
console.log(tooltip);

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

clipBoard.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = result.textContent;

    if (!password) {
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    tooltip.classList.add('show');
    if (document.execCommand('copy')) {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 1000);
    }
    textArea.remove();
});

buttonEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lower.checked;
    const hasUpper = upper.checked;
    const hasNumbers = numbers.checked;
    const hasSymbols = symbols.checked;
    result.textContent = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let result = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
        (item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            result += randomFunc[funcName]();
        });
    }
    const finalResult = result.slice(0, length);
    return finalResult;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor((Math.random() * 26) + 97));
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor((Math.random() * 26) + 65));
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor((Math.random() * 10) + 48));
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


