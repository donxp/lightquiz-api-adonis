'use strict'

class MultiLogger {

    constructor(Config, Logger) {
        this.Config = Config
        this.Logger = Logger
    }

    _log(type, msg, ...data) {
        for(let transport of this.Config.get('app.logger.multi')) {
            this.Logger.transport(transport)[type](msg, ...data)
        }
    }

    emerg(msg, ...data) {
        this._log('emerg', msg, ...data)
    }

    alert(msg, ...data) {
        this._log('alert', msg, ...data)
    }

    crit(msg, ...data) {
        this._log('crit', msg, ...data)
    }

    error(msg, ...data) {
        this._log('error', msg, ...data)
    }

    warning(msg, ...data) {
        this._log('warning', msg, ...data)
    }

    notice(msg, ...data) {
        this._log('notice', msg, ...data)
    }

    info(msg, ...data) {
        this._log('info', msg, ...data)
    }

    debug(msg, ...data) {
        this._log('debug', msg, ...data)
    }
}

module.exports = MultiLogger