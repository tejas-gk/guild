import "../styles/globals.css";
import type { AppProps } from "next/app";
import CommandPallette from '@/components/CommendPallette/CommandPallette';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     {/* <script src="https://cdn.tailwindcss.com"></script> */}
     <CommandPallette
        projects={[
          { name: 'profile',
            url: 'user/profile',
          },
          { name: 'home',
            url: '',
          },
          { name: 'login',
            url: 'login',
          },
          { name: 'register',
            url:'register'
        },
        ]}
      />
  <Component {...pageProps} />
    </>
  );
}

export default MyApp;