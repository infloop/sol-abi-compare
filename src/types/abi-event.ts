import * as z from 'zod';
import { InputsIndexed } from './input';
import { AbiItemTypeEvent } from './type';

export const AbiEvent = z.object({
  type: AbiItemTypeEvent,
  name: z.string(),
  inputs: InputsIndexed,
  anonymous: z.boolean(),
}, { description: 'Abi Event' }).strict();
export type AbiEvent = z.infer<typeof AbiEvent>;
