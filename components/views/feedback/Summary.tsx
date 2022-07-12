import React, { useEffect, useRef, useState } from 'react';
import {
    chakra,
    Box,
    Flex,
    Checkbox,
    useColorModeValue,
    SimpleGrid,
    GridItem,
    Link,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Select,
    HStack,
    Icon,
    Button,
    VisuallyHidden,
    CircularProgress,
    Textarea,
    color,
    Center,
} from '@chakra-ui/react';

import { groupedOptions, groupedOptionsFeedback, URL_BASE } from '../../../constants';
import Markdown from 'markdown-to-jsx';
import Image from '../../Image';
import useColorTheme from '../../../hooks/useColorTheme';
import { AiFillCheckCircle } from 'react-icons/ai';
import ReCAPTCHA from 'react-google-recaptcha';
import { getCategories, FileToBase64, resizeFile } from '../../../helpers/commonFuction';
import { useFormik } from 'formik';
import { uploadImage, useContact } from '../../../helpers/contact';
import { toast } from 'react-toastify';
import Creatable from 'react-select/creatable';
import { useRouter } from 'next/router';
import Compressor from 'compressorjs';
import * as Yup from 'yup';
import { FileUploader } from 'react-drag-drop-files';
import Fade from 'react-reveal/Fade';
import { checkOrder, webCreateOrderCase } from '../../../serviceGraphQL/orders';
import dayjs from 'dayjs';
type Props = {
    content?: any;
};



