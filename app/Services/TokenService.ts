import Token from 'App/Models/Token'

export default class TokenService {
  public async create (payload) {
    return Token.create({
      name: payload.name,
      user_id: payload.user_id,
      token: payload.token,
      type: 'api',
      expires_at: payload.token.expiresAt,
    });
  }

  public async getByUserId (userId, token) {
    return Token.query().where('user_id', userId).where('token', token).first()
  }
}
