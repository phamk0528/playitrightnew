import React from 'react';
import { Link, Box } from '@chakra-ui/react';
import { URL_BASE } from '../../../constants';
import Markdown from 'markdown-to-jsx';
import Image from '../../Image';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import parse from 'html-react-parser';
type Props = {
    text?: any;
};

const MyParagraph = ({ children, ...props }: any) => {
    return <Link {...props}>{children}</Link>;
};

const MyIMG = ({ children, ...props }: any) => {
    return (
        <Box>
            <Image data-aos="fade-left" src={props.src}>
                {children}
            </Image>
        </Box>
    );
};

const TermsOfUse = ({ text }: Props) => {
    const urlImageMarkdown = () => {
        return text?.split('/uploads/').join(`${URL_BASE}/uploads/`);
    };
    const html = `text`;
    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                {/* {text && (
                    <Markdown
                        options={{
                            overrides: {
                                ...ChakraUIRenderer(),
                                a: {
                                    component: MyParagraph,
                                    props: {
                                        color: 'blue',
                                    },
                                },
                                img: {
                                    component: MyIMG,
                                },
                            },
                        }}
                    >
                        {urlImageMarkdown()}
                    </Markdown>
                )} */}
                {parse(urlImageMarkdown())}
            </Box>
        </>
    );
};

// const TermsOfUse = ({ text }: Props) => {
//     const urlImageMarkdown = () => {
//         return text?.split('/uploads/').join(`${URL_BASE}/uploads/`);
//     };
//     const html = `text`;
//     function createMarkup() {
//         return { __html: text?.split('/uploads/').join(`${URL_BASE}/uploads/`) };
//     }

//     return (
//         <>
//             <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
//                 {/* {text && (
//                     urlImageMarkdown()
//                 )} */}
//                 <div dangerouslySetInnerHTML={createMarkup()} />;
//             </Box>
//         </>
//     );
// };

export default TermsOfUse;
