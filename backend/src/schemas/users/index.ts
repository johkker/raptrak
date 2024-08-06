import * as yup from "yup";
import bcrypt from "bcrypt";
import { validateDocument } from "../../utilities";
import { UserTypes } from "../../enums";
import { addYears } from "date-fns";

const fourteenYearsAgo = addYears(new Date(), -14);

const CreateUserSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório")
    .transform((value, originalValue) => originalValue.toLowerCase()),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .transform((value, originalValue) => bcrypt.hashSync(originalValue, 10)),
  document: yup
    .string()
    .required("Documento é obrigatório")
    .test("validate-document", "Documento inválido", (value) => {
      return validateDocument(value);
    }),
  birthdate: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .min(new Date(1900, 0, 1), "Data de nascimento inválida")
    .max(fourteenYearsAgo, "Usuário deve ter pelo menos 14 anos"),
  types: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(
          [
            UserTypes.VENUE_ADMIN,
            UserTypes.COMMON_USER,
            UserTypes.RAPPER,
            UserTypes.BEATMAKER,
            UserTypes.HOST
          ],
          "Tipo de usuário inválido"
        )
    )
    .required("Pelo menos um tipo de usuário é necessário"),
});

export default CreateUserSchema;
