'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizAnswerSchema extends Schema {
  up () {
    this.create('quiz_answers', (table) => {
      table.increments()

      table.string('name', 50).notNullable()
      table.integer('question_id').unsigned().references('id').inTable('quiz_questions')

      table.timestamps()
    })
  }

  down () {
    this.drop('quiz_answers')
  }
}

module.exports = QuizAnswerSchema
