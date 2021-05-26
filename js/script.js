const previousButton = document.querySelector(".button-previous");
const nextButton = document.querySelector(".button-next");

let api = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple'

fetch (api)
  .then((res) => res.json())
  .then((data)=>{
     return data.results.map((elem)=>{
    elem.incorrect_answers = elem.incorrect_answers.concat(elem.correct_answer);
    return elem
  })
  })
  .then((data)=>{buildQuiz(data); return data})
  .then(()=>{showSlide(0)})

let currentSlide = 0;

function buildQuiz(data) {
  // нам понадобится место для хранения вывода HTML
  const output = []
  // for each question...
  data.forEach((currentQuestion, questionNumber) => {
    // мы хотим сохранить список вариантов ответа
    let answersBox = [];
    // and for each available answer...
    for (let letter in currentQuestion.incorrect_answers) {
      //кнопки радио для ответов в HTML
      answersBox.push(
        `<label>
           <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter}:
            ${currentQuestion.incorrect_answers[letter]}
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

function showResults(data) {
  // собираем контейнеры ответов из нашей викторины
  let answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;
  data.forEach((currentQuestion, questionNumber) => {
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
  resultsContainer.innerHTML = `${numCorrect} out of ${data.length}`;
}

function timer() {
  setTimeout(() => {
    const radioButtons = quizContainer.querySelectorAll('.active-slide input');
    //Блокируем изменения ответа, добавляя всем полям ввода атрибут disabled.
    radioButtons.forEach(button => button.setAttribute('disabled', true))
  }, 10000)
}

function showSlide(n) {
  const slides = document.querySelectorAll(".slide");
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

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

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
    const isCorrect = data[questionNumber].correctAnswer === userAnswer;
    //Если пользователь дал правильный ответ
    if (isCorrect) {
      tar.parentNode.style.color = '#1e8a1e';
    } else {
        tar.parentNode.style.color = 'red';
      }
    //Выбираем все radio кнопки, которые находятся внутри блока с текущим вопросом
    const radioButtons = e.currentTarget.querySelectorAll('.answers input');
    console.log(radioButtons)
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

let form = document.querySelector('.form');
let name = document.querySelector('.form-name');
let buttons = document.querySelector('.buttons');

form.addEventListener('submit', function (event)  {
  event.preventDefault();
  let regex = /^[А-ЯЁ][а-яё]{1,10}$/;
  name.classList.remove('error');
  //Запускаем отсчет
  timer()

  if(!regex.test(name.value)) {
    event.preventDefault();
    console.log('error');
    name.classList.add('error');

    let error = document.createElement('div');
    error.className = 'error-block';
    error.style.color = 'red';
    error.innerHTML = 'С заглавной строки, русскими буквами, до 10 элементов.'
    name.parentElement.insertBefore(error, name)
  } else {
    //скрываем input и показываем quiz
    form.classList.toggle('display');
    quizContainer.classList.toggle('display');
    buttons.classList.toggle('display');
  }
})