import { AppDataSource } from "../../config/database";
import {Score} from "./score.entity";
console.log('Score =', Score);
export const ScoreRepository = AppDataSource.getRepository(Score);