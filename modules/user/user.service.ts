import { UserCache } from "../../cache/user.cache";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
console.log('UserRepo =', UserRepository);

export class UserService {

    static async getAll() {
        // 1. check cache
        const cached = await UserCache.getAll()
        if (cached) return cached
        
        // 2. query DB
        const users = await UserRepository.find()

        // 3. set cache
        await UserCache.setAll(users)

        return users
    }
    static async getById(id: number) {
        const user = await UserRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }   

     // Tạo user mới
    static async create(data: {
        username: string
        password: string
        role?: 'admin' | 'staff' | 'student'
    }): Promise<User> {
        const { username, password, role } = data

        // 1. Check trùng username
        const existedUser = await UserRepository.findOne({
        where: { username },
        })

        if (existedUser) {
        throw new Error('Username đã tồn tại')
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // 3. Tạo entity
        const user = UserRepository.create({
        username,
        password: hashedPassword,
        role: role ?? 'student',
        })

        const savedUser = await UserRepository.save(user)

        //clear cache sau khi ghi DB
        await UserCache.clearAll()

        return savedUser
    }
    static async delete(id: number) {
        const user = await UserRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }       
        return UserRepository.remove(user);
    }       
}
