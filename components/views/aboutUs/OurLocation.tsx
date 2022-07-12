import React, { useRef, useEffect } from 'react';
import { Text, Divider, Box, Heading } from '@chakra-ui/react';
import SimpleMap from '../../googleMap/GoogleMap';
import useColorTheme from '../../../hooks/useColorTheme';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import useWindowSize from '../../../hooks/useWindowSize';
type Props = {
    google_api: any;
    lng: any;
    lat: any;
};

const OurLocation = ({ google_api, lat, lng }: Props) => {
    const colors = useColorTheme();
    const ref = useRef(null);
    useEffect(() => {
        console.log('width', ref.current ? ref.current?.offsetWidth : 0);
    }, [ref?.current]);
    const screenSize = useWindowSize();
    const html = `<div class="mapouter"><div  class="gmap_canvas"><iframe width="${ref?.current?.offsetWidth}" height="530" id="gmap_canvas" src="https://maps.google.com/maps?q=i12%20Katong&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org"></a><br><style>.mapouter{position:relative;text-align:right;height:530px;width:${ref?.current?.offsetWidth}px;}</style><a href="https://www.embedgooglemap.net">add google maps to wordpress</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:530px;width:"${ref.current?.offsetWidth}px";}</style></div></div>`;

    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '16px', md: '20px' }}
                    bottom="30px"
                    textAlign="center"
                    color="#004C45"
                    fontFamily="Arial"
                    mt="50px"
                    fontWeight={700}
                >
                    Our Location
                </Heading>
                <Divider colorScheme="gray" mb="30px" mt="20px" ref={ref} />
                <div>{ReactHtmlParser(html)}</div>;{/* <SimpleMap google_api={google_api} lat={lat} lng={lng} /> */}
            </Box>
        </>
    );
};

export default OurLocation;
