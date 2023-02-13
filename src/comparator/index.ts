import { AbiStructured } from '../types/abi';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import {
  functionHasSameOutputs, hasErrorWithSameName,
  hasEventWithSameName,
  hasFunctionWithSameName,
  hasSameInputs,
  hasSameStateMutability
} from './constraints';
import { findAbiErrorByName, findAbiEventByName, findAbiFunctionByName } from '../utils/structured';
import { CompareError } from './types';

export const compareABIs = (abiA: AbiStructured, abiB: AbiStructured): CompareError[] => {

  const constraints = [
    hasSameStateMutability(abiA.constructor, O.fromNullable(abiB.constructor)),
    hasSameInputs(abiA.constructor, O.fromNullable(abiB.constructor)),
  ];

  abiA.receive ? constraints.push(hasSameStateMutability(abiA.receive, O.fromNullable(abiB.receive))) : null;

  abiA.fallback ? constraints.push(hasSameStateMutability(abiA.fallback, O.fromNullable(abiB.fallback))) : null;

  constraints.push(...abiA.functions.map(
    abiAFunction => hasFunctionWithSameName(abiAFunction, findAbiFunctionByName(abiB.functions, abiAFunction.name))
  ));

  constraints.push(...abiA.functions.map(
    abiAFunction => hasSameInputs(abiAFunction, findAbiFunctionByName(abiB.functions, abiAFunction.name))
  ));

  constraints.push(...abiA.functions.map(
    abiAFunction => functionHasSameOutputs(abiAFunction, findAbiFunctionByName(abiB.functions, abiAFunction.name))
  ));

  constraints.push(...abiA.events.map(
    abiAEvent => hasEventWithSameName(abiAEvent, findAbiEventByName(abiB.events, abiAEvent.name))
  ));

  constraints.push(...abiA.errors.map(
    abiAEvent => hasErrorWithSameName(abiAEvent, findAbiErrorByName(abiB.errors, abiAEvent.name))
  ));

  const isNotNull = <T>(x: T | null): x is T => {
    return x !== null;
  }

  const errors = pipe(
    constraints,
    A.map(constraint => E.isLeft(constraint) ? constraint.left : null),
    A.filter(isNotNull),
  )

  return errors;
}
