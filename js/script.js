let num = 0;
let numSlide = 0;
let score = 0;

const questions1 = {
  question: 'Кто создал и когда JS?',
  answers: {
    A: 'Борис Горох в 1995 году.',
    B: 'Бен Карсон в 1997 году.',
    C: 'Брендан Ейх в 1995 году.',
    D: 'Дмитрий Козлов в 1992 году.',
  },
  correctAnswer: 'C',
}

const questions2 = {
  question: 'Что такое API?',
  answers: {
    A: 'Описание способов, которыми одна компьютерная программа может взаимодействовать с другой программой.',
    B: 'Сервера, на которых находятся программы.',
    C: 'Модули',
    D: 'Фреймворк.',
  },
  correctAnswer: 'A',
}

const questions3 = {
  question: 'К какому семейству птиц относится снегирь?',
  answers: {
    A: 'Дроморнитиды.',
    B: 'Гагаровые.',
    C: 'Голубиные.',
    D: 'Вьюрковые.',
  },
  correctAnswer: 'D',
}

const questions4 = {
  question: 'Каким предметом китайцы стараются не пользоваться в преддверии Нового года, чтобы не разрушить счастья?',
  answers: {
    A: 'Ложка.',
    B: 'Бокал.',
    C: 'Нож.',
    D: 'Чайная ложка.',
  },
  correctAnswer: 'C',
}

//Наполняем массив

let questionBox = [questions1, questions2, questions3, questions4];

// перебор массива с последующим фильтром правильных ответов варианта 'С'

questionBox.forEach((item)=> {
  if (item.correctAnswer === 'C') {
    console.log(item.answers['C'])
  }
})

//алгоритм функции, который сверяет ответы и выводить результат в консоль.

let answerBox = ['C', 'C', 'D', 'C'];

function compare() {
  questionBox.map((item, index) => {
    if (item.correctAnswer === answerBox[index]) {
      console.log(answerBox[index], '- Правильный ответ');
      score++;
    } else {
      console.log(answerBox[index], '- Неправильный ответ');
    }
  })
}
compare()

const question = document.getElementById('question');

function buildQuiz(score) {
  question.innerHTML = 'Правильных ответов - ' + score
  question.style.color = '#000'
}

buildQuiz(score)

//Урок 7

const buttonPrevious = document.querySelector('.button-previous')
const buttonNext = document.querySelector('.button-next')

let showSlide = () => {
  buttonPrevious.addEventListener('click', (event) => {
    if (numSlide > 0) {
      numSlide--
      console.log(numSlide)
    } else {
      event.stopPropagation()
    }
  })
  buttonNext.addEventListener('click', (event) => {
    numSlide++;
    console.log(numSlide)
  })
}

showSlide()

// const showResults = () => {
//   const answerContainer = questionBox.querySelectorAll('.answers');
  //
  // let numCorrect = 0;
  //
  // questionBox.question.forEach((currentQuestion, questionNumber) => {
  //   //перебираем все вопросы квиза
  //   const answerContainer = answerContainer[questionNumber];
  //   //берем подходящий элемент, номера будут совпадать в массиве с вопросами и ответами
  //   const selector = `input[name=question${questionNumber}]:checked`;
  //   //для удобства положим селектор в отдельную переменную
  //   const userAnswer = (answerContainer.querySelector(selector) || {}).value
  //   //узнаем ответ пользователя
  //
  //   if (userAnswer === currentQuestion.correctAnswer) {
  //     numCorrect++;
  //   }
  //   //сравним ответ пользователя с правильным ответом и подсчитаем сумму правильных ответов
  // });
// }
//
// submitButton.addEventListener('click', () => {
//   showResults()
// })