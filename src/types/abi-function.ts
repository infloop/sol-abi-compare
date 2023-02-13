import * as z from 'zod';
import { Inputs } from './input';
import { Outputs } from './output';
import { AbiItemTypeFunction } from './type';
import {
  StateMutability,
} from './state-mutability';

export const AbiFunction = z.object({
  type: AbiItemTypeFunction.optional().default('function'),
  name: z.string(),
  inputs: Inputs,
  outputs: Outputs,
  stateMutability: StateMutability,
  constant: z.boolean().optional(),
  payable: z.boolean().optional(),
}, { description: 'Abi Function' }).strict();
export type AbiFunction = z.infer<typeof AbiFunction>;

