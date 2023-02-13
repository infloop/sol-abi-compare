import * as z from 'zod';
import { Inputs } from '../../types/input';
import { Outputs } from '../../types/output';
import { StateMutability } from '../../types/state-mutability';

export enum Errors {
  FunctionWithNameNotFoundTag = 'FunctionWithNameNotFoundTag',
  EventWithNameNotFoundTag = 'EventWithNameNotFoundTag',
  ErrorWithNameNotFoundTag = 'ErrorWithNameNotFoundTag',
  DifferentInputsTag = 'DifferentInputsTag',
  DifferentOutputsTag = 'DifferentOutputsTag',
  DifferentStateMutabilityTag = 'DifferentStateMutabilityTag',
}

export const FunctionWithNameNotFoundTag = z.literal(Errors.FunctionWithNameNotFoundTag);
export const EventWithNameNotFoundTag = z.literal(Errors.EventWithNameNotFoundTag);
export const ErrorWithNameNotFoundTag = z.literal(Errors.ErrorWithNameNotFoundTag);
export const DifferentInputsTag = z.literal(Errors.DifferentInputsTag);
export const DifferentOutputsTag = z.literal(Errors.DifferentOutputsTag);
export const DifferentStateMutabilityTag = z.literal(Errors.DifferentStateMutabilityTag);

export const FunctionWithNameNotFound = z.object({
  tag: FunctionWithNameNotFoundTag,
});

export const EventWithNameNotFound = z.object({
  tag: EventWithNameNotFoundTag,
});

export const ErrorWithNameNotFound = z.object({
  tag: ErrorWithNameNotFoundTag,
});

export const DifferentInputs = z.object({
  tag: DifferentInputsTag,
  inputsA: Inputs,
  inputsB: Inputs,
});

export const DifferentOutputs = z.object({
  tag: DifferentOutputsTag,
  outputsA: Outputs,
  outputsB: Outputs,
});

export const DifferentStateMutability = z.object({
  tag: DifferentStateMutabilityTag,
  stateMutabilityA: StateMutability,
  stateMutabilityB: StateMutability,
});

export const CompareError = z.object({
  type: z.string(),
  name: z.string().optional(),
  stateMutability: z.string().optional(),
  error: z.union([
    FunctionWithNameNotFound,
    EventWithNameNotFound,
    ErrorWithNameNotFound,
    DifferentStateMutability,
    DifferentInputs,
    DifferentOutputs
  ]),
});
export type CompareError = z.infer<typeof CompareError>;
