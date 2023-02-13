import * as z from 'zod';
import { AbiFunction } from './abi-function';
import { AbiEvent } from './abi-event';
import { AbiError } from './abi-error';
import { AbiConstructor } from './abi-constructor';
import { AbiFallback } from './abi-fallback';
import { AbiReceive } from './abi-receive';

export const AbiItem = z.union([
  AbiFunction,
  AbiConstructor,
  AbiReceive,
  AbiFallback,
  AbiEvent,
  AbiError,
]);
export type AbiItem = z.infer<typeof AbiItem>;

export const Abi = z.array(AbiItem);
export type Abi = z.infer<typeof Abi>;

export const AbiStructured = z.object({
  constructor: z.array(AbiConstructor).max(1).transform(x => x.pop()),
  fallback:  z.array(AbiFallback).max(1).transform(x => x.pop()),
  receive: z.array(AbiReceive).max(1).transform(x => x.pop()),
  functions: z.array(AbiFunction),
  errors: z.array(AbiError),
  events: z.array(AbiEvent),
}).strict();
export type AbiStructured = z.infer<typeof AbiStructured>;

export type AbiItemWithStateMutability = AbiConstructor | AbiFunction | AbiFallback | AbiReceive;

export const isAbiConstructor = (abiItem: AbiItem): abiItem is AbiConstructor => abiItem.type === 'constructor';
export const isAbiFunction = (abiItem: AbiItem): abiItem is AbiFunction => abiItem.type === 'function';
export const isAbiFallback = (abiItem: AbiItem): abiItem is AbiFallback => abiItem.type === 'fallback';
export const isAbiReceive = (abiItem: AbiItem): abiItem is AbiReceive => abiItem.type === 'receive';

export const isAbiError = (abiItem: AbiItem): abiItem is AbiError => abiItem.type === 'error';
export const isAbiEvent = (abiItem: AbiItem): abiItem is AbiEvent => abiItem.type === 'event';
