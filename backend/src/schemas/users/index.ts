import * as yup from "yup";
import bcrypt from "bcrypt";
import { validateDocument } from "../../utilities";
// create a validation schema using yup, for my User entity
const UserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required("Email é obrigatório")
    .transform((value, originalValue) => originalValue.toLowerCase()),
  password: yup
    .string()
    .required("Senha é obrigatório")
    .min(8, "Password must be at least 8 characters")
    .transform((value, originalValue) => bcrypt.hashSync(originalValue, 10)),
  document: yup
    .string()
    .required()
    .test("validate-document", "Documento inválido", (value) => {
      return validateDocument(value);
    }),
  birthdate: yup
    .date()
    .required()
    .min(new Date(1900, 1, 1))
    .max(new Date(2003, 1, 1)),
});

export default UserSchema;
