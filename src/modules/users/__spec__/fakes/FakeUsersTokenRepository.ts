import IUserTokensRepository from '../../repositories/IUserTokensRepository'
import UserToken from '../../infra/typeorm/entities/UserToken'
import { uuid } from 'uuidv4'
class FakeUserTokensRespository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.userTokens.find(userToken => userToken.token === token )
   }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.userTokens.push(userToken)

    return userToken
  }
}

export default FakeUserTokensRespository
