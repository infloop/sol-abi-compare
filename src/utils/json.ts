import {flow} from 'fp-ts/function';
import * as Json from 'fp-ts/Json';
import * as E from 'fp-ts/Either';

export const parseJson = flow(
  Json.parse,
  E.mapLeft(x => new Error(`JSON parse error ${x}`)),
);
