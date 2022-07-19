import React from 'react';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';

//import theme from './styles/theme';

interface Props {
    cookies: string;
}

export const Chakra: React.FC<Props> = ({ children }) => {
    const colorModeManager = localStorageManager;
    return (
        <ChakraProvider resetCSS={true} colorModeManager={colorModeManager}>
            {children}
        </ChakraProvider>
    );
};


