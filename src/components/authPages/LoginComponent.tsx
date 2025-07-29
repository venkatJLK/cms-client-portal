import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Link,
    VStack,
    IconButton,
    Image,
    Select,
    InputRightElement,
    MenuList,
    Menu,
    MenuButton,
    MenuItem,
    Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon, EmailIcon, LockIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Images from '../common/image/Images';
import { useCustomToast } from '../common/toastUtils/toastUtils';
import { fetchUserData } from '../../store/slices/loginSlice';
import { useAppDispatch } from '../../store/slices/hooks';

const LoginComponent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { showError, showSuccess } = useCustomToast();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'th'>('en');

    const languageOptions = {
        en: {
            label: 'English',
            flag: 'https://flagcdn.com/w40/gb.png',
        },
        th: {
            label: 'ไทย',
            flag: 'https://flagcdn.com/w40/th.png',
        },
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/profile');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const accessToken = await user.getIdToken();

            const result = await dispatch(fetchUserData({ email: user.email!, token: accessToken }));

            if (fetchUserData.fulfilled.match(result)) {
                const data = result.payload.profile;
                const fullName = `${data.first_name} ${data.middle_name} ${data.last_name}`.trim();
                sessionStorage.setItem("name", fullName);

                showSuccess('Login successful', `Welcome back, ${fullName}`);
                navigate('/');
            } else {
                showError('Login failed', 'Unable to fetch user data.');
            }
        } catch (error: any) {
            showError('Login failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex height="100vh" direction={{ base: 'column', md: 'row' }}>
            <Box  display={{ base: 'none', md: 'block' }}>
                <Image
                    src={Images.login_banner}
                    alt="Doctor Illustration"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                />
            </Box>

             <Flex
                flex={1}
                bg="white"
                p={{ base: 6, md: 12 }}
                align="start"
                justify="center"
                minH="100%"
                position="relative"
               >
                 <Box w="100%" maxW="md">
                   <Image
                    height={{ base: "230px", sm: "250px", md: "280px", lg: "280px" }}
                   src={Images.login_form_logo}
                   aspectRatio={5 / 4}
                    />
                    <Flex justify="flex-end" position="absolute" top={30} right={30}>
                      <Menu>
                            <MenuButton
                              as={Box}
                              px={2}
                              py={2}
                              borderRadius="md"
                              border="1px solid #E2E8F0"
                              boxShadow="sm"
                              display="flex"
                              alignItems="center"
                              gap={2}
                              cursor="pointer"
                              _hover={{ bg: 'gray.50' }}
                            >
                                <Flex align="center" gap="2">
                                    <Image
                                        src={languageOptions[selectedLanguage].flag}
                                        alt="Lang Flag"
                                        boxSize="20px"
                                    />
                                    <Text fontSize="sm" fontWeight="medium">
                                        {languageOptions[selectedLanguage].label}
                                    </Text>
                                    <Icon as={ChevronDownIcon} boxSize={4} />
                                </Flex>
                            </MenuButton>
                            <MenuList minW="140px">
                                <MenuItem
                                    icon={<Image src={languageOptions.en.flag} alt="UK" boxSize="20px" />}
                                    onClick={() => setSelectedLanguage('en')}
                                >
                                    {languageOptions.en.label}
                                </MenuItem>
                                <MenuItem
                                    icon={<Image src={languageOptions.th.flag} alt="Thai" boxSize="20px" />}
                                    onClick={() => setSelectedLanguage('th')}
                                >
                                    {languageOptions.th.label}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>

                    <Text fontSize="3xl" fontWeight="extrabold" mb={1}>
                        Login
                    </Text>
                    <Text color="gray.600" mb={8} fontSize="md">
                        Welcome back to Siriraj
                    </Text>

                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontSize="sm" mb={1}>
                                Mail Id
                            </Text>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <EmailIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    bg="gray.100"
                                    borderRadius="lg"
                                    fontWeight="medium"
                                />
                            </InputGroup>
                        </Box>

                        <Box>
                            <Text fontSize="sm" mb={1}>
                                Password
                            </Text>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <LockIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    bg="gray.100"
                                    borderRadius="lg"
                                    fontWeight="medium"
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        icon={<ViewOffIcon />}
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        <Flex justify="space-between" align="center" w="100%">
                            <Link fontSize="sm" color="gray.600" fontWeight="medium">
                                Forgot Password?
                            </Link>
                        </Flex>

                        <Button
                            bg="#A78E63"
                            color="white"
                            isLoading={loading}
                            _hover={{ bg: '#8f774f' }}
                            onClick={handleLogin}
                            w="100%"
                            borderRadius="lg"
                            fontWeight="semibold"
                            py={6}
                        >
                            Login
                        </Button>
                    </VStack>

                    <Box mt={10} mb={4} borderTop="1px solid" borderColor="gray.200" />

                    <Text fontSize="sm">
                        New to Siriraj?{' '}
                        <Link color="#A78E63" fontWeight="semibold">
                            Sign Up
                        </Link>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};

export default LoginComponent;


