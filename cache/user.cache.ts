// src/cache/user.cache.ts
import redis  from '../config/redis'
import { User } from '../modules/user/user.entity'

const USER_ALL_KEY = 'users:all'
const USER_ID_KEY = (id: number) => `users:${id}`
const TTL = 60*3

export class UserCache {

  static async getAll(): Promise<User[] | null> {
    const data = await redis.get(USER_ALL_KEY)
    return data ? JSON.parse(data) : null
  }

  static async setAll(users: User[]) {
    await redis.set(USER_ALL_KEY, JSON.stringify(users), 'EX', TTL)
  }

  static async clearAll() {
    await redis.del(USER_ALL_KEY)
  }

  static async getById(id: number): Promise<User | null> {
    const data = await redis.get(USER_ID_KEY(id))
    return data ? JSON.parse(data) : null
  }

  static async setById(id: number, user: User) {
    await redis.set(USER_ID_KEY(id), JSON.stringify(user), 'EX', TTL)
  }

  static async clearById(id: number) {
    await redis.del(USER_ID_KEY(id))
  }
}
