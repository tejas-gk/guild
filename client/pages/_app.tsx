import "../styles/globals.css";
import type { AppProps } from "next/app";
import CommandPallette from '@/components/CommendPallette/CommandPallette';
import {useContext,useState} from 'react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     <CommandPallette
        projects={[
          { name: 'profile',
            url: 'user/1',
          },
          { name: 'home',
            url: '',
          },
          { name: 'testpages',
            url: 'testpage/test',
          },
        ]}
      />

  <Component {...pageProps} />
    </>
  );
}

export default MyApp;