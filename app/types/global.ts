// src/types/global.ts

import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Connection } from 'mongoose';

// Define a type for pages with a custom layout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Global type augmentation for Mongoose connection caching
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
