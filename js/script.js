let num = '0';
let score;


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
    B: 'Сервера, на которых находятся программы',
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

let questionBox = [questions1, questions2, questions3, questions4]; //Наполняем массив

questionBox.forEach((item)=> {            // перебор массива с последующим фильтром правильных ответов варианта 'С'
  if (item.correctAnswer === item.answers['C']) {
    console.log(item.correctAnswer)
  }
})

//Написать алгоритм функции, который будет сверять ответы и выводить результат.

let answerBox = ['C', 'D', 'D', 'C'];

function compare() {
  questionBox.map((item, index) => {
    if (item.correctAnswer === answerBox[index]) {
      console.log(answerBox[index], '- Правильный ответ');
    } else {
      console.log(answerBox[index], '- Неправильный ответ');
    }
  })
}
compare()