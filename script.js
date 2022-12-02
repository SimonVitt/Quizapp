let contentQuiz = [
    {
        "question": "Wie alt bin ich?",
        "answers": [18, 19, 20, 21],
        "solution": 1
    },
    {
        "question": "Wie alt ist Karl?",
        "answers": [8, 19, 30, 21],
        "solution": 0
    },
    {
        "question": "Wie alt ist Luis?",
        "answers": [18, 49, 70, 21],
        "solution": 3
    },
    {
        "question": "Wie alt ist Lukas?",
        "answers": [18, 19, 20, 21],
        "solution": 2
    }
];

let currentQuestion =  -1;
let rightAnswers = 0;
let selectedAnswerNumber;

let audioSuccess = new Audio('audio/success.mp3');
let audioFail = new Audio('audio/fail.mp3');

function showQuestion() {
    currentQuestion++;
    let progressPercent = Math.round(((currentQuestion ) / contentQuiz.length) *100);
    document.getElementById('progressbar').style = `width: ${progressPercent}%;`;
    document.getElementById('progressbar').innerHTML = `${progressPercent}%`;
    if (currentQuestion >= contentQuiz.length) {
        showEndScreen();
    } else {
        let question = contentQuiz[currentQuestion];
        document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
        document.getElementById('numberQuestions').innerHTML = contentQuiz.length;
        document.getElementById('question').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answers'][0];
        document.getElementById('answer_2').innerHTML = question['answers'][1];
        document.getElementById('answer_3').innerHTML = question['answers'][2];
        document.getElementById('answer_4').innerHTML = question['answers'][3];
    }
}

function answer(selection) {
    selectedAnswerNumber = selection.slice(-1);
    if (selectedAnswerNumber - 1 == contentQuiz[currentQuestion]['solution']) {
        audioSuccess.play();
        document.getElementById(selection).parentNode.parentNode.classList.add('bg-success');
        document.getElementById(`select${selectedAnswerNumber}`).style = 'background-color: rgb(175, 255, 171) !important;';
        rightAnswers++;
    } else {
        audioFail.play();
        let idRightAnswer = `answer_${contentQuiz[currentQuestion]['solution'] + 1}`;
        document.getElementById(selection).parentNode.parentNode.classList.add('bg-danger');
        document.getElementById(idRightAnswer).parentNode.parentNode.classList.add('bg-success');
        document.getElementById(`select${selectedAnswerNumber}`).style = 'background-color: rgb(255, 171, 171) !important;';
        document.getElementById(`select${contentQuiz[currentQuestion]['solution'] + 1}`).style = 'background-color: rgb(175, 255, 171) !important;';
    }
    disableAnswers();
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    resetAnswerButtons();
    enableAnswers();
    document.getElementById('nextBtn').disabled = true;
    showQuestion();
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
    currentQuestion = 0;
    rightAnswers = 0;
}