import { Request, Response } from 'express';
import createUserSVC from '../../services/users';

export const createUserCTRL = async (req: Request, res: Response) => {
  const data = req.newInput;
  const result = await createUserSVC(data);
  return res
    .status(201)
    .json({ message: 'Usuário criado com sucesso', user: result });
};
