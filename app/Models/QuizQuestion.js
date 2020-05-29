'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuizQuestion extends Model {
    answers() {
        return this.hasMany('App/Models/QuizAnswer', 'id', 'question_id')
    }

    quiz() {
        return this.belongsTo('App/Models/Quiz', 'quiz_id', 'id')
    }

    static get visible() {
        return ['allow_multiple_answers', 'name']
    }
}

module.exports = QuizQuestion
