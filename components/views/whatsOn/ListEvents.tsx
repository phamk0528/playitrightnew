import { Box, Heading, SimpleGrid, Divider } from '@chakra-ui/react';
import React from 'react';
import useColorTheme from '../../../hooks/useColorTheme';
import useWindowSize from '../../../hooks/useWindowSize';
import EventCard from '../../cards/EventCard';

type Props = {
    events: any;
    margin?: number;
    containerHeight?: number;
};

const ListEventsWhatsOn = ({ events }: Props) => {
    const colors = useColorTheme();
    const screenSize = useWindowSize();
    let height = events?.map((item: any) => {
        return item.title.length;
    });
    var largest = Math.max.apply(Math, height);

    return (
        <>
            <Box as="section" pt="4%" pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Heading
                    transition="ease-in 0.15s"
                    fontSize={{ base: '16px', md: '36px' }}
                    bottom="30px"
                    textAlign="center"
                    color={{ base: '#004C45', md: colors.primary }}
                    fontFamily="Arial"
                    fontWeight={700}
                >
                    Events
                </Heading>
                <Divider colorScheme="blackAlpha" display={{ base: 'flex', md: 'none' }} />

                <SimpleGrid
                    pt={3}
                    columns={
                        screenSize.width >= 950
                            ? 4
                            : screenSize.width <= 950 && screenSize.width >= 750
                            ? 3
                            : screenSize.width < 750 && screenSize.width >= 500
                            ? 2
                            : 2
                    }
                    spacing="5px"
                    height="max-content"
                >
                    {events?.map((event: any) => (
                        <Box pt={{ base: '5%', lg: '5%' }} key={'listEvent' + event.id}>
                            <EventCard
                                column
                                event={event}
                                idEvent={event.id}
                                titleFontSize={'1em'}
                                heightTitle={largest + 10 + 'px'}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default ListEventsWhatsOn;
