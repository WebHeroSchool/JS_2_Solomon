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

function buildQuiz() {
  // нам понадобится место для хранения вывода HTML
  const output = []
  // for each question...
  questionBox.forEach((currentQuestion, questionNumber) => {
    // мы хотим сохранить список вариантов ответа
    let answersBox = [];
    // and for each available answer...
    for (let letter in currentQuestion.answers) {
      //кнопки радио для ответов в HTML
      answersBox.push(
        `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter}:
            ${currentQuestion.answers[letter]}
         </label>`
      );
    }
    // add this question and it's answers to the output
    output.push(
      `<div class="slide">
         <div class="question"> ${currentQuestion.question} </div>
         <div class="answers"> ${answersBox.join("")} </div>
       </div>`
    );
  });
//объединяем наш выходной список в одну строку HTML и помещаем ее на страницу
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  // собираем контейнеры ответов из нашей викторины
  let answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;
  questionBox.forEach((currentQuestion, questionNumber) => {
    //перебираем все вопросы квиза
    const answerContainer = answerContainers[questionNumber];
    //берем подходящий элемент, номера будут совпадать в массиве с вопросами и ответами
    const selector = `input[name=question${questionNumber}]:checked`;
    //для удобства положим селектор в отдельную переменную
    const userAnswer = (answerContainer.querySelector(selector) || {}).value
    //узнаем ответ пользователя

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
    }
    //сравним ответ пользователя с правильным ответом и подсчитаем сумму правильных ответов
  });
  // показать количество правильных ответов из общего числа
  submitButton.addEventListener('click', () => {
   showResults()
  })

  resultsContainer.innerHTML = `${numCorrect} out of ${questionBox.length}`;
}



function showSlide(n) {
  //удаляем у дум узла слайд класс, который его показывает
  slides[currentSlide].classList.remove("active-slide");
  //добавляем класс слайду, который должен показываться
  slides[n].classList.add("active-slide");
  //текущий слайд равен параметру n
  currentSlide = n;

  //Если текущий слайд равен 0,
  if (currentSlide === 0) {
    //то мы не показываем кнопку предыдущий слайд
    previousButton.style.display = "none";
  } else {
    //Запускаем отсчет
    timer()
    previousButton.style.display = "inline-block";
  }


  //Если текущий слайд равен длине массива со слайдами -1
  if (currentSlide === slides.length - 1) {
    //то перестаем отображать кнопку на след вопрос
    nextButton.style.display = "none";
    //И отобразим кнопку  Узнать результаты
    submitButton.style.display = "inline-block";
  } else {
    //а если это не последний слайд, то мы показываем кнопку след слайд и не показываем кнопку узнать результаты
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

//функция .изменяющая номер текущего слайда
function showNextSlide() {
  //вызывает ф-цию showSlide  и увеличивает порядковый номер на 1.
  showSlide(currentSlide + 1);
}

//Уменьшает порядочность слайдов
function showPreviousSlide() {
  showSlide(currentSlide - 1);
}


const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

// display quiz right away
buildQuiz(questionBox);

const previousButton = document.querySelector(".button-previous");
const nextButton = document.querySelector(".button-next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

// on submit, show results
submitButton.addEventListener("click", showResults)
previousButton.addEventListener("click", showPreviousSlide)
nextButton.addEventListener("click", showNextSlide)

const checkResult = (e) => {
  //сохраняем в переменную tar DOM - элемент, по которому произошел клик
  const tar = e.target;
  //Проверяем, был ли совершен клик по инпут
  if (tar.tagName === 'INPUT') {
    //Получаем номер вопроса, копирую последний символ его атрибута Name
    const questionNumber = tar.name.slice(-1)
    //Получаем значение поля input.
    const userAnswer = tar.value;
     //Сравниваем выбранный пользователем ответ с правильным ответом
    const isCorrect = questionBox[questionNumber].correctAnswer === userAnswer;
    //Если пользователь дал правильный ответ
    if (isCorrect) {
      tar.parentNode.style.color = '#1e8a1e';
    } else {
        tar.parentNode.style.color = 'red';
      }
    //Выбираем все radio кнопки, которые находятся внутри блока с текущим вопросом
    const radioButtons = e.currentTarget.querySelectorAll('.answers input');
    //Блокируем изменения ответа, добавляя всем полям ввода атрибут disabled.
    radioButtons.forEach(button => button.setAttribute('disabled', true))
    }
}

//Объявляем ф-цию, которая устанавливает обработчик  событий checkResult на все блоки с вопросами.
const setAnswerHandlers = () => {
  Array.from(quizContainer.querySelectorAll('.slide .answers')).forEach(answer => {
    answer.addEventListener('click', checkResult);
  })
}

//Вызываем его
setAnswerHandlers()


