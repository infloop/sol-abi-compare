import { Inputs } from '../../types/input';
import { Outputs } from '../../types/output';

export const isSameInputs = (inputsA: Inputs, inputsB: Inputs): boolean => {
  if (inputsA.length !== inputsB.length) {
    return false;
  }

  return inputsA.every((inputA, i) => {
    const inputB = inputsB[i];
    return inputA.type === inputB.type;
  });
}

export const isSameOutputs = (outputsA: Outputs, outputsB: Outputs): boolean => {
  if (outputsA.length !== outputsB.length) {
    return false;
  }

  return outputsA.every((outputA, i) => {
    const outputB = outputsB[i];
    return outputA.type === outputB.type;
  });
}
