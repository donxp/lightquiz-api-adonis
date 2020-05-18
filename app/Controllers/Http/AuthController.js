'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class AuthController {
    async login({ request, auth }) {
        const rules = {
            email: 'string|required|email|max:30',
            password: 'string|required|min:6|max:30'
        }

        const input = request.only(['email', 'password'])

        const validation = await validate(input, rules)

        if(validation.fails()) {
            return {
                success: false,
                error: validation.messages()[0].message
            }
        }

        try {
            const jwt = await auth.attempt(input.email, input.password)
            return {
                success: true,
                token: jwt.token
            }
        } catch (e) {
            return {
                success: false,
                error: 'email or password is incorrect'
            }
        }
    }

    async register({ request }) {
        const rules = {
            email: 'string|required|unique:users,email|email|max:30',
            password: 'string|required|min:6|max:30'
        }

        const input = request.only(['email', 'password'])

        const validation = await validate(input, rules)

        if(validation.fails()) {
            return {
                success: false,
                message: validation.messages()[0].message
            }
        }

        try {
            const user = new User()
            user.email = input.email
            user.password = input.password
            await user.save()
            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                error: 'failed to create user'
            }
        }
    }
}

module.exports = AuthController
