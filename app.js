// const input1 = 
// const input2 = 
var num1 = 1.5;
var num2 = 5;
var printResult = true;
var resultPhrase = 'Result is: ';
function add(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return n1 + n2;
    }
}
add(num1, num2, printResult, resultPhrase);
