import React from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { NextPage } from 'next';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv"
dotenv.config()
// MUI

export type NextPageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Ensure the global object is extended to store the Prisma client
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Use the existing Prisma client if it exists, or create a new one
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  // Store the Prisma client in globalThis to reuse in development
  globalThis.prismaGlobal = prisma;
}