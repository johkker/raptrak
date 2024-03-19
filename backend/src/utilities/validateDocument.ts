import { cnpj, cpf } from "cpf-cnpj-validator";

export function validateDocument(document: string): boolean {
  return cpf.isValid(document) || cnpj.isValid(document);
}
