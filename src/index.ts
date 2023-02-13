import { Command } from 'commander';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { doTask } from './utils/task';
import { loadAbiFiles } from './utils/fs';
import { createStructuredAbi } from './utils/structured';
import { compareABIs } from './comparator';
import { formatError } from './utils/formatter';
import columnify from 'columnify';

const program = new Command();

program
    .name('solabi')
    .description('CLI')
    .version('0.8.0');

program.command('compare')
    .description('Compare two versions of JSON ABI files')
    .argument('<abiV1>', 'ABI V2 file path (current version)')
    .argument('<abiV2>', 'ABI V2 file path (next version)')
    .action(async (abiPathV1: string, abiPathV2: string, options: any) => {

      const res = await doTask(pipe(
        loadAbiFiles(abiPathV1, abiPathV2),
        TE.bindW('abiStructuredA', (x) => T.of(createStructuredAbi(x.abiA))),
        TE.bindW('abiStructuredB', (x) => T.of(createStructuredAbi(x.abiB))),
        TE.map(x => ({ abiA: x.abiStructuredA, abiB: x.abiStructuredB })),
        TE.bindW('errors',(x) => {
          return TE.of(compareABIs(x.abiA, x.abiB))
        }),
      ));

      console.log('=================== REPORT ====================');
      const formattedErrors = res.errors.map(error => formatError(error));

      const columns = columnify(formattedErrors, { preserveNewLines: true });

      console.log(columns);
    });

program.parse();
