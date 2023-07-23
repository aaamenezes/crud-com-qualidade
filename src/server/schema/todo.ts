import { z as schema } from 'zod';

export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  date: schema.string().transform(date => new Date(date).toISOString()),
  done: schema.string().transform(done => done === 'true')
});

export type Todo = schema.infer<typeof TodoSchema>;
