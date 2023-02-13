import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import fs from 'fs';
import * as T from 'fp-ts/Task';
import * as Json from 'fp-ts/Json';
import * as E from 'fp-ts/Either';
import { ZodError } from 'zod/lib/ZodError';
import { Abi } from '../types/abi';
import { parseJson } from './json';

export const readAbiFileToJson = (filePath: string) => pipe(
  TE.of(filePath),
  TE.chainW(TE.taskify(fs.readFile)),
  TE.mapLeft((x) => x),
  TE.map((buffer) => buffer.toString('utf8')),
  TE.chainW((str) => T.of(parseJson(str))),
);

export const parseAbi = (abiJson: Json.Json): E.Either<ZodError, Abi> => {
  const parseResult = Abi.safeParse(abiJson);

  return parseResult.success ? E.right(parseResult.data) : E.left(parseResult.error);
}

export const loadAbi = (filePath: string): TE.TaskEither<Error | ZodError | NodeJS.ErrnoException, Abi> => pipe(
  readAbiFileToJson(filePath),
  TE.chainW(abiJson => T.of(parseAbi(abiJson))),
);

export const loadAbiFiles = (abiPathA: string, abiPathB: string) => pipe(
  TE.Do,
  TE.bindW('abiA', () => loadAbi(abiPathA)),
  TE.bindW('abiB', () => loadAbi(abiPathB)),
);
