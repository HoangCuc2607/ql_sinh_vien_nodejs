import {ScoreRepository} from "./score.repository";
console.log('ScoreRepository =', ScoreRepository);
export class ScoreService {
    static async getAll() {
        return ScoreRepository.find();
    }
    static async getById(id: number) {
        const score = await ScoreRepository.findOneBy({ id });
        if (!score) {
            throw new Error('Score not found');
        }   
        return score;
    }
    static async create(data: { studentId: number; subjectId: number; score: number }) {
        const score = ScoreRepository.create(data);
        return ScoreRepository.save(score);
    }
    static async delete(id: number) {
        const score = await ScoreRepository.findOneBy({ id });
        if (!score) {
            throw new Error('Score not found');
        }   
        return ScoreRepository.remove(score);
    }
}   