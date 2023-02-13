import * as z from 'zod';

export const Input = z.object({
  name: z.string(),
  type: z.string(),
  components: z.union([z.undefined(), z.string()]),
});
export type Input = z.infer<typeof Input>;

export const Inputs = z.array(Input);
export type Inputs = z.infer<typeof Inputs>;

export const InputIndexed = z.object({
  name: z.string(),
  type: z.string(),
  components: z.union([z.undefined(), z.string()]),
  indexed: z.boolean(),
});

export const InputsIndexed = z.array(InputIndexed);
export type InputsIndexed = z.infer<typeof InputsIndexed>;
