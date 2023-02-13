import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import {
  Abi,
  AbiStructured,
  isAbiConstructor,
  isAbiError,
  isAbiEvent,
  isAbiFallback,
  isAbiFunction, isAbiReceive
} from '../types/abi';
import { ZodError } from 'zod/lib/ZodError';
import { AbiConstructor } from '../types/abi-constructor';
import { pipe } from 'fp-ts/function';
import { AbiFallback } from '../types/abi-fallback';
import { AbiFunction } from '../types/abi-function';
import { AbiError } from '../types/abi-error';
import { AbiEvent } from '../types/abi-event';
import { AbiReceive } from '../types/abi-receive';

export const findAbiConstructors = (abi: Abi): AbiConstructor[] => pipe(
  abi,
  A.filter(isAbiConstructor),
);

export const findAbiFallback = (abi: Abi): AbiFallback[] => pipe(
  abi,
  A.filter(isAbiFallback),
);

export const findAbiReceive = (abi: Abi): AbiReceive[] => pipe(
  abi,
  A.filter(isAbiReceive),
);

export const findAbiFunctions = (abi: Abi): AbiFunction[] => pipe(
  abi,
  A.filter(isAbiFunction),
);

export const findAbiFunctionByName = (events: AbiFunction[], name: string): O.Option<AbiFunction> => pipe(
  events,
  A.findFirst((abiFunction) => abiFunction.name === name),
);

export const findAbiErrors = (abi: Abi): AbiError[] => pipe(
  abi,
  A.filter(isAbiError),
);

export const findAbiEvents = (abi: Abi): AbiEvent[] => pipe(
  abi,
  A.filter(isAbiEvent),
);

export const findAbiEventByName = (events: AbiEvent[], name: string): O.Option<AbiEvent> => pipe(
  events,
  A.findFirst((abiEvent) => abiEvent.name === name),
);

export const findAbiErrorByName = (events: AbiError[], name: string): O.Option<AbiError> => pipe(
  events,
  A.findFirst((abiError) => abiError.name === name),
);

export const createStructuredAbi = (abi: Abi): E.Either<ZodError, AbiStructured> => {
  const res = AbiStructured.safeParse({
    constructor: findAbiConstructors(abi),
    fallback: findAbiFallback(abi),
    receive: findAbiReceive(abi),
    functions: findAbiFunctions(abi),
    errors: findAbiErrors(abi),
    events: findAbiEvents(abi),
  });

  return res.success ? E.right(res.data) : E.left(res.error);
}
