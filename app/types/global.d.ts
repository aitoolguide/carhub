import type { Connection } from 'mongoose';

declare global {
  // Augment NodeJS global type
  // so TypeScript knows we have a `mongoose` cache
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  } | undefined;
}

export {};
