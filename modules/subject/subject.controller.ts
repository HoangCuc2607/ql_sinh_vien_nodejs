import { SubjectService } from "./subject.service";
import { Request, Response } from "express";
export class SubjectController {
    static async getAll(req: Request, res: Response) {
        try {
            const subjects = await SubjectService.getAll();
            return res.json(subjects);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const subject = await SubjectService.getById(id);
            return res.json(subject);
        }
        catch (err: any) {
            return res.status(404).json({ message: err.message });
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const subject = await SubjectService.create(req.body);
            return res.status(201).json(subject);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await SubjectService.delete(id);
            return res.json(result);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }
    }   
}