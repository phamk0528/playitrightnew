import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';


export default class Document extends NextDocument {
    static getInitialProps(ctx: DocumentContext) {
        return NextDocument.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/static/favicon.ico" />

                </Head>
                <body>





                    <ColorModeScript initialColorMode="light" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
