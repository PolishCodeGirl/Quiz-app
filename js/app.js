// Get data from JSON
var questionsData = new XMLHttpRequest();
questionsData.open('GET', 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json');

var bntStart = document.getElementById('start');

bntStart.addEventListener('click', loadData);

//questionsData.onload = 
function loadData(){
    var question = JSON.parse(questionsData.responseText);
    console.log(question.questions[0]);
    
    var currentId = 0;
    var score = 0;
    var amountOfQuestion = question.questions.length;
    var firstView = document.querySelector('.welcome');
    var content = document.querySelector('.game');
    var result = document.querySelector('.result');
    var timer = document.querySelector('.timer');
    var ridle = document.getElementById('ridle');
    var answer1 = document.getElementById('ans1').nextSibling;
    var answer2 = document.getElementById('ans2').nextSibling;
    var answer3 = document.getElementById('ans3').nextSibling;
    var answer4 = document.getElementById('ans4').nextSibling;
    var number = document.getElementById('number');
    var last = document.getElementById('last');
    var bnt = document.getElementById('nextBnt');
    var bntAgain = document.getElementById('againBnt');
    var points = document.getElementById('score');
    var max = document.getElementById('max');
    
    
    firstView.classList.add('hide-me');
    content.classList.remove('hide-me');
    timer.classList.remove('hide');
    
    
    //--------------------TIMER-------------------------------------------
    var counter = 0;
    var timeLeft = question.time_seconds;
    function setup() {
        timer.innerText = (timeLeft-counter);


        function timeIt(){
            counter++;
            // if times run out or user finish the quiz 
            if (counter > timeLeft || result.offsetLeft > 0){
                clearInterval(countDown);
                content.classList.add('hide-me');
                result.classList.remove('hide-me');
                //timer.innerText = 0;
            }
            else {
                timer.innerText = (timeLeft-counter);
            }
            
        }

        var countDown = setInterval(timeIt, 1000);
    }

    setup();
    
    //--------------------------------------------------------------

    function loadQuestion (currentId) {
        ridle.innerText = question.questions[currentId].question;
        console.log(answer1);
        answer1.innerText = question.questions[currentId].answers[0].answer;
        answer2.innerText = question.questions[currentId].answers[1].answer;
        answer3.innerText = question.questions[currentId].answers[2].answer;
        answer4.innerText = question.questions[currentId].answers[3].answer;
        
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
            points.innerText = score;
            max.innerText = amountOfQuestion;
            currentId = 0;
        }
        loadQuestion(currentId);
    }

    loadQuestion(currentId);
    
    bnt.addEventListener('click', loadNextQuestion);
    //bntAgain.addEventListener('click', loadNextQuestion);
};
questionsData.send();


