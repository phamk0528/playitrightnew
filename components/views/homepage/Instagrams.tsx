import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

type Props = {
    facebookPageUrl: string;
};

const Instagrams = ({ facebookPageUrl }: Props) => {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);
    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Box
                    pt="4%"
                    h={{ base: '550px', lg: '600px' }}
                    mt={{ base: '40px', lg: '70px' }}
                    bgColor="#004C45"
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                >
                    {/* <Center> */}
                    <div
                        className="fb-page"
                        data-href={facebookPageUrl}
                        data-tabs="timeline"
                        data-width="380"
                        data-height=""
                        data-small-header="false"
                        data-adapt-container-width="false"
                        data-hide-cover="false"
                        data-show-facepile="true"
                    >
                        <blockquote cite={facebookPageUrl} className="fb-xfbml-parse-ignore">
                            <a href={facebookPageUrl} target="_top">
                                i12 Katong
                            </a>
                        </blockquote>
                    </div>
                    {/* 
          <FacebookProvider appId="21248437397159">
            <Page href={facebookPageUrl} tabs="timeline" />
          </FacebookProvider> */}
                    {/* </Center> */}

                    {/* <Heading
            transition="ease-in 0.15s"
            fontSize="2xl"
            bottom="30px"
            textAlign="center"
            color={colors.primary}
            fontFamily="Arial"
          >
            #bistrobites
          </Heading> */}

                    {/* <Slider {...settings}>
            {instagrams.data.data
              ? instagrams.data.data.map((data: any) => (
                  <Box pt="10%" key={"listEvent" + data.id}>
                    <InstagramCard
                      column
                      instagram={data.id}
                      titleFontSize={"1em"}
                      token={instagrams.token.access_token}
                    />
                  </Box>
                ))
              : null}
          </Slider> */}
                </Box>
            </Box>
        </>
    );
};

export default Instagrams;
