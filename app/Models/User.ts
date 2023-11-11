import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Address from 'App/Models/Address'
import Token from 'App/Models/Token'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  constructor(attributes?: Partial<User>) {
    super()

    if (attributes) {
      Object.assign(this, attributes)
    }

    this.id = randomUUID()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public lastLogin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Address)
  public address: HasOne<typeof Address>

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
