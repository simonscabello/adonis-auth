import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import TokenService from 'App/Services/TokenService'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  protected userService: UserService
  protected tokenService: TokenService

  constructor() {
    this.userService = new UserService()
    this.tokenService = new TokenService()
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    if(!email || !password) {
      return response.status(400).json({ message: 'Usuário e/ou senha inválidos' })
    }

    let user = await this.userService.findByEmail(email)
    if (!user || !user.user) {
      return response.status(404).json({ message: 'Usuário e/ou senha inválidos' })
    }

    const passwordValid = await Hash.verify(user.password, password)
    if (!passwordValid) {
      return response.status(404).json({ message: 'Usuário e/ou senha inválidos' })
    }

    const token = await auth.use('api').attempt(email, password)

    await this.tokenService.create(token)

    return response.ok(user.user)
  }
}
