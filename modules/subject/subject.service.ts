import { SubjectRepository } from "./subject.repository";

export class SubjectService {
    static async getAll() {
        return SubjectRepository.find();
    }
    static async getById(id: number) {
        const subject = await SubjectRepository.findOneBy({ id });  
        if (!subject) {
            throw new Error('Subject not found');
        }
        return subject;
    }
    static async create(data: { name: string; code: string }) {
        const subject = SubjectRepository.create(data);
        return SubjectRepository.save(subject);
    }
    static async delete(id: number) {
        const subject = await SubjectRepository.findOneBy({ id });  
        if (!subject) {
            throw new Error('Subject not found');
        }
        return SubjectRepository.remove(subject);
    }
}