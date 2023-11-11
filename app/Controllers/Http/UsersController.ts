import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import TokenService from 'App/Services/TokenService'

export default class UsersController {
  protected userService: UserService
  protected tokenService: TokenService

  constructor() {
    this.userService = new UserService()
    this.tokenService = new TokenService()
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const payload = await this.userService.create(request)

    const token = await auth.use('api').generate(payload.user)

    const tokenPayload = {
      name: 'api',
      type: 'api',
      user_id: payload.user.id,
      token: token.token,
      expires_at: token.expiresAt,
    }

    await this.tokenService.create(tokenPayload)

    let user = {
      id: payload.user.id,
      created: payload.user.createdAt,
      modified: payload.user.updatedAt,
      last_login: payload.user.lastLogin,
      token: token.token,
    }

    return response.created(user)
  }

  public async show({ request, response }: HttpContextContract) {
    if (!request.headers().token) {
      return response.unauthorized()
    }

    const payload = await this.userService.show(request)

    if (!payload) {
      return response.unauthorized()
    }

    return response.ok(payload)
  }
}
