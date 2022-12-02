let contentQuiz = [
    {
        "question": "Wer hat HTML erfunden?",
        "answers": ['Robbie Williams', 'Lady Gaga', 'Tim Berners-Lee', 'Justin Bieber'],
        "solution": 2
    },
    {
        "question": "Was bedeutet das HTML Tag <a>?",
        "answers": ['Text Fett', 'Container', 'Ein Link', 'Kursiv'],
        "solution": 2
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answers": ['&lt;iframe&gt;, &lt;frame&gt; and &lt;frameset&gt;', '&lt;iframe&gt;', '&lt;frame&gt;', '&lt;frameset&gt;'],
        "solution": 1
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answers": ['&lt;strong&gt;', 'CSS nutzen', '&lt;bold&gt;', '&lt;b&gt;'],
        "solution": 0
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answers": ['readonly', 'max', 'from', 'spellcheck'],
        "solution": 0
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ <a> mit dem Attribut title aus?",
        "answers": ['a[title]{...}', 'a > title {...}', 'a.title {...}', 'a=title {...}'],
        "solution": 0
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answers": ['let 100 = rate;', '100 = let rate;', 'rate = 100;', 'let rate = 100;'],
        "solution": 3
    }
];

let currentQuestion =  -1;
let rightAnswers = 0;
let selectedAnswerNumber;

let audioSuccess = new Audio('audio/success.mp3');
let audioFail = new Audio('audio/fail.mp3');

function showQuestion() {
    currentQuestion++;
    updateProgressbar();
    if (allQuestionsAsked()) {
        showEndScreen();
    } else {
        initializeQuestion();
    }
}

function initializeQuestion(){
    let question = contentQuiz[currentQuestion];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('numberQuestions').innerHTML = contentQuiz.length;
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answers'][0];
    document.getElementById('answer_2').innerHTML = question['answers'][1];
    document.getElementById('answer_3').innerHTML = question['answers'][2];
    document.getElementById('answer_4').innerHTML = question['answers'][3];
}

function allQuestionsAsked(){
    return currentQuestion >= contentQuiz.length;
}

function answer(selection) {
    selectedAnswerNumber = selection.slice(-1);
    if (checkAnswer(selectedAnswerNumber)) {
        answerRight(selection);
    } else {
        answerWrong(selection);
    }
    disableAnswers();
    document.getElementById('nextBtn').disabled = false;
}

function answerWrong(selection){
    audioFail.play();
    let idRightAnswer = `answer_${contentQuiz[currentQuestion]['solution'] + 1}`;
    document.getElementById(selection).parentNode.parentNode.classList.add('bg-danger');
    document.getElementById(idRightAnswer).parentNode.parentNode.classList.add('bg-success');
    document.getElementById(`select${selectedAnswerNumber}`).style = 'background-color: rgb(255, 171, 171) !important;';
    document.getElementById(`select${contentQuiz[currentQuestion]['solution'] + 1}`).style = 'background-color: rgb(175, 255, 171) !important;';
}

function answerRight(selection){
    audioSuccess.play();
    document.getElementById(selection).parentNode.parentNode.classList.add('bg-success');
    document.getElementById(`select${selectedAnswerNumber}`).style = 'background-color: rgb(175, 255, 171) !important;';
    rightAnswers++;
}

function checkAnswer(selectedAnswerNumber){
    return selectedAnswerNumber - 1 == contentQuiz[currentQuestion]['solution'];
}

function nextQuestion() {
    resetAnswerButtons();
    enableAnswers();
    document.getElementById('nextBtn').disabled = true;
    showQuestion();
}

function updateProgressbar(){
    let progressPercent = Math.round(((currentQuestion ) / contentQuiz.length) *100);
    document.getElementById('progressbar').style = `width: ${progressPercent}%;`;
    document.getElementById('progressbar').innerHTML = `${progressPercent}%`;
    document.getElementById('progressbar2').style = `width: ${progressPercent}%;`;
    document.getElementById('progressbar2').innerHTML = `${progressPercent}%`;
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.parentNode.classList.remove('bg-success');

    document.getElementById(`select${selectedAnswerNumber}`).style = '';
    document.getElementById(`select${contentQuiz[currentQuestion]['solution'] + 1}`).style = '';
}

function disableAnswers(){
    document.getElementById('answer_1').parentNode.parentNode.style = 'pointer-events: none;';
    document.getElementById('answer_2').parentNode.parentNode.style = 'pointer-events: none;';
    document.getElementById('answer_3').parentNode.parentNode.style = 'pointer-events: none;';
    document.getElementById('answer_4').parentNode.parentNode.style = 'pointer-events: none;';
}

function enableAnswers(){
    document.getElementById('answer_1').parentNode.parentNode.style = '';
    document.getElementById('answer_2').parentNode.parentNode.style = '';
    document.getElementById('answer_3').parentNode.parentNode.style = '';
    document.getElementById('answer_4').parentNode.parentNode.style = '';
}

function showEndScreen() {
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('endBody').style = '';
    document.getElementById('rightAnswers').innerHTML = rightAnswers;
    document.getElementById('amountQuestions').innerHTML = contentQuiz.length;
}

function startQuiz(){
    document.getElementById('questionBody').style = '';
    document.getElementById('startBody').style = 'display: none;';
    showQuestion();
}

function backToStart(){
    document.getElementById('startBody').style = '';
    document.getElementById('endBody').style = 'display: none;';
    document.getElementById('progressbar').style = `width: 0%;`;
    currentQuestion = -1;
    rightAnswers = 0;
}