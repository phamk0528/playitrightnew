import React, { useRef, useState } from 'react';
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
} from '@chakra-ui/react';

import { groupedOptions, URL_BASE } from '../../../constants';
import Markdown from 'markdown-to-jsx';
import Image from '../../Image';
import useColorTheme from '../../../hooks/useColorTheme';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
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
type Props = {
    content?: any;
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
    const urlImageMarkdown = (text: string) => {
        return text.split('/uploads/').join(`${URL_BASE}/uploads/`);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').max(50),
        contact_number: Yup.string()
            .required('Phone number is required')
            .max(8)
            .matches(/^[0-9]{8}$/u, 'Phone number consists of 8 numbers'),
        email: Yup.string().email('Email is not in the correct format').required('Email is required'),
    });
    const handleChangeFile = async (e: any) => {
        setIsLoading(true);
        // let file = await resizeFile(e.target.files[0]);
        // setFile(file);
        new Compressor(e.target.files[0], {
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

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
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
                        values.email !== '' ||
                        values.type_enquiry !== '' ||
                        values.contact_number !== '' ||
                        values.description !== ''
                    ) {
                        let params = {
                            name: values.name,
                            email: values.email,
                            mobile: values.contact_number,
                            category: getCategoryOption(subject),
                            subject: subject,
                            description: values.description,
                            priority: 'Medium',
                            origin: 'i12 Katong Website',
                            inPremises: 'false',
                            status: 'New',
                            photo: imageUrl.replace('data:image/jpeg;base64,', ''),
                        };
                        console.log('TESTT', params);
                        setIsSubmit(true);
                        let result = await useContact(params);
                        setIsSubmit(false);
                        router.push(`/`);
                    } else {
                        toast.warning('Please enter information!');
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

    const getCategoryOption = (sub: string) => {
        // let result = groupedOptions.map(group=>{
        //   let data =  group.options.filter(item=>item.label === sub )
        //   if(data)
        // })
        for (let index = 0; index < groupedOptions.length; index++) {
            const element = groupedOptions[index].options.filter((item) => item.label === sub);
            if (element.length > 0) {
                return groupedOptions[index].label;
                break;
            }
        }
    };

    const fileTypes = ['JPG', 'JPEG'];

    return (
        <>
            <Box pl={{ base: '0px', lg: '60px' }} pr={{ base: '0px', lg: '60px' }}>
                <Fade bottom>
                    <Markdown
                        options={{
                            overrides: {
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
                        {urlImageMarkdown(content.summary)}
                    </Markdown>
                </Fade>
                <Box pl={{ base: '0px', lg: '40px' }} pt={{ base: '30px', lg: '70px' }}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
                        <Fade bottom>
                            <Stack spacing="60px">
                                <Box>
                                    <HStack spacing="10px">
                                        <Icon
                                            color={colors.primary}
                                            as={FaMapMarkerAlt}
                                            boxSize={{ base: '1.5rem', lg: '2rem' }}
                                        />
                                        <Text
                                            transition="ease-in 0.15s"
                                            fontSize={{ base: '15px', lg: '18px' }}
                                            fontWeight="bold"
                                            bottom="30px"
                                            textAlign="center"
                                            color={colors.primary}
                                            mt={{ base: '25px', lg: '50px' }}
                                            mb={{ base: '25px', lg: '50px' }}
                                        >
                                            Mall Address
                                        </Text>
                                    </HStack>
                                    <Box mt={5}>
                                        <Markdown
                                            options={{
                                                overrides: {
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
                                            {urlImageMarkdown(content.mall_address)}
                                        </Markdown>
                                    </Box>
                                </Box>
                                <Box>
                                    <HStack spacing="10px">
                                        <Icon
                                            color={colors.primary}
                                            as={FaPhoneAlt}
                                            boxSize={{ base: '1.5rem', lg: '2rem' }}
                                        />
                                        <Text
                                            transition="ease-in 0.15s"
                                            fontSize={{ base: '15px', lg: '18px' }}
                                            fontWeight="bold"
                                            bottom="30px"
                                            textAlign="center"
                                            color={colors.primary}
                                            mt={{ base: '25px', lg: '50px' }}
                                            mb={{ base: '25px', lg: '50px' }}
                                        >
                                            Mall Customer Service Phone Number
                                        </Text>
                                    </HStack>
                                    <Box mt={5}>
                                        <Markdown
                                            options={{
                                                overrides: {
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
                                            {urlImageMarkdown(content.phone_customer_service)}
                                        </Markdown>
                                    </Box>
                                </Box>
                                <Box>
                                    <HStack spacing="10px">
                                        <Icon
                                            color={colors.primary}
                                            as={FaClock}
                                            boxSize={{ base: '1.5rem', lg: '2rem' }}
                                        />
                                        <Text
                                            transition="ease-in 0.15s"
                                            fontSize={{ base: '15px', lg: '18px' }}
                                            fontWeight="bold"
                                            bottom="30px"
                                            textAlign="center"
                                            color={colors.primary}
                                            mt={{ base: '25px', lg: '50px' }}
                                            mb={{ base: '25px', lg: '50px' }}
                                        >
                                            Customer Service Counter Operating Hours
                                        </Text>
                                    </HStack>
                                    <Box mt={5}>
                                        <Markdown
                                            options={{
                                                overrides: {
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
                                            {urlImageMarkdown(content.counter_operating_hours)}
                                        </Markdown>
                                    </Box>
                                </Box>
                            </Stack>
                        </Fade>
                        <Box>
                            <chakra.form method="POST" overflow={{ sm: 'hidden' }} onSubmit={formik.handleSubmit}>
                                <Stack spacing={10} pl={{ base: '0px', lg: '60px' }}>
                                    <Fade bottom>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue('gray.700', 'gray.50')}
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
                                                    w="100%"
                                                    isInvalid={formik.errors.name ? true : false}
                                                    errorBorderColor="crimson"
                                                />
                                                {formik.errors.name ? (
                                                    <Text color="red">{formik.errors.name}</Text>
                                                ) : null}
                                            </FormControl>
                                        </SimpleGrid>
                                    </Fade>
                                    <Fade bottom>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue('gray.700', 'gray.50')}
                                                >
                                                    Email Address*
                                                </FormLabel>

                                                <Input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    placeholder=""
                                                    focusBorderColor="brand.400"
                                                    w="100%"
                                                    isInvalid={formik.errors.email ? true : false}
                                                    errorBorderColor="crimson"
                                                />
                                                {formik.errors.email ? (
                                                    <Text color="red">{formik.errors.email}</Text>
                                                ) : null}
                                            </FormControl>
                                        </SimpleGrid>
                                    </Fade>
                                    <Fade bottom>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
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
                                        </SimpleGrid>
                                    </Fade>
                                    <Fade bottom>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
                                                <FormLabel
                                                    fontSize="sm"
                                                    fontWeight="md"
                                                    color={useColorModeValue('gray.700', 'gray.50')}
                                                >
                                                    Description*
                                                </FormLabel>

                                                <Textarea
                                                    name="description"
                                                    id="description"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.description}
                                                    placeholder=""
                                                    focusBorderColor="brand.400"
                                                    w="100%"
                                                />
                                            </FormControl>
                                        </SimpleGrid>
                                    </Fade>
                                    {/* <Fade bottom> */}
                                    <SimpleGrid columns={3} spacing={6}>
                                        <FormControl as={GridItem} colSpan={[3, 2]}>
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
                                                options={groupedOptions}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </SimpleGrid>
                                    {/* </Fade> */}
                                    <Fade bottom>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
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
                                                                                be JPG
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
                                                                                    JPG up to 4MB
                                                                                </Text>
                                                                            </>
                                                                        )}
                                                                    </Stack>
                                                                )}
                                                            </Flex>
                                                        </FileUploader>
                                                        {/* <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile}
                                                        onChange={(e) => handleChangeFile(e)}
                                                        style={{ display: 'none' }}
                                                    />

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
                                                        onClick={onButtonClick}
                                                    >
                                                        {isLoading ? (
                                                            <CircularProgress isIndeterminate color="green.300" />
                                                        ) : (
                                                            <Stack spacing={1} textAlign="center">
                                                                <Icon
                                                                    mx="auto"
                                                                    boxSize={12}
                                                                    color={useColorModeValue('gray.400', 'gray.500')}
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
                                                                    color={useColorModeValue('gray.600', 'gray.400')}
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
                                                                        <VisuallyHidden>
                                                                            <input
                                                                                id="file-upload"
                                                                                name="file-upload"
                                                                                type="file"
                                                                                onChange={(e) => handleChangeFile(e)}
                                                                            />
                                                                        </VisuallyHidden>
                                                                    </chakra.label>
                                                                    <Text pl={1}>or drag and drop</Text>
                                                                </Flex>
                                                                <Text
                                                                    fontSize="xs"
                                                                    color={useColorModeValue('gray.500', 'gray.50')}
                                                                >
                                                                    JPG, up to 4MB
                                                                </Text>
                                                            </Stack>
                                                        )}
                                                    </Flex> */}
                                                    </>
                                                )}
                                            </FormControl>
                                        </SimpleGrid>
                                    </Fade>
                                    <Fade bottom>
                                        <SimpleGrid columns={3} spacing={6}>
                                            <FormControl as={GridItem} colSpan={[3, 2]}>
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
                                                                            'https://www.keppelland.com/sg/en/privacy-policy.html',
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
                                                                    Privacy Policy
                                                                </span>
                                                            }
                                                            . This statement contains important information on the types
                                                            of data collected and how they may be used, including for
                                                            purposes of data analytics.
                                                        </Box>
                                                    </Box>
                                                </Flex>
                                            </FormControl>
                                        </SimpleGrid>
                                    </Fade>
                                    <Fade bottom>
                                        <Box>
                                            <ReCAPTCHA
                                                ref={recaptchaRef}
                                                sitekey={content.reCaptcha_site_key}
                                                onChange={onReCAPTCHAChange}
                                            />
                                        </Box>
                                    </Fade>
                                    <Button
                                        w="40%"
                                        type="submit"
                                        borderRadius={20}
                                        bgColor={colors.primary}
                                        color="white"
                                        variant="solid"
                                        isLoading={isSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </chakra.form>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default Summary;
