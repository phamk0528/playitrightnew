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
                    <div id="fb-root"></div>
                    <script
                        async
                        defer
                        src="https://connect.facebook.net/en_GB/all.js#xfbml=1&version=v12.0&appId=253664926562060&autoLogAppEvents=1"
                        nonce="awtmqUmg"
                    ></script>

                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TSCGW1Y7RZ" />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-TSCGW1Y7RZ');
`,
                        }}
                    />
                    <ColorModeScript initialColorMode="light" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
