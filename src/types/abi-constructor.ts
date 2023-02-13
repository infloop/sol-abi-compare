import * as z from 'zod';
import { Inputs } from './input';
import { AbiItemTypeConstructor } from './type';
import { StateMutability } from './state-mutability';

/**
 *  Constructor function have no outputs.
 *  Usually has no name, but sometime can have a name, which does not mean anything
 */
export const AbiConstructor = z.object({
  type: AbiItemTypeConstructor,
  name: z.string().optional(),
  inputs: Inputs,
  // outputs: Outputs,
  payable: z.literal(false).optional(),
  stateMutability: StateMutability,
}, { description: 'Abi Constructor' }).strict();
export type AbiConstructor = z.infer<typeof AbiConstructor>;
