import { CompareError, Errors } from '../types';
import { AbiItemWithStateMutability, isAbiFallback } from '../../types/abi';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { AbiEvent } from '../../types/abi-event';
import { AbiConstructor } from '../../types/abi-constructor';
import { AbiFunction } from '../../types/abi-function';
import { isSameInputs, isSameOutputs } from './utils';

export const hasSameStateMutability =
  (abiItemA: AbiItemWithStateMutability, abiItemB: O.Option<AbiItemWithStateMutability>): E.Either<CompareError, true> =>
  O.isNone(abiItemB)
    ? E.right(true)
    : abiItemA.stateMutability === abiItemB.value.stateMutability
      ? E.right(true)
      : E.left({
          type: abiItemA.type,
          name: isAbiFallback(abiItemA) ? undefined : abiItemA.name,
          error: {
            tag: Errors.DifferentStateMutabilityTag,
            stateMutabilityA: abiItemA.stateMutability,
            stateMutabilityB: abiItemB.value.stateMutability,
          }
        });

export const hasSameInputs =
  (abiItemA: AbiConstructor | AbiFunction, abiItemB: O.Option<AbiConstructor | AbiFunction>): E.Either<CompareError, true> =>
    O.isNone(abiItemB)
      ? E.right(true)
      : isSameInputs(abiItemA.inputs ,abiItemB.value.inputs)
        ? E.right(true)
        : E.left({
          type: abiItemA.type,
          name: isAbiFallback(abiItemA) ? undefined : abiItemA.name,
          error: {
            tag: Errors.DifferentInputsTag,
            inputsA: abiItemA.inputs,
            inputsB: abiItemB.value.inputs,
          }
        });

export const functionHasSameOutputs =
  (abiItemA: AbiFunction, abiItemB: O.Option<AbiFunction>): E.Either<CompareError, true> =>
    O.isNone(abiItemB)
      ? E.right(true)
      : isSameOutputs(abiItemA.outputs ,abiItemB.value.outputs)
        ? E.right(true)
        : E.left({
          type: abiItemA.type,
          name: isAbiFallback(abiItemA) ? undefined : abiItemA.name,
          error: {
            tag: Errors.DifferentOutputsTag,
            outputsA: abiItemA.outputs,
            outputsB: abiItemB.value.outputs,
          }
        });

export const hasFunctionWithSameName = (abiItemA: AbiFunction, abiItemB: O.Option<AbiFunction>): E.Either<CompareError, true> =>
  O.isNone(abiItemB)
    ? E.left({
      type: abiItemA.type,
      name: abiItemA.name,
      error: {
        tag: Errors.FunctionWithNameNotFoundTag,
      }
    })
    : abiItemA.name === abiItemB.value.name
      ? E.right(true)
      : E.left({
        type: abiItemA.type,
        name: abiItemA.name,
        error: {
          tag: Errors.FunctionWithNameNotFoundTag,
        }
      });

export const hasEventWithSameName = (abiItemA: AbiEvent, abiItemB: O.Option<AbiEvent>): E.Either<CompareError, true> =>
  O.isNone(abiItemB)
    ? E.left({
      type: abiItemA.type,
      name: abiItemA.name,
      error: {
        tag: Errors.EventWithNameNotFoundTag,
      }
    })
    : abiItemA.name === abiItemB.value.name
      ? E.right(true)
      : E.left({
        type: abiItemA.type,
        name: abiItemA.name,
        error: {
          tag: Errors.EventWithNameNotFoundTag,
        }
      });
