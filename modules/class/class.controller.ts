import { Request, Response } from "express";
import { ClassService } from "./class.service";

export class ClassController {
    static async getAll(req: Request, res: Response) {  
        try {
            const classes = await ClassService.getAll();
            return res.json(classes);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }       
    }   

    static async getById(req: Request, res: Response) {  
        try {
            const id = Number(req.params.id);
            const cls = await ClassService.getById(id);
            return res.json(cls);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }   
    }   
    static async create(req: Request, res: Response) {
        try {
            const cls = await ClassService.create(req.body);
            return res.status(201).json(cls);
        }   catch (err: any) {  

            return res.status(400).json({ message: err.message });
        }       
    }
    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await ClassService.delete(id);
            return res.json(result);
        }   catch (err: any) {  
            return res.status(404).json({ message: err.message });
        }
    }


}