import { Router } from "express";
import { schemaValidator } from "../middlewares";

const userRoutes = Router()

userRoutes.post('/register', schemaValidator)

export default userRoutes