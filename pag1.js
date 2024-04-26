
///preguntas

const questions = [
    {   
        question: 'Todos me quieren para descansar. Si ya te lo he dicho, no lo pienses más. ¿Qué soy?',
        answer: [
        
        { text: 'Una mochila 🎒​', correct: false },
        { text: 'No lo se 🥲​', correct: false},
        { text: 'La silla 🪑​', correct: true },
        { text: 'Un carro 🚗​', correct: false },
    
        ]
    },

    {
        question: '¿Cuales son los meses que tienen 28 días?',
        answer: [

        { text: "Febrero", correct: true },
        { text: "Enero", correct: false },
        { text: "Diciembre", correct: false },
        { text: "Septiembre", correct: false },

        ]

    },

    {
        question: 'Si participas en una carrera y adelantas al que va segundo… ¿En qué puesto estás?',
        answer: [

        { text: 'Tercero', correct: false },
        { text: 'Primero', correct: false},
        { text: 'Segundo', correct: true },
        { text: 'Cuarto', correct: false },
       
        ]
    },

    {
        question: ' ¿Qué pesa más, un kilo de hierro o un kilo de plumas?',
        answer: [

        { text: 'Obvio el de hierro', correct: false },
        { text: 'Acero', correct: false},
        { text: 'Ambos', correct: true },
        { text: 'El de plumas', correct: false },
       
        ]
    },

    {
        question: ' ¿1+2(5)?',
        answer: [

        { text: '15', correct: false },
        { text: '11', correct: true},
        { text: '7', correct: false },
        { text: 'no tengo la respuesta.', correct: false },
       
        ]
    },

];  

//variables

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answer.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){

            button.dataset.correct= answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });


}

function  resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function  selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect= selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block"
}

function showScore(){
    resetState();
    questionElement.innerHTML=`Obtuviste ${score} de ${questions.length}!`;
 nextButton.innerHTML="Jugar de nuevo";
 nextButton.style.display="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();


    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
        
    }else{
        startQuiz();
    }
})
startQuiz()

// Dj cumbia sonido 

function playAudio(){

    document.getElementById("musica1").Play();
}


//Libreria anijs

window.requestAnimFrame = (function(){   return  window.requestAnimationFrame})();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");

var numStars = 1900;
var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
var focalLength = canvas.width *2;
var warp = 0;
var centerX, centerY;

var stars = [], star;
var i;

var animate = true;

initializeStars();

function executeFrame(){
  
  if(animate)
    requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars(){
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  
  stars = [];
  for(i = 0; i < numStars; i++){
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: '0.'+Math.floor(Math.random() * 99) + 1
    };
    stars.push(star);
  }
}

function moveStars(){
  for(i = 0; i < numStars; i++){
    star = stars[i];
    star.z--;
    
    if(star.z <= 0){
      star.z = canvas.width;
    }
  }
}

function drawStars(){
  var pixelX, pixelY, pixelRadius;
  
  // Resize to the screen
  if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  if(warp==0)
  {c.fillStyle = "rgba(0,10,20,1)";
  c.fillRect(0,0, canvas.width, canvas.height);}
  c.fillStyle = "rgba(209, 255, 255, "+radius+")";
  for(i = 0; i < numStars; i++){
    star = stars[i];
    
    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength / star.z);
    
    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
    //c.fill();
  }
}

document.getElementById('warp').addEventListener("click",function(e){
 window.warp = window.warp==1 ? 0 : 1;
window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
executeFrame();
});

executeFrame();

