import * as z from 'zod';

export const OutputName = z.union([z.undefined(), z.string()]);

export const Output = z.object({
  name: OutputName,
  type: z.string(),
  components: z.union([z.undefined(), z.string()]),
});
export type Output = z.infer<typeof Output>;

export const Outputs = z.array(Output);
export type Outputs = z.infer<typeof Outputs>;
