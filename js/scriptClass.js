class GameStart {

  constructor() {
    this.form = document.querySelector('.form')
    console.log(this.form)
    this.name = document.querySelector('.form-name');
    this.buttons = document.querySelector('.buttons')
    this.quizContainer = document.getElementById("quiz");
  }

  clickStart () {
    this.form.addEventListener('submit', function (event) {
      event.preventDefault();
      this.regex = /^[А-ЯЁ][а-яё]{1,10}$/;
      this.name.classList.remove('error');
      //Запускаем отсчет

      if (!this.regex.test(this.name.value)) {
        event.preventDefault();
        console.log('error');
        this.name.classList.add('error');

        this.error = document.createElement('div');
        this.error.className = 'error-block';
        this.error.style.color = 'red';
        this.error.innerHTML = 'С заглавной строки, русскими буквами, до 10 элементов.'
        this.name.parentElement.insertBefore(this.error, this.name)
      } else {
        //////////////////////////////////////////////////////
        //Если не добавить, то будет ошибка
        this.form = document.querySelector('.form')
        this.name = document.querySelector('.form-name');
        this.buttons = document.querySelector('.buttons')
        this.quizContainer = document.getElementById("quiz");
        console.log(this.form)
        //Если не добавить, то будет ошибка
        /////////////////////////////////////////////////////
        //скрываем input и показываем quiz
        this.form.classList.toggle('display');
        this.quizContainer.classList.toggle('display');
        this.buttons.classList.toggle('display');
      }
    })
  }

  timer() {
    setTimeout(() => {
      const radioButtons = this.quizContainer.querySelectorAll('.active-slide input');
      //Блокируем изменения ответа, добавляя всем полям ввода атрибут disabled.
      radioButtons.forEach(button => button.setAttribute('disabled', true))
    }, 10000)
  }
}

new GameStart().clickStart()