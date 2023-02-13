import chalk from 'chalk';
import { CompareError, Errors } from '../comparator/types';
import { Input, Inputs } from '../types/input';
import { Output, Outputs } from '../types/output';


const formatInput = (input: Input): string => {
  return '{ type' + ': ' + chalk.yellow(input.type) + ' name: ' + (input.name ? chalk.magenta(input.name) : chalk.grey('<none>')) + ' }';
}

const formatOutput = (output: Output): string => {
  return '{ type' + ': ' + chalk.yellow(output.type) + ' name: ' + (output.name ? chalk.magenta(output.name) : chalk.grey('<none>')) + ' }';
}

const formatInputs = (inputs: Inputs): string[] => inputs.map(formatInput);
const formatOutputs = (outputs: Outputs): string[] => outputs.map(formatOutput);


export type FormattedError = {
  type: string;
  name: string;
  errType: string;
  tagV1: string;
  resV1: string;
  arrow: string;
  tagV2: string
  resV2: string
}


export const formatError = (compareError: CompareError): FormattedError => {

  const formattedError: FormattedError = {
    type: chalk.green(compareError.type) + ' ' + (compareError.stateMutability ?  chalk.grey('<' + (compareError.stateMutability) + '>') : ''),
    name: chalk.blue(compareError.name),
    errType: '',
    tagV1: 'V1',
    resV1: '',
    arrow: ' -> ',
    tagV2: 'V2',
    resV2: '',
  };

  switch (compareError.error.tag) {
    case Errors.EventWithNameNotFoundTag:
    case Errors.FunctionWithNameNotFoundTag:
    case Errors.ErrorWithNameNotFoundTag:
      formattedError.errType = chalk.gray('<Presence>');
      formattedError.resV1 = chalk.green('exists');
      formattedError.resV2 = chalk.red('not exists');
      return formattedError;

    case Errors.DifferentStateMutabilityTag:
      formattedError.errType = chalk.gray('<StateMutability>');
      formattedError.resV1 = chalk.green(compareError.error.stateMutabilityA);
      formattedError.resV2 = chalk.red(compareError.error.stateMutabilityB);
      return formattedError;

    case Errors.DifferentInputsTag:
      formattedError.errType = chalk.gray('<Inputs>');
      formattedError.resV1 = formatInputs(compareError.error.inputsA).join('\n');
      formattedError.resV2 = formatInputs(compareError.error.inputsB).join('\n');
      return formattedError;

    case Errors.DifferentOutputsTag:
      formattedError.errType = chalk.gray('<Inputs>');
      formattedError.resV1 = formatOutputs(compareError.error.outputsA).join('\n');
      formattedError.resV2 = formatOutputs(compareError.error.outputsB).join('\n');
      return formattedError;
  }

  return formattedError;
}
