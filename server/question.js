const question = exports

const storage = require('node-persist')

const competition = require('./competition')
const utils = require('./utils')

storage.init()

question.calculator = {
  normal: [
    {
      operators: '+',
      methods: (a, b) => a + b,
    },
    {
      operators: '-',
      methods: (a, b) => a - b,
    },
    {
      operators: '*',
      methods: (a, b) => a * b,
    },
    {
      operators: '/',
      methods: (a, b) => a / b,
    },
  ],
  hard: [
    {
      operators: '+',
      methods: (a) => {
        return a.reduce((acc, v) => {
          return +acc + +v
        })
      },
    },
  ],
}

question.generateQuestion = (level = 'normal') => {
  const newQuestion = question.generateRandomQuestion(level)
  const uniqueId = utils.generateUniqueId()

  return storage.setItem(uniqueId, newQuestion).then(() => {
    return {
      id: uniqueId,
      question: newQuestion,
    }
  })
}
/**
 * generate a random question from the calculator and return an object composed of left operator right
 * example 1 + 6
 * @param {String} level
 * @return {Object}
 */
question.generateRandomQuestion = (level) => {
  if (level === 'normal') {
    const randomNumber = utils.generateNumber(4)
    const operator = this.calculator[level][randomNumber].operators
    let left, right
    if (operator !== '/') {
      left = utils.generateNumber(9)
      right = utils.generateNumber(9)
    } else {
      right = utils.generateNumber(9)
      left = right * utils.generateNumber(9)
    }
    return {
      left: left,
      right: right,
      operation: operator,
    }
  } else {
    const numbers = []
    for (let i = 0; i < 5; i++) {
      numbers.push(utils.generateNumber(9))
    }
    return {
      left: numbers[0] + ' + ' + numbers[1] + ' + ' + numbers[2],
      right: numbers[3] + ' + ' + numbers[4],
      operation: '+',
    }
  }
}

question.verifyAnswer = (answerObj) => {
  return storage.getItem(answerObj.id).then((questionObj) => {
    const correctAnswer = question.getCorrectAnswer(questionObj, answerObj.level)

    const isCorrect = parseInt(answerObj.answer) === correctAnswer

    if (isCorrect) {
      competition.incrementCorrectAnswers()
    }

    return isCorrect ? 'correct' : 'incorrect'
  })
}

question.getCorrectAnswer = (questionObj, level = 'normal') => {
  let result

  this.calculator[level].forEach((item) => {
    if (item.operators === questionObj.operation && level === 'normal')
      result = item.methods(+(questionObj.left), +(questionObj.right))
    else if (level === 'hard')
      result = item.methods((questionObj.left + ' + ' + questionObj.right).split(' + '))
  })
  return result
}
