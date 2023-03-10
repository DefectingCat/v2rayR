import type { AppProps } from 'next/app';
import 'styles/global.css';
import { ThemeProvider } from 'next-themes';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
