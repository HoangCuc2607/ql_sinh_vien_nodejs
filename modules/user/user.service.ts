import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
console.log('UserRepo =', UserRepository);

export class UserService {

    static async getAll() {
        return UserRepository.find();
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

        // 4. Lưu DB
        return await UserRepository.save(user)
    }
    static async delete(id: number) {
        const user = await UserRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }       
        return UserRepository.remove(user);
    }       
}
