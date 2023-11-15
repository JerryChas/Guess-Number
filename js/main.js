//* Deklarera variabler
let randomNum;
let guess;
let attempts = 0;
const maxAttempts = 5;
let maxNum = 100;
let recentGuess = ['<❔>'];

//* Hämta element
const appContainer = document.getElementById('app-container');
const attemptsLeft = document.getElementById('attempts-left');
const headline = document.getElementById('headline-h2');
const numInput = document.getElementById('num-input'); 
numInput.min = 0;
numInput.max = maxNum;
const numInputBtn = document.getElementById('num-input-btn'); 
const infoText = document.getElementById('info-text');
const playAgainBtn = document.getElementById('play-again-btn')
const recentGuessElement = document.getElementById('recent-guess')

//* Funktioner

//Gissa
function makeGuess() {
    // Sparar värde från input
    guess = parseInt(numInput.value);

    // Kontrollera inmatning
    if (guess < 0 || guess > maxNum || numInput.value === '' || numInput.value.startsWith('.')) {
        // Om inmatning INTE är ett nummer, lägre än noll, högre än valda maximala nummer eller tomt
        numInput.placeholder = `0 - ${maxNum}`;
        
    } else {
        // Om korrekt gissat
        if (guess === randomNum) {
            correctGuess();
            gameOver();
        } else {
            incorrectGuess();
        }
        console.log(`gissat nummer: ${guess}`);

        addRecentGuess()
        
        // Lägg till ett villkor för att avsluta spelet när maxAttempts uppnås
        if (attempts === maxAttempts) {
            attemptsLeft.textContent = `🩶 ${maxAttempts - attempts}`;
            headline.textContent = 'YOU LOSE!'
            infoText.textContent = `Correct number was ${randomNum}`;
            appContainer.style.backgroundColor = 'darkred';
            document.body.style.backgroundColor = 'red';
            
            gameOver()
        }

        numInput.placeholder = '';

    }
    // Tömmer input
    numInput.value = '';
}
//när spelet är över
function gameOver() {
    //inaktivera input  och knapp
    numInput.disabled = true;
    numInputBtn.disabled = true;
    
    //Visa play again-knappen
    playAgainBtn.style.visibility = 'unset';
    //lägg focus på knappen
    setTimeout(function() {
        playAgainBtn.focus();
    }, 1);;

    //Ladda om sidan vid klick på knappen
    playAgainBtn.addEventListener('click', function () {
        location.reload();
    });
    playAgainBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            location.reload();
        }
    })
}
//visar tidigare gissningar
function addRecentGuess() {
    //om fel svar
    if (guess !== randomNum){
        //lagra gissning i array
        if (guess < randomNum) {
            recentGuess.unshift(guess)
        } else {
            recentGuess.push(guess)
        }
    }
    // Anropa sorteringsfunktionen
    recentGuess = sortArrayNumerically(recentGuess);
    //göra elementet synligt
    recentGuessElement.style.visibility = 'unset';
    //presentera gissade nummer 
    recentGuessElement.innerText = `${recentGuess.join('  ')}`;
}
//Funktion för att sortera i nummerordning
function sortArrayNumerically(array) {
    return array.sort(function(a, b) {
        return a - b;
    });
}
// FEL gissning
function incorrectGuess() {
    attempts++;
    attemptsLeft.textContent = `❤️ ${maxAttempts - attempts}`;

    // Ge ledtråd Högre eller Lägre
    if (guess < randomNum) {
        infoText.textContent = `👆Higher than ${guess}`;
    } else {
        infoText.textContent = `👇Lower than ${guess}`;
    }
}
// RÄTT gissning
function correctGuess() {
    console.log('Correct');
    headline.textContent = 'WINNER!';
    infoText.textContent = `Correct number was ${randomNum}`;
    appContainer.style.backgroundColor = 'green';
    document.body.style.backgroundColor = 'lightgreen';
    gameOver();
}

//*----------Huvudprogram----------*//

playAgainBtn.style.visibility = 'hidden';
recentGuessElement.style.visibility = 'hidden';

//* Generera det slumpvisa talet
randomNum = Math.floor(Math.random() * maxNum + 1);
console.log(randomNum);
attemptsLeft.textContent = `❤️ ${maxAttempts - attempts}`;
infoText.textContent = `Type a number between 0 - ${maxNum}`;

//* Eventlyssnare för klick på knapp
numInputBtn.addEventListener('click', function(){
    //anropar funktion
    makeGuess();
});
//* Eventlyssnare för tangent "Enter"
numInput.addEventListener('keydown', function(e){
    if (e.key === 'Enter') {
        makeGuess();
    }
});
