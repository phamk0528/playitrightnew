import React, { useState } from 'react';
import { chakra, Box, Flex, useColorModeValue, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import Card from './Card';
import Image from 'next/image'


type Props = {
    product: any;
    heightTitle: string;
};

type ColorProps = {
    colors: any;
};
const ColorCard = ({ colors }: ColorProps) => {
    return (
        <Box spacing="10px">
            {colors.length !== 0 ? (
                <>
                    <Box alignItems="center" justifyContent="space-between" bg="white" roundedBottom="lg" px={1} py={2}>
                        <chakra.h1 color="gray.800" fontSize="xs">
                            {`AVAILABLE COLORS`}
                        </chakra.h1>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between" px={1} bg="white" roundedBottom="lg">
                        <HStack spacing="10px">
                            {colors.map((color: string) => (
                                <Box w="25px" key={color} h="25px" borderRadius={30} bg={color} borderColor='black' borderWidth={'1px'} />
                            ))}
                        </HStack>
                    </Flex>
                </>
            ) : null}
        </Box>
    );
};

const ProductCard = ({ product, heightTitle }: Props) => {
    const [hover, setHover] = useState(false);
    const urlImage: any = product?.photos?.photo_set ? Object?.values(product?.photos?.photo_set) : Object?.values(product?.photos)
    const onClick = () => {
        window.open(process.env.NEXT_PUBLIC_BASE_URL_SALES_PRODUCT + `/products/${product?.id}`, '_blank');
    };

    const colorsArray = _.values(product?.photos?.photo_set)?.map(x => x?.code)
    const colors = [...new Set(colorsArray)];



    return (
        <Card

            justifyContent="flex-start"
            cursor="pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ transform: `scale(${hover ? 1.1 : 1})` }}
            transition="ease-in 0.2s"
            overflow="hidden"
            display="flex"
            boxShadow="sm"
            flexDirection={'column'}
            borderWidth='1px'
        // color={colors.primary}
        >
            <Box
                h={{ base: '100%', lg: '100%' }}
                w="100%"
                bg={useColorModeValue('white', 'gray.800')}
                shadow="lg"
                p={2}
            >



                <Box display={{ base: 'none', lg: 'flex' }} width="100%">
                    <Image
                        width="300px"
                        height={"300px"}

                        src={urlImage[0].photos[0].replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=380&quality=80' ?? '/placeholder.png'}
                        alt={'Photo of '}
                        objectFit="cover"

                    />
                </Box>
                <Box display={{ base: 'flex', lg: 'none' }} width="100%"
                    height={"100px"} position='relative'>
                    <Image
                        width="100%"
                        height={"100px"}
                        src={urlImage[0].photos[0].replace('https://playitright.s3-ap-southeast-1.amazonaws.com/', 'https://quocbcx-1c878.kxcdn.com/') + '?width=300&quality=80' ?? '/placeholder.png'}
                        layout='fill'
                        alt={'Photo of '}
                        objectFit="contain"

                        priority={true}
                    />
                </Box>
                <Box py={2} h={heightTitle}>
                    <Text
                        color={useColorModeValue('black', 'white')}

                        fontSize="12px"
                        fontWeight="bold"
                        textTransform="uppercase"
                        pt={1}
                    >
                        {product.name}
                    </Text>
                </Box>
                <Box pt={0}>

                    <ColorCard colors={colors} />
                    <Box px={1} py={2}>
                        <chakra.h4
                            color={useColorModeValue('black', 'white')}
                            fontWeight="bold"
                            fontSize="12px"
                            textTransform="uppercase"
                        >
                            {`₱ ${product.price}`}
                        </chakra.h4>
                    </Box>


                </Box>
            </Box>
        </Card>
    );
};

export default ProductCard;
