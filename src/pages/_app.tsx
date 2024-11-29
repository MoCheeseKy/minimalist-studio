import React from 'react';
import type { ReactNode, ReactElement } from 'react';
import type { NextPage } from 'next';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// MUI

export type NextPageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
