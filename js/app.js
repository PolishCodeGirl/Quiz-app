// Get data from JSON
let questionsData = new XMLHttpRequest();
const urlJSON = `https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json`;
questionsData.open('GET', urlJSON);

// DOM elements
    let quiz = document.querySelector('.container'),
        startView = document.querySelector('.welcome'),
        quizView = document.querySelector('.content'),
        resultView = document.querySelector('.result'),
        hiView = document.querySelector('.view h2'),
        clock = document.querySelector('.timer'),
        ridle = document.getElementById('ridle'),
        //progress = document.getElementById('progress'),
        answersContent = document.getElementById('choices'),
        first = document.getElementById('first'),
        last = document.getElementById('last'),
        points = document.getElementById('score'),
        max = document.getElementById('max'),
        bntNext = document.getElementById('next');
var progress = document.getElementById('progress');


let mobile = window.matchMedia("screen and (max-width: 767px)");

if (!mobile.matches){
    hiView.classList.remove('sg-header-primary--small'); 
    quiz.style.marginTop = '10vh';
    }

//Load data arrow function  
let loadData = () => {
    let question = JSON.parse(questionsData.responseText);
    
    let QId = 0,
        score = 0;
    let numOfQuestion = question.questions.length;    
    
    // show desirable view and hide undesirable view
    startView.classList.add('hide-me');
    resultView.classList.add('hide-me');
    quizView.classList.remove('hide-me');
    clock.classList.remove('hide');
    progress.classList.remove('hide');
    
    bntNext.innerText = 'NEXT';
    
    // call timer arrow function 
    timer(question.time_seconds);
    
    
    //arrow function for loading question from JSON 
    let loadQuestion = (QId) => {
        
        let numOfAnswers = question.questions[QId].answers.length;
        
        answersContent.innerHTML="";
        ridle.innerText = question.questions[QId].question;
        first.innerText = QId + 1;
        last.innerText = numOfQuestion;
        
        // loop for loading all answers for current question 
        for(let i = 0; i<numOfAnswers; i++) {
            let newLabel = document.createElement("label"),
                newInput = document.createElement("input"),
                newSpan = document.createElement("span"),
                newBr = document.createElement("br");
            
            let questionId = question.questions[QId].answers[i].id;

            newInput.setAttribute("type", `radio`);
            newInput.setAttribute("name", `question`);
            newInput.setAttribute("id", `ans${questionId}`);
            newInput.setAttribute("value", questionId);
            
                    
            if (mobile.matches){
                newSpan.setAttribute("class", "sg-text sg-text--small select");
                ridle.style.overflowY = "scroll";
                answersContent.style.overflowY = "scroll";
            }
            else {
                newSpan.setAttribute("class", "sg-text select");
                ridle.classList.remove("sg-text--small");
            }
            
            newSpan.innerText = question.questions[QId].answers[i].answer;

            newLabel.appendChild(newInput);
            newLabel.insertBefore(newSpan, newInput.nextSibling); 
            answersContent.appendChild(newLabel);
            answersContent.appendChild(newBr);
        }
        
    }
    
    let loadNextQuestion = () => {
        let yourChoice = document.querySelector('input[type=radio]:checked');
        if(!yourChoice){
            alert('Please select your answer!');
            return;
        }
        
        let yourAnswer = yourChoice.getAttribute('value');
        
        if(question.questions[QId].answers[yourAnswer-1].correct) {
            score++;
        }
       
        
        QId++;
        yourChoice.checked = false;
        first.innerText = QId + 1;
        
        if(QId == numOfQuestion - 1) {
            bntNext.innerText = 'FINISH';
        }
        
        if(QId == numOfQuestion){
            quizView.classList.add('hide-me');
            resultView.classList.remove('hide-me');
            first.innerText = QId;
            QId = -1;
        }
        
        points.innerText = score;
        max.innerText = numOfQuestion;
        loadQuestion(QId);
    }

    loadQuestion(QId);
    
    bntNext.addEventListener('click', loadNextQuestion);

};

// click events for loading buttons 
let bntStart = document.getElementById('start'),
    bntAgain = document.getElementById('again');

bntStart.addEventListener('click', loadData);
bntAgain.addEventListener('click', loadData);

questionsData.send();


//--------------------TIMER-------------------------------------------
    // arrow function for counting down the running time
let timer = (seconds) => {
    let counter = 0,
        //timeLeft = question.time_seconds;
        timeLeft = seconds;
    clock.innerText = (timeLeft-counter);
        
    let timeIt = () => {
        counter++;
        // if times run out or user finish the quiz 
        if (counter > timeLeft || resultView.offsetLeft > 0){
            clearInterval(countDown);
            quizView.classList.add('hide-me');
            resultView.classList.remove('hide-me');
        }
        else {
            clock.innerText = (timeLeft-counter);
        }
        
        // warning of expiring time
        if ((timeLeft-counter) < 30 && (timeLeft-counter) > 0) {
            clock.style.color = "#ff796b";
        }
        else { 
            clock.style.color = "#9fa6b5";
        }
        
    }
        let countDown = setInterval(timeIt, 1000);
}
    
    //--------------------------------------------------------------

