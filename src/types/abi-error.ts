import * as z from 'zod';
import { Inputs } from './input';
import { AbiItemTypeError } from './type';

export const AbiError = z.object({
  type: AbiItemTypeError,
  name: z.string(),
  inputs: Inputs,
}, { description: 'Abi Error' }).strict();
export type AbiError = z.infer<typeof AbiError>;
