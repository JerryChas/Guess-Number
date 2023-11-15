//* Deklarera variabler
let randomNum;
let guess;
let attempts = 0;
const maxAttempts = 5;
let maxNum = 100;
let recentGuess = [randomNum];

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
const recentGuess = document.getElementById('recent-guess')

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
            console.log('Correct');
            // Skriv ut att det blev en VINST!
            headline.textContent = 'WINNER!'
            infoText.textContent = `Correct number was ${randomNum}`;
            appContainer.style.backgroundColor = 'green';
            document.body.style.backgroundColor = 'lightgreen';
            gameOver();
        } else {
            attempts++;
            attemptsLeft.textContent = `❤️ ${maxAttempts - attempts}`;
            
            // Ge ledtråd Högre eller Lägre
            if (guess < randomNum) {
                infoText.textContent = `👆Higher than ${guess}`;
            } else {
                infoText.textContent = `👇Lower than ${guess}`;
            }
        }
        console.log(`gissat nummer: ${guess}`);
        
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
    numInput.disabled = true;
    numInputBtn.disabled = true;

    playAgainBtn.style.visibility = 'unset';

    playAgainBtn.addEventListener('click', function () {
        location.reload();
    });
    playAgainBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            location.reload();
        }
    })
}

function recentGuess() {
    

}


//*----------Huvudprogram----------*//

playAgainBtn.style.visibility = 'hidden';

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
