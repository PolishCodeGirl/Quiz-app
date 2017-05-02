// Get data from JSON
var questionsData = new XMLHttpRequest();
questionsData.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json');


// click events for loading buttons 
var bntStart = document.getElementById('start'),
    bntAgain = document.getElementById('againBnt');

bntStart.addEventListener('click', loadData);
bntAgain.addEventListener('click', loadData);


//Load data function  
function loadData(){
    var question = JSON.parse(questionsData.responseText);
    //console.log(question.questions[0]);
    
    var currentId = 0;
    var score = 0;
    var amountOfQuestion = question.questions.length;
    var firstView = document.querySelector('.welcome');
    var content = document.querySelector('.game');
    var result = document.querySelector('.result');
    var timer = document.querySelector('.timer');
    var ridle = document.getElementById('ridle');
    var progress = document.getElementById('progress');
    var answersContent = document.getElementById('choices');
    var number = document.getElementById('number');
    var last = document.getElementById('last');
    var bnt = document.getElementById('nextBnt');
    var points = document.getElementById('score');
    var max = document.getElementById('max');
    
    
    firstView.classList.add('hide-me');
    content.classList.remove('hide-me');
    result.classList.add('hide-me');
    timer.classList.remove('hide');
    progress.classList.remove('hide');
    
    bnt.innerText = 'NEXT';
    console.log(timer);
    
    
    //--------------------TIMER-------------------------------------------
    var counter = 0;
    var timeLeft = 20; //question.time_seconds;
    
    function setup() {
        timer.innerText = (timeLeft-counter);


        function timeIt(){
            counter++;
            // if times run out or user finish the quiz 
            if (counter > timeLeft || result.offsetLeft > 0){
                clearInterval(countDown);
                content.classList.add('hide-me');
                result.classList.remove('hide-me');
                //currentId = 0;
                //loadQuestion(currentId);
            }
            else {
                timer.innerText = (timeLeft-counter);
            }
            
            // warning of expiring time
            if ((timeLeft-counter) < 30 && (timeLeft-counter) > 0) {
                timer.style.color = "#ff796b";
            }
            else { 
                timer.style.color = "#9fa6b5";
            }
            
        }

        var countDown = setInterval(timeIt, 1000);
    }

    setup();
    
    //--------------------------------------------------------------

    function loadQuestion (currentId) {
        
        //---------------------------------------------------
        answersContent.innerHTML="";
        var answerLength = question.questions[currentId].answers.length;
        var newDiv = document.createElement("div");
        
        for(var i = 0; i<answerLength; i++) {
            var newLabel = document.createElement("label");
            var newInput = document.createElement("input");
            var newSpan = document.createElement("span");
            var newBr = document.createElement("br");
            var questionId = question.questions[currentId].answers[i].id
            //console.log(newLabel);

            newInput.setAttribute("type", "radio");
            newInput.setAttribute("name", "question");
            newInput.setAttribute("id", "ans" + questionId);
            newInput.setAttribute("value", questionId);
            newSpan.className = "select";
            
            newSpan.innerText = question.questions[currentId].answers[i].answer;

            newLabel.appendChild(newInput);
            newLabel.insertBefore(newSpan, newInput.nextSibling); 
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newBr);
        }
        
        answersContent.appendChild(newDiv);
        console.log(newDiv);
                

        //----------------------------------------------------
        
        ridle.innerText = question.questions[currentId].question;
        
        number.innerText = currentId + 1;
        last.innerText = amountOfQuestion;
        
    }
    
    function loadNextQuestion () {
        var yourChoice = document.querySelector('input[type=radio]:checked');
        if(!yourChoice){
            alert('Please select your answer!');
            return;
        }
        
        var yourAnswer = yourChoice.getAttribute('value');
        
        if(question.questions[currentId].answers[yourAnswer-1].correct) {
            console.log("poprawna odpowiedz");
            score++;
        }
        else {
            console.log("błędna odpowiedz");
        }
        currentId++;
        yourChoice.checked = false;
        number.innerText = currentId + 1;
        
        if(currentId == amountOfQuestion - 1) {
            bnt.innerText = 'FINISH';
        }
        
        if(currentId == amountOfQuestion){
            content.classList.add('hide-me');
            result.classList.remove('hide-me');
            number.innerText = currentId;
            currentId = -1;
        }
        
        points.innerText = score;
        max.innerText = amountOfQuestion;
        loadQuestion(currentId);
    }

    loadQuestion(currentId);
    
    bnt.addEventListener('click', loadNextQuestion);

};
questionsData.send();


