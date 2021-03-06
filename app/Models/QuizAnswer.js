'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuizAnswer extends Model {
    question() {
        return this.belongsTo('App/Models/QuizQuestion', 'question_id', 'id')
    }

    static get visible() {
        return ['name']
    }
}

module.exports = QuizAnswer
