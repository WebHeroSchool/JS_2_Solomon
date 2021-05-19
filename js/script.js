let num = '0';
let score;
let questionBox = [];


const questions1 = {
  question: 'Кто создал и когда JS?',
  answers: {
    A: 'Борис Горох в 1995 году.',
    B: 'Бен Карсон в 1997 году.',
    C: 'Брендан Ейх в 1995 году.',
    D: 'Дмитрий Козлов в 1992 году.',
  },
  correctAnswer: 'Брендан Ейх в 1995 году.',
}

const questions2 = {
  question: 'Что такое API?',
  answers: {
    A: 'Описание способов, которыми одна компьютерная программа может взаимодействовать с другой программой.',
    B: 'Сервера, на которых находятся программы',
    C: 'Модули',
    D: 'Фреймворк.',
  },
  correctAnswer: 'Описание способов, которыми одна компьютерная программа может взаимодействовать с другой программой.',
}

const questions3 = {
  question: 'К какому семейству птиц относится снегирь?',
  answers: {
    A: 'Дроморнитиды.',
    B: 'Гагаровые.',
    C: 'Голубиные.',
    D: 'Вьюрковые.',
  },
  correctAnswer: 'Вьюрковые.',
}

const questions4 = {
  question: 'Каким предметом китайцы стараются не пользоваться в преддверии Нового года, чтобы не разрушить счастья?',
  answers: {
    A: 'Ложка.',
    B: 'Бокал.',
    C: 'Нож.',
    D: 'Чайная ложка.',
  },
  correctAnswer: 'Нож.',
}

questionBox.push(questions1, questions2, questions3, questions4); //Наполняем массив

// questionBox.forEach((item)=> {            // перебор массива с последующим фильтром правильных ответов варианта 'С'
//   if (item.correctAnswer === item.answers['C']) {
//     console.log(item.correctAnswer)
//   }
// })

function compare() {
  questionBox.forEach((item)=> {            
    switch (item.correctAnswer){
      case item.answers['A']:
        console.log('A. Правильно!')
        break;
      case item.answers['B']:
        console.log('B. Правильно!')
        break;
      case item.answers['C']:
        console.log('C. Правильно!')
        break;
      case item.answers['D']:
        console.log('D. Правильно!')
        break;
      default:
        console.log('Неверный ответ')
    }
  })
}

compare()

//Написать алгоритм функции, который будет сверять ответы и выводить результат.