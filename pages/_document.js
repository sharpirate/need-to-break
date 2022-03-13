import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/favicon-16px.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32px.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-96px.png" sizes="96x96" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@500&display=swap" rel="stylesheet"></link>
        </Head>
        <body className="bg-primary-300 hide-scrollbar">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;