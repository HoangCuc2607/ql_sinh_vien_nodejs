import { ScoreService } from "./score.service";
import { Request, Response } from "express";
console.log('ScoreService =', ScoreService);
export class ScoreController {  
    static async getAll(req: Request, res: Response) {  
        try {
            const scores = await ScoreService.getAll(); 
            return res.json(scores);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const score = await ScoreService.getById(id);
            return res.json(score);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }           
    }

    static async create(req: Request, res: Response) {
        try {
            const score = await ScoreService.create(req.body);
            return res.status(201).json(score);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }       
    }           
    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await ScoreService.delete(id);
            return res.json(result);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }       
    }
}   