import * as z from 'zod';
import { Inputs } from './input';
import { Outputs } from './output';
import { AbiItemTypeReceive } from './type';
import { StateMutability, StateMutabilityPayable } from './state-mutability';

/**
 * This function cannot have arguments,
 * cannot return anything and must have external visibility and payable state mutability
 */
export const AbiReceive = z.object({
  type: AbiItemTypeReceive,
  name: z.string().optional(),
  // inputs: Inputs,
  // outputs: Outputs,
  stateMutability: StateMutabilityPayable,
}, { description: 'Abi Receive' }).strict();
export type AbiReceive = z.infer<typeof AbiReceive>;
