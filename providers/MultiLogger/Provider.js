'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class MultiLoggerProvider extends ServiceProvider {

  register () {
    this.app.singleton('MultiLogger', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Logger = this.app.use('Adonis/Src/Logger')
      const MultiLogger = require('.')
      return new MultiLogger(Config, Logger)
    })
  }
}

module.exports = MultiLoggerProvider
