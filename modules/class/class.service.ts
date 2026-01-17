import { ClassRepository } from "./class.repository";
import { ClassEntity } from "./class.entity";
import { StudentRepository } from "../student/student.repository";

export class ClassService {
    static async getAll() {
        return ClassRepository.find({
            relations: ['students'],
        });
    }
    static async getById(id: number) {
        const cls = await ClassRepository.findOne({
            where: { id },
            relations: ['students'],
        });
        if (!cls) {
            throw new Error('Class not found');
        }       
        return cls;
    }
    static async create(data: { name: string; year: number }) {
        const cls = new ClassEntity();
        cls.name = data.name;
        cls.year = data.year;
        return ClassRepository.save(cls);
    }               
    static async delete(id: number) {
        const cls = await ClassRepository.findOneBy({ id });                        
        if (!cls) {
            throw new Error('Class not found');
        }       
        const students = await StudentRepository.find({
            where: { class: { id } },
        });
        if (students.length > 0) {
            throw new Error('Cannot delete class with enrolled students');
        }       
        return ClassRepository.remove(cls);
    }
    
}