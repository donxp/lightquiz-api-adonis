'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('auth/login', 'AuthController.login')
    Route.post('auth/register', 'AuthController.register')
    Route.get('auth/check', 'AuthController.check')

    Route.get('quiz/:id', 'QuizController.get').middleware('auth')
    Route.post('quiz', 'QuizController.store').middleware('auth')
})