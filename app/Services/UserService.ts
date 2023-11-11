import Database from '@ioc:Adonis/Lucid/Database'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'
import AddressService from 'App/Services/AddressService'
import * as console from 'console'
import TokenService from 'App/Services/TokenService'

export default class UserService {
  protected addressService: AddressService
  protected tokenService: TokenService

  constructor() {
    this.addressService = new AddressService()
    this.tokenService = new TokenService()
  }

  public async create(request) {
    try {
      const trx = await Database.beginGlobalTransaction();

      const userPayload = await request.validate(CreateUserValidator);
      const user = await User.create(userPayload, trx);

      let addressPayload = request.input('address');

      const address = await this.addressService.create(addressPayload, user.id, trx);

      await trx.commit();

      return { user };
    } catch (error) {
      await Database.rollbackGlobalTransaction();
      throw error;
    }
  }

  public async show(request) {
    const user = await User.find(request.params().id);

    const address = await this.addressService.getByUserId(user.id);

    let tokenFromHeader = request.headers().token

    const token = await this.tokenService.getByUserId(user.id, tokenFromHeader);

    if (!token) {
      return null;
    }

    return {
      name: user.name,
      email: user.email,
      address: address.map((address) => {
        return {
          street: address.street,
          number: address.number,
          district: address.district,
          city: address.city,
          state: address.state,
          country: address.country,
        };
      }),
    };
  }

  public async findByEmail(email) {
    const user = await User.findBy('email', email)

    if (!user) {
      return null
    }

    const address = await this.addressService.getByUserId(user.id);

    return {
      user: {
        name: user.name,
        email: user.email,
        address: address.map((address) => {
          return {
            street: address.street,
            number: address.number,
            district: address.district,
            city: address.city,
            state: address.state,
            country: address.country,
          };
        }),
      },
      password: user.password
    };
  }

  public async updateLastLogin(userId) {
    const user = await User.find(userId)
    user.lastLogin = new Date()
    return user.save()
  }
}
