import * as yup from "yup";
import bcrypt from "bcrypt";
import { validateDocument } from "../../utilities";
import { UserTypes } from "../../enums";
import { addYears } from "date-fns";

const fourteenYearsAgo = addYears(new Date(), -14);
const seventeenYearsAgo = addYears(new Date(), -17);

const CreateUserSchema = yup.object().shape({
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
    .max(fourteenYearsAgo),
  types: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          UserTypes.VENUE_ADMIN,
          UserTypes.COMMON_USER,
          UserTypes.RAPPER,
          UserTypes.VENUE_ADMIN,
        ])
    ),
});

export default CreateUserSchema;
