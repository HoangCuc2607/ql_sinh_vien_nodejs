import { UserService } from "./user.service";
import { Request, Response } from "express";
console.log('UserService =', UserService);
export class UserController {
    
    static async getAll(req: Request, res: Response) {  
        try {
            const users = await UserService.getAll();
            return res.json(users);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await UserService.getById(id);
            return res.json(user);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }           
    }       

    static async create(req: Request, res: Response) {
        try {
            const user = await UserService.create(req.body);

            return res.status(201).json(user);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await UserService.delete(id);
            return res.json(result);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }   
    }

}