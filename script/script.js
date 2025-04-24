const questions = [
    {
        type: 'choose',
        question: 'Как звали отца Арагорна?',
        answers: ['Араторн', 'Фарамир', 'Боромир', 'Теоден'],
        correctIndex: 0
    },
    {
        type: 'write',
        question: 'Сколько Великих колец было дано расе людей??',
        answers: '9'
    },
    {
        type: 'choose',
        question: 'Что напугало орков в Копях Мории?',
        answers: ['Гэндальф', 'Балрог', 'Фродо', 'Арагорн'],
        correctIndex: 1
    },
    {
        type: 'write',
        question: 'В каком году вышел фильм «Две крепости»?',
        answers: '2002'
    },
    {
        type: 'choose',
        question: 'Кто убивает Гриму Червеуста?',
        answers: ['Леголас', 'Гэндальф', 'Арагорн', 'Гимли'],
        correctIndex: 0
    },
    {
        type: 'choose',
        question: 'В какой стране происходили съемки кинотрилогии?',
        answers: ['Россия', 'Новая Зеландия', 'США', 'Великобритания'],
        correctIndex: 1
    },
    {
        type: 'choose',
        question: 'Кто освободил короля Теодена от чар Сарумана?',
        answers: ['Леголас', 'Арвэн', 'Гэндальф', 'Фродо'],
        correctIndex: 2
    },
    {
        type: 'choose',
        question: 'Как называются волкоподобные животные, которые нападают на Теодена и его людей?',
        answers: ['Варги', 'Ликаны', 'Оборотни', 'Волколаки'],
        correctIndex: 0
    }
]

let currentQuestionIndex = 0;
let score = 0;
let endMessage;

function showQuestion() {

    const oldContainer = document.querySelector('.question-container');
    if (oldContainer) {
        document.body.removeChild(oldContainer);
    }


    if (currentQuestionIndex >= questions.length) {
        endMessage = document.createElement('div');
        endMessage.className = 'test-result';
        endMessage.innerHTML = `
            <h2>Тест завершён!</h2>
            <p>Правильных ответов: ${score} из ${questions.length}</p>
        `;
        document.body.appendChild(endMessage);
        restartButton();
        return;
    }

    const questionObj = questions[currentQuestionIndex];


    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.dataset.type = questionObj.type




    const counterElement = document.createElement('p');
    counterElement.className = 'question-counter';
    counterElement.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
    questionContainer.appendChild(counterElement);


    const questionElement = document.createElement('h2');
    questionElement.className = 'question-text';
    questionElement.textContent = questionObj.question;
    questionContainer.appendChild(questionElement);




    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';


    if (questionObj.type === 'write') {
        const inputCase = document.createElement('div');
        inputCase.classList.add('input-case');
        const inputAnswer = document.createElement('input');
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Ответить →';
        inputCase.appendChild(inputAnswer);
        inputCase.appendChild(confirmButton);
        answersContainer.appendChild(inputCase);
        confirmButton.addEventListener('click', () => {
            if (inputAnswer.value === questions[currentQuestionIndex].answers) {
                alert('Верный ответ!');
                score++;

            } else {
                alert('Неверный ответ!');

            }
            currentQuestionIndex++;
            showQuestion()
        })
    } else {
        questionObj.answers.forEach((answer, index) => {
            const answerButton = document.createElement('button');
            answerButton.className = 'answer-button';
            answerButton.textContent = answer;

            answerButton.addEventListener('click', () => {
                if (index === questionObj.correctIndex) {
                    score++;
                    answerButton.classList.add('correct')
                } else {
                    answerButton.classList.add('incorrect')
                }

                setTimeout(() => {
                    currentQuestionIndex++;
                    showQuestion();
                }, 1000);
            });

            answersContainer.appendChild(answerButton);
        })
    }



    questionContainer.appendChild(answersContainer);
    document.body.appendChild(questionContainer);


}



function restartButton() {
    const restartButton = document.createElement('button')
    restartButton.className = 'restart-button'
    restartButton.innerText = 'Попробовать снова'
    document.body.appendChild(restartButton)

    restartButton.addEventListener('click', () => {
        document.body.removeChild(endMessage);
        document.body.removeChild(document.querySelector('.restart-button'))
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    })

}

const startButton = document.querySelector('.start-button');
const subtitle = document.querySelector('.subtitle');

startButton.addEventListener('click', () => {
    document.body.removeChild(startButton);
    document.body.removeChild(subtitle);
    showQuestion();
});

