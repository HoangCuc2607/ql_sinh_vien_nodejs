import { AppDataSource } from "../../config/database";
import { ClassEntity } from "./class.entity";

export const ClassRepository = AppDataSource.getRepository(ClassEntity);