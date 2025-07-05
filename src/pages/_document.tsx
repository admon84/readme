import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='description' content='admon84 developer repositories' />
        <meta
          name='keywords'
          content='admon84, developer, repositories, projects, github'
        />
        <meta name='author' content='admon84' />
        <meta name='robots' content='index, follow' />

        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />

        <meta name='theme-color' content='#00d4ff' />
        <meta name='msapplication-TileColor' content='#00d4ff' />

        <link
          rel='preload'
          href='/fonts/inter.woff2'
          as='font'
          type='font/woff2'
          crossOrigin=''
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
