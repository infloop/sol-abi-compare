import * as z from 'zod';
import { AbiItemTypeFallback } from './type';
import { StateMutability, StateMutabilityPayable } from './state-mutability';

// Constructor and fallback function never have name or outputs.
// Fallback function doesn't have inputs either.
export const AbiFallback = z.object({
  type: AbiItemTypeFallback,
  // name: z.string(),
  // inputs: Inputs,
  // outputs: Outputs,
  payable: z.literal(true).optional().default(true),
  constant: z.literal(false).optional().default(false),
  stateMutability: StateMutabilityPayable, // Fallback function should be marked as payable
}, { description: 'Abi Fallback' }).strict();
export type AbiFallback = z.infer<typeof AbiFallback>;
