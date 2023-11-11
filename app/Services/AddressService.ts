import Address from 'App/Models/Address'

export default class AddressService {
  public async create(payload, userId) {
    for (const key in payload) {
      payload[key].user_id = userId
      await Address.create(payload[key])
    }
    return
  }

  public async getByUserId(userId) {
    return Address.query().where('user_id', userId)
  }
}
