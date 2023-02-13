import * as z from 'zod';

export const AbiItemTypeFunction = z.literal('function');
export const AbiItemTypeConstructor = z.literal('constructor');
export const AbiItemTypeReceive = z.literal('receive');
export const AbiItemTypeFallback = z.literal('fallback');
export const AbiItemTypeError = z.literal('error');
export const AbiItemTypeEvent = z.literal('event');
