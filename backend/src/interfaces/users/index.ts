import { UserTypes } from "../../enums";

interface IUserRegister {
  name: string;
  email: string;
  password: string;
  document: string;
  birthdate: Date;
  types: UserTypes[];
}

export { IUserRegister };
