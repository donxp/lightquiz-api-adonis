'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizQuestionSchema extends Schema {
  up () {
    this.create('quiz_questions', (table) => {
      table.increments()

      table.string('name', 60).notNullable()
      table.integer('quiz_id').unsigned().references('id').inTable('quizzes')
      table.boolean('allow_multiple_answers').defaultTo(false)

      table.timestamps()
    })
  }

  down () {
    this.drop('quiz_questions')
  }
}

module.exports = QuizQuestionSchema
