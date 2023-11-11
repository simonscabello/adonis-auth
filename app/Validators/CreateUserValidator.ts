import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules } from '@adonisjs/validator/build/src/Rules'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(64),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(64),
    ]),
    address: schema.array().members(
      schema.object().members({
        street: schema.string({}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(64),
        ]),
        city: schema.string({}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(64),
        ]),
        state: schema.string({}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(64),
        ]),
        district: schema.string({}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(64),
        ]),
        number: schema.string({}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(64),
        ]),
        country: schema.string({}, [
          rules.required(),
          rules.minLength(2),
          rules.maxLength(64),
        ]),
      })
    ),
  })

  public messages: CustomMessages = {
    'name.required': 'Please enter your name.',
    'name.minLength': 'Your name must be at least 2 characters long.',
    'name.maxLength': 'Your name must be less than 64 characters long.',

    'email.required': 'Please enter your email address.',
    'email.email': 'Please enter a valid email address.',
    'email.unique': 'This email address is already in use.',

    'password.required': 'Please enter a password.',
    'password.minLength': 'Your password must be at least 8 characters long.',
    'password.maxLength': 'Your password must be less than 64 characters long.',

    'address.required': 'Please enter your address.',

    'street.required': 'Please enter your street.',
    'street.minLength': 'Your street must be at least 2 characters long.',
    'street.maxLength': 'Your street must be less than 64 characters long.',

    'city.required': 'Please enter your city.',
    'city.minLength': 'Your city must be at least 2 characters long.',
    'city.maxLength': 'Your city must be less than 64 characters long.',

    'state.required': 'Please enter your state.',
    'state.minLength': 'Your state must be at least 2 characters long.',
    'state.maxLength': 'Your state must be less than 64 characters long.',

    'district.required': 'Please enter your district.',
    'district.minLength': 'Your district must be at least 2 characters long.',
    'district.maxLength': 'Your district must be less than 64 characters long.',

    'number.required': 'Please enter your number.',
    'number.minLength': 'Your number must be at least 2 characters long.',
    'number.maxLength': 'Your number must be less than 64 characters long.',

    'country.required': 'Please enter your country.',
    'country.minLength': 'Your country must be at least 2 characters long.',
    'country.maxLength': 'Your country must be less than 64 characters long.',
  }
}
