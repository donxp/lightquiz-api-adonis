'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const uuidv4 = require('uuid').v4

class Quiz extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeCreate', quiz => {
            quiz.remove_id = uuidv4()
        })
    }

    questions() {
        return this.hasMany('App/Models/QuizQuestion')
    }
}

module.exports = Quiz