const Summary = ({ content }: Props) => {
    const colors = useColorTheme();
    const recaptchaRef = useRef('');
    const categoriesOfMessage = getCategories(content.categories_of_message);
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);
    const [isVerify, setIsVerify] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isError, setIsError] = useState(false);
    const [subject, setSubject] = useState('');
    const [orderRef, setOrderRef] = useState('');
    const [isRetrieve, setIsRetrieve] = useState(false);
    const [isInvaild, setIsInvaild] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').max(50),
        description: Yup.string().required('Comment is required').max(1000),
        contact_number: Yup.string()
            .required('Phone number is required')
            .max(8)
            .matches(/^[0-9]{8}$/u, 'Phone number consists of 8 numbers'),
    });


    const handleChangeFileDrag = async (e: any) => {
        setIsError(false);
        setIsLoading(true);
        // let file = await resizeFile(e.target.files[0]);
        // setFile(file);
        new Compressor(e, {
            quality: 0.7,
            maxHeight: 800,
            maxWidth: 800,
            // 0.6 can also be used, but its not recommended to go below.
            success: async (compressedResult) => {
                // compressedResult has the compressed file.
                // Use the compressed file to upload the images to your server.

                let base64 = await FileToBase64(compressedResult);
                setImageUrl(`${base64}`);
                setIsLoading(false);
            },
        });
    };

    const onReCAPTCHAChange = (captchaCode: string) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        // Else reCAPTCHA was executed successfully so proceed with the
        // alert
        setIsVerify(true);
    };
    const router = useRouter();
    const checkOrderVaild = async () => {
        let result = await checkOrder(orderRef.trim())
        if (result?.checkOrder) {

            setIsRetrieve(true)

        } {
            setIsInvaild(true)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            type_enquiry: '',
            contact_number: '',
            file_upload_url: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (isVerify) {
                if (isConfirm) {
                    if (
                        values.name !== '' ||
                        values.type_enquiry !== '' ||
                        values.contact_number !== '' ||
                        values.description !== '' ||
                        subject !== ''
                    ) {
                        let params = {
                            name: values.name,
                            phone: values.contact_number,
                            orderRef: orderRef,
                            subject: subject,
                            comments: values.description,
                            photos: [imageUrl.replace('data:image/jpeg;base64,', '')],
                        };
                        console.log('TESTT', params);
                        setIsSubmit(true);
                        let result = await webCreateOrderCase(params);
                        if (result?.webCreateOrderCase?.id) {
                            setIsSuccess(true)
                        }
                        setIsSubmit(false);

                    } else {
                        subject === '' ? toast.warning('Please select type of Enquiry!') : toast.warning('Please enter information!');
                    }
                } else {
                    toast.warning('Please agree!');
                }
            } else {
                toast.warning('Please verify with reCaptcha!');
            }
        },
    });
    const handleChange = (newValue: any) => {
        setSubject(newValue?.label);
    };

    const fileTypes = ['JPG', 'JPEG', 'PNG'];
    const handleOtherFeedback = () => {
        router.push(`/contactUs`)
    }
    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }} alignItems="center">
                <Fade bottom>
                    <Text
                        transition="ease-in 0.15s"
                        fontSize={{ base: '16px', lg: '20px' }}
                        bottom="30px"
                        textAlign="left"
                        color={colors.primary}
                        mt={{ base: '25px', lg: '50px' }}
                        mb={{ base: '5px', lg: '10px' }}
                        fontFamily="Arial;"
                        w="100%"
                    >

                        {` If you are still at Bistro Bytes and require assistance for your order, please submit the following form and we will look into it as soon as possible. `}

                    </Text>
                    <Text
                        transition="ease-in 0.15s"
                        fontSize={{ base: '16px', lg: '20px' }}
                        bottom="30px"
                        textAlign="left"
                        color={colors.primary}
                        mt={{ base: '5px', lg: '10px' }}
                        mb={{ base: '25px', lg: '50px' }}
                        fontFamily="Arial;"
                        w="100%"
                    >


                        {`
                        For all other feedback, you may submit it through the KLIK app (under Help Centre) or write in to `}

                        {
                            <span

                                style={{
                                    color: colors.primary,
                                    fontStyle: 'oblique',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                            >
                                {`feedback@bistrobytes.com`}
                            </span>
                        }

                        {` and we will respond within 2 working days. `}

                    </Text>
                </Fade>

                <Box pl={{ base: '0px', lg: '40px' }} pt="10px" width={"100%"}>
                    <Box alignItems="center" width={"100%"}>
                        {
                            isSuccess ?

                                <Box display="flex" alignItems="center" flexDir={"column"} width={"100%"} justifyContent={"center"}>

                                    <Icon
                                        color={"#2d9b44"}
                                        as={AiFillCheckCircle}

                                        boxSize={{ base: '200px', lg: '200px' }}
                                    />


                                    <Text
                                        transition="ease-in 0.15s"
                                        fontSize={{ base: '16px', lg: '20px' }}
                                        bottom="30px"
                                        textAlign="center"
                                        color={colors.primary}
                                        mt={{ base: '25px', lg: '50px' }}
                                        mb={{ base: '25px', lg: '50px' }}
                                        fontFamily="Arial;"
                                    >
                                        Thank you for feedback. We have notified the Customer Service Team to look into your feedback and they will contact you via SMS or phone call as soon as possible.
                                    </Text></Box>

                                : isRetrieve ? <chakra.form method="POST" overflow={{ sm: 'hidden' }} onSubmit={formik.handleSubmit} width={"100%"}>
                                    <Stack spacing={5} pl={{ base: '0px', lg: '0px' }} width={"100%"} >
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                        alignItems={"left"}
                                                    >
                                                        Order Date*
                                                    </FormLabel>
                                                    <FormLabel
                                                        fontSize="md"
                                                        fontWeight="md"
                                                        color={colors.primary}

                                                        alignItems={"left"}
                                                    >
                                                        {dayjs().format('DD-MM-YYYY')}
                                                    </FormLabel>


                                                </FormControl>
                                            </Box>
                                        </Fade>

                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                        alignItems={"left"}
                                                    >
                                                        Bistro Bytes Order Ref No*
                                                    </FormLabel>
                                                    <FormLabel
                                                        fontSize="md"
                                                        fontWeight="md"
                                                        color={colors.primary}

                                                        alignItems={"left"}
                                                    >
                                                        {orderRef}
                                                    </FormLabel>


                                                </FormControl>
                                            </Box>
                                        </Fade>
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                        alignItems={"left"}
                                                    >
                                                        Name*
                                                    </FormLabel>

                                                    <Input
                                                        onChange={formik.handleChange}
                                                        value={formik.values.name}
                                                        type="text"
                                                        placeholder=""

                                                        id="name"
                                                        focusBorderColor="brand.400"

                                                        isInvalid={formik.errors.name ? true : false}
                                                        errorBorderColor="crimson"
                                                    />
                                                    {formik.errors.name ? (
                                                        <Text color="red">{formik.errors.name}</Text>
                                                    ) : null}
                                                </FormControl>
                                            </Box>
                                        </Fade>

                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                    >
                                                        Contact Number*
                                                    </FormLabel>

                                                    <Input
                                                        name="contact_number"
                                                        id="contact_number"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.contact_number}
                                                        type="tel"
                                                        placeholder=""
                                                        focusBorderColor="brand.400"
                                                        w="100%"
                                                        isInvalid={formik.errors.contact_number ? true : false}
                                                        errorBorderColor="crimson"
                                                    />
                                                    {formik.errors.contact_number ? (
                                                        <Text color="red">{formik.errors.contact_number}</Text>
                                                    ) : null}
                                                </FormControl>
                                            </Box>
                                        </Fade>

                                        {/* <Fade bottom> */}
                                        <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                            <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue('gray.700', 'gray.50')}
                                                >
                                                    Type of Enquiry*
                                                </FormLabel>
                                                {/* <Select
                        id="type_enquiry"
                        name="type_enquiry"
                        autoComplete="Type Of Enquiry"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        rounded="md"
                        onChange={formik.handleChange}
                        value={formik.values.type_enquiry}
                      >
                        {categoriesOfMessage.map((category: any) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Select> */}
                                                <Creatable
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    name="color"
                                                    options={groupedOptionsFeedback}
                                                    onChange={handleChange}
                                                />
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue('gray.700', 'gray.50')}
                                                    flexDirection="row"
                                                    display={"flex"}
                                                    mt="10px"
                                                >
                                                    <Text>For other feedback, please</Text>    <Text color={colors.primary} fontStyle="oblique" ml="4px" cursor="pointer" textDecoration={"underline"} onClick={() => handleOtherFeedback()}>click here*.</Text>
                                                </FormLabel>
                                            </FormControl>
                                        </Box>
                                        {/* </Fade> */}
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                    >
                                                        Upload attachments
                                                    </FormLabel>
                                                    {imageUrl !== '' ? (
                                                        <Box>
                                                            <Image
                                                                resize="contain"
                                                                src={
                                                                    imageUrl ===
                                                                        'https://bcxcommerce.s3.ap-southeast-1.amazonaws.com/foodtohave/'
                                                                        ? '/placeholder.jpg'
                                                                        : imageUrl
                                                                }
                                                                alt="Segun Adebayo"
                                                                fallbackSrc="/placeholder.jpg"
                                                            />
                                                        </Box>
                                                    ) : (
                                                        <>
                                                            <FileUploader
                                                                handleChange={handleChangeFileDrag}
                                                                name="file"
                                                                types={fileTypes}
                                                                hoverTitle={` `}
                                                                onTypeError={(err: any) => setIsError(true)}
                                                            >
                                                                <Flex
                                                                    cursor="pointer"
                                                                    mt={1}
                                                                    justify="center"
                                                                    px={6}
                                                                    pt={5}
                                                                    pb={6}
                                                                    borderWidth={2}
                                                                    borderColor={useColorModeValue('gray.300', 'gray.500')}
                                                                    borderStyle="dashed"
                                                                    rounded="md"
                                                                >
                                                                    {isLoading ? (
                                                                        <CircularProgress
                                                                            isIndeterminate
                                                                            color="green.300"
                                                                        />
                                                                    ) : (
                                                                        <Stack spacing={1} textAlign="center">
                                                                            {isError ? (
                                                                                <Text color="red">
                                                                                    File type is not supported: file should
                                                                                    be JPG, JPEG, PNG
                                                                                </Text>
                                                                            ) : (
                                                                                <>
                                                                                    <Icon
                                                                                        mx="auto"
                                                                                        boxSize={12}
                                                                                        color={useColorModeValue(
                                                                                            'gray.400',
                                                                                            'gray.500',
                                                                                        )}
                                                                                        stroke="currentColor"
                                                                                        fill="none"
                                                                                        viewBox="0 0 48 48"
                                                                                        aria-hidden="true"
                                                                                    >
                                                                                        <path
                                                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                                            strokeWidth="2"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                    </Icon>

                                                                                    <Flex
                                                                                        fontSize="sm"
                                                                                        color={useColorModeValue(
                                                                                            'gray.600',
                                                                                            'gray.400',
                                                                                        )}
                                                                                        alignItems="baseline"
                                                                                    >
                                                                                        <chakra.label
                                                                                            cursor="pointer"
                                                                                            rounded="md"
                                                                                            fontSize="md"
                                                                                            color={useColorModeValue(
                                                                                                'brand.600',
                                                                                                'brand.200',
                                                                                            )}
                                                                                            pos="relative"
                                                                                            _hover={{
                                                                                                color: useColorModeValue(
                                                                                                    'brand.400',
                                                                                                    'brand.300',
                                                                                                ),
                                                                                            }}
                                                                                        >
                                                                                            <span>Upload a file</span>
                                                                                            {/* <VisuallyHidden>
                                                                                <input
                                                                                    id="file-upload"
                                                                                    name="file-upload"
                                                                                    type="file"
                                                                                    onChange={(e) =>
                                                                                        handleChangeFile(e)
                                                                                    }
                                                                                />
                                                                            </VisuallyHidden> */}
                                                                                        </chakra.label>
                                                                                        <Text pl={1}>or drag and drop</Text>
                                                                                    </Flex>
                                                                                    <Text
                                                                                        fontSize="xs"
                                                                                        color={useColorModeValue(
                                                                                            'gray.500',
                                                                                            'gray.50',
                                                                                        )}
                                                                                    >
                                                                                        Only .JPG and .PNG files, 4MB max file size.
                                                                                    </Text>
                                                                                </>
                                                                            )}
                                                                        </Stack>
                                                                    )}
                                                                </Flex>
                                                            </FileUploader>

                                                        </>
                                                    )}
                                                </FormControl>
                                            </Box>
                                        </Fade>
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                    >
                                                        Comment*
                                                    </FormLabel>

                                                    <Textarea
                                                        name="description"
                                                        id="description"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.description}
                                                        placeholder=""
                                                        focusBorderColor="brand.400"
                                                        w="100%"
                                                        isInvalid={formik.errors.description ? true : false}
                                                        errorBorderColor="crimson"
                                                    />
                                                    {formik.errors.description ? (
                                                        <Text color="red" mt={"5px"}>{formik.errors.description}</Text>
                                                    ) : null}
                                                </FormControl>
                                            </Box>
                                        </Fade>
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <Flex alignItems="start">
                                                        <Flex alignItems="center" h={5}>
                                                            <Checkbox
                                                                colorScheme="green"
                                                                onChange={() => {
                                                                    setIsConfirm(!isConfirm);
                                                                }}
                                                                name="isComfirm"
                                                            ></Checkbox>
                                                        </Flex>
                                                        <Box ml={3} fontSize="sm">
                                                            <Box color={'gray.500'}>
                                                                I agree to the{' '}
                                                                {
                                                                    <span
                                                                        onClick={() =>
                                                                            window.open(
                                                                                'https://www.keppelland.com/sg/en/data-protection-statement.html',
                                                                                '_blank',
                                                                            )
                                                                        }
                                                                        style={{
                                                                            color: colors.primary,
                                                                            fontStyle: 'oblique',
                                                                            textDecoration: 'underline',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                    >
                                                                        Data Protection Statement
                                                                    </span>
                                                                }
                                                                . This statement contains important information on the types
                                                                of data collected and how they may be used, including for
                                                                purposes of data analytics.
                                                            </Box>
                                                        </Box>
                                                    </Flex>
                                                </FormControl>
                                            </Box>
                                        </Fade>
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <ReCAPTCHA
                                                    ref={recaptchaRef}
                                                    sitekey={content.reCaptcha_site_key}
                                                    onChange={onReCAPTCHAChange}
                                                />
                                            </Box>
                                        </Fade>

                                        <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                            <Button
                                                w="150px"
                                                type="submit"
                                                borderRadius={20}
                                                bgColor={colors.primary}
                                                color="white"
                                                variant="solid"
                                                isLoading={isSubmit}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Stack>
                                </chakra.form> :


                                    <Stack spacing={5} pl={{ base: '0px', lg: '0px' }} width={"100%"} >
                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                        alignItems={"left"}
                                                    >
                                                        Order Date*
                                                    </FormLabel>
                                                    <FormLabel
                                                        fontSize="md"
                                                        fontWeight="md"
                                                        color={colors.primary}

                                                        alignItems={"left"}
                                                    >
                                                        {dayjs().format('DD-MM-YYYY')}
                                                    </FormLabel>

                                                </FormControl>
                                            </Box>
                                        </Fade>

                                        <Fade bottom>
                                            <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                                <FormControl flexDirection={"column"} width={{ base: '100%', md: '40%' }} alignItems={"center"}>
                                                    <FormLabel
                                                        fontSize="sm"
                                                        fontWeight="md"
                                                        color={useColorModeValue('gray.700', 'gray.50')}
                                                        alignItems={"left"}
                                                    >
                                                        Bistro Bytes Order Ref No*
                                                    </FormLabel>

                                                    <Input
                                                        onChange={(e) => { setOrderRef(e?.target.value) }}
                                                        value={orderRef}
                                                        type="text"
                                                        placeholder="eg. BB00015"
                                                        id="date"
                                                        focusBorderColor="brand.400"
                                                        isInvalid={isInvaild ? true : false}
                                                        errorBorderColor='crimson'
                                                    /> {isInvaild ? (
                                                        <Text color="red" mt="5px">Invaild Order Ref No</Text>
                                                    ) : null}
                                                </FormControl>
                                            </Box>
                                        </Fade>

                                        <Box display="flex" flexDir={"row"} justifyContent="center" alignItems={"center"} width="100%">
                                            <Button
                                                w="150px"
                                                borderRadius={20}
                                                bgColor={colors.primary}
                                                color="white"
                                                variant="solid"
                                                onClick={() => checkOrderVaild()}
                                            >
                                                Retrieve
                                            </Button>
                                        </Box>
                                    </Stack>
                        }
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export default Summary;
