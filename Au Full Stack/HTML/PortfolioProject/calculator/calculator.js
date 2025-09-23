const display = document.getElementById('display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    let expression = display.value;
    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');

    try {
        let result = eval(expression);
        display.value = result;
    } catch {
        display.value = 'Error';
    }
}
