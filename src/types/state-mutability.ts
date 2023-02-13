import * as z from 'zod';

export const StateMutabilityPure = z.literal('pure');
export const StateMutabilityView = z.literal('view');
export const StateMutabilityNonpayable = z.literal('nonpayable');
export const StateMutabilityPayable = z.literal('payable');

export const StateMutability = z.union([
  StateMutabilityPure,
  StateMutabilityView,
  StateMutabilityNonpayable,
  StateMutabilityPayable,
]);
