'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizSchema extends Schema {
  up () {
    this.create('quizzes', (table) => {
      table.increments()
      
      table.string('name', 50).notNullable()
      table.integer('created_by').unsigned().references('id').inTable('users')

      table.timestamps()
    })
  }

  down () {
    this.drop('quizzes')
  }
}

module.exports = QuizSchema
