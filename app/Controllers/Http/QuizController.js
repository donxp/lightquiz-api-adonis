'use strict'

const { validate } = use('Validator')
const Database = use('Database')
const MultiLogger = use('MultiLogger')

const Quiz = use('App/Models/Quiz')
const QuizQuestion = use('App/Models/QuizQuestion')
const QuizAnswer = use('App/Models/QuizAnswer')

class QuizController {
    async get({ params }) {
        const quiz = await Quiz.query().where('id', params.id).with('questions').with('questions.answers').first()
        if(quiz) {
            return {
                success: true,
                quiz
            }
        } else {
            return {
                success: false,
                error: 'not found'
            }
        }
    }

    async store({ request, auth }) {
        const rules = {
            'name': 'required|string|max:30',
            'questions': 'required|array|min:1',
            'questions.*.allow_multiple': 'required|boolean',
            'questions.*.name': 'required|string|max:30',
            'questions.*.answers': 'required|array|min:2'
        }

        const input = request.only(['name', 'questions'])

        const validation = await validate(input, rules)

        if(validation.fails()) {
            return {
                success: false,
                error: validation.messages()[0].message
            }
        }

        const trx = await Database.beginTransaction()
        const user = await auth.getUser()

        try {
            const quizModel = new Quiz()

            quizModel.name = input.name
            quizModel.created_by = user.id

            await quizModel.save()

            for(let question of input.questions) {
                const questionModel = new QuizQuestion()

                questionModel.allow_multiple_answers = question.allow_multiple
                questionModel.name = question.name
                questionModel.quiz_id = quizModel.id

                await questionModel.save()

                const grpAnswers = []
                for(let answer of question.answers) {
                    const answerModel = new QuizAnswer()
                    answerModel.name = answer
                    grpAnswers.push(answerModel)
                }

                await questionModel.answers().saveMany(grpAnswers)
            }

            await trx.commit()
            
            return {
                success: true,
                id: quizModel.id,
                remove_id: quizModel.remove_id
            }
        } catch (e) {
            await trx.rollback()

            MultiLogger.warning('Unable to create quiz', e)

            return {
                success: false,
                error: 'unable to create quiz'
            }
        }
    }
}

module.exports = QuizController

/*

{
    name: quiz name,
    questions: [
        {
            name: question name
            answers: [
                answer1,
                answer2
            ]
        }
    ]
}

*/