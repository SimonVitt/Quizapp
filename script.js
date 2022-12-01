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

let currentQuestion = 0;

function init(){
    document.getElementById('numberQuestions').innerHTML = contentQuiz.length;
    showQuestion();
}

function showQuestion(){
    let question = contentQuiz[currentQuestion];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answers'][0];
    document.getElementById('answer_2').innerHTML = question['answers'][1];
    document.getElementById('answer_3').innerHTML = question['answers'][2];
    document.getElementById('answer_4').innerHTML = question['answers'][3];
}

function answer(selection){
    let selectedAnswerNumber = selection.slice(-1);
    if(selectedAnswerNumber - 1 == contentQuiz[currentQuestion]['solution']){
        document.getElementById(selection).parentNode.parentNode.classList.add('bg-success');
    }else{
        let idRightAnswer = `answer_${contentQuiz[currentQuestion]['solution'] + 1}`;
        document.getElementById(selection).parentNode.parentNode.classList.add('bg-danger');
        document.getElementById(idRightAnswer).parentNode.parentNode.classList.add('bg-success')
    }
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion(){
    currentQuestion++;
    resetAnswerButtons();
    document.getElementById('nextBtn').disabled = true;
    showQuestion();
}

function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.parentNode.classList.remove('bg-success');
}