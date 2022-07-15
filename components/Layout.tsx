import React from 'react';
import Head from 'next/head';
import { Box, BoxProps } from '@chakra-ui/react';
import Navbar from './navbar';
import styles from '../constants/styles';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useColorTheme from '../hooks/useColorTheme';

type Props = {
    title?: string;
} & BoxProps;

const Layout: React.FC<Props> = ({ children, title = 'Modern News', ...props }) => {
    const colors = useColorTheme();

    return (
        <Box>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5XWJB6S7FB"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5XWJB6S7FB');
                    `,
          }}
        /> */}
            </Head>
            <Box style={{ fontFamily: 'Arial' }} color={colors.primary}>
                <header>
                    <Navbar />
                </header>

                <Box
                    as="main"
                    minH={'80vh'}
                    maxW={styles.mainMaxWidth}
                    style={{ paddingTop: '0px !important' }}
                    marginX="auto"
                    {...props}
                >
                    <ToastContainer autoClose={2000} />
                    {children}
                </Box>
                {/* <Footer /> */}
            </Box>
        </Box>
    );
};

export default Layout;
