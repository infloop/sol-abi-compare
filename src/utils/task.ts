import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

export const doTask = async <E, A>(task: TE.TaskEither<E, A>): Promise<A> => {
  const either = await task();

  if (E.isLeft(either)) {
    throw either.left;
  }
  return either.right;
};
