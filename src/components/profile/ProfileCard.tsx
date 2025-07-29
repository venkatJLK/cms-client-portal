import React from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Divider,
    Heading,
    Button,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Tabs,
    Flex,
    useBreakpointValue,
    SimpleGrid,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const user = {
    mobile: "+66 9988239283",
    age: 27,
    bloodGroup: "A+",
    gender: "Male",
    maritalStatus: "Married",
    email: "Andrewlouis@gmail.com",
    nationality: "Thailand",
    race: "Asian",
    address: "403Chan 33 Rd., Thung Wat Don, Sathorn090",
};

const labelStyle = {
    color: "gray.500",
    fontWeight: 500,
    minW: "120px",
    fontSize: { base: "sm", md: "md" },
};
const valueStyle = { color: "gray.800", fontSize: { base: "sm", md: "md" } };

const ProfileInfoGrid = () => (
    <Flex
        wrap="wrap"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 0 }}
    >
        <VStack align="flex-start" spacing={4} flex="1">
            <HStack>
                <Text {...labelStyle}>Mobile :</Text>
                <Text {...valueStyle}>{user.mobile}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Age :</Text>
                <Text {...valueStyle}>{user.age}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Blood Group :</Text>
                <Text {...valueStyle}>{user.bloodGroup}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Gender :</Text>
                <Text {...valueStyle}>{user.gender}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Marital Status :</Text>
                <Text {...valueStyle}>{user.maritalStatus}</Text>
            </HStack>
        </VStack>
        <VStack
            align={{ base: "flex-start", md: "flex-start" }}
            spacing={4}
            flex="1"
            mt={{ base: 4, md: 0 }}
        >
            <HStack>
                <Text {...labelStyle}>Email :</Text>
                <Text {...valueStyle}>{user.email}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Nationality :</Text>
                <Text {...valueStyle}>{user.nationality}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Race :</Text>
                <Text {...valueStyle}>{user.race}</Text>
            </HStack>
            <HStack>
                <Text {...labelStyle}>Address :</Text>
                <Text {...valueStyle}>{user.address}</Text>
            </HStack>
        </VStack>
    </Flex>
);


const BookingCard = ({ booking }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
        >
            <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="lg" fontWeight="semibold">
                    {booking.date}
                </Text>
                <Button colorScheme="blue" size="sm">
                    View
                </Button>
            </Flex>
            <Text color="gray.600">{booking.time}</Text>
        </Box>
    );
};
const ProfileCard = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const upcomingBookings = [
        {
            id: 1,
            date: "14th May 2025",
            time: "09:30 am, Monday",
        },
    ];

    const pastBookings = [
        {
            id: 2,
            date: "25th May 2025",
            time: "09:30 am, Monday",
        },
        {
            id: 3,
            date: "25th May 2025",
            time: "09:30 am, Monday",
        },
    ];

    const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });


    return (
        <Box
            bg="white"
            borderRadius="2xl"
            shadow="sm"
            p={{ base: 2, md: 8 }}
            mt={4}
            mx="auto"
            w="100%"
        >
            <Tabs variant="unstyled" colorScheme="teal" defaultIndex={0}>
                <TabList
                    mb={4}
                    justifyContent="flex-start"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    overflowX={{ base: "auto", md: "visible" }}
                    sx={{
                        "::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                    }}
                >
                    <Tab
                        _selected={{
                            color: "#5B6DC6",
                            bg: "#F6F8FD",
                            borderRadius: "8px",
                            fontWeight: 600,
                        }}
                        fontSize={{ base: "sm", md: "md" }}
                        px={5}
                        mr={2}
                        py={{ base: 1, md: 2 }}
                    >
                        Details
                    </Tab>
                    <Tab
                        _selected={{
                            color: "#5B6DC6",
                            bg: "#F6F8FD",
                            borderRadius: "8px",
                            fontWeight: 600,
                        }}
                        fontSize={{ base: "sm", md: "md" }}
                        px={5}
                        mr={2}
                        py={{ base: 1, md: 2 }}
                    >
                        Medical Info
                    </Tab>
                    <Tab
                        _selected={{
                            color: "#5B6DC6",
                            bg: "#F6F8FD",
                            borderRadius: "8px",
                            fontWeight: 600,
                        }}
                        fontSize={{ base: "sm", md: "md" }}
                        px={5}
                        py={{ base: 1, md: 2 }}
                    >
                        Appointments
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel px={{ base: 0, md: 2 }}>
                        <HStack
                            justify="space-between"
                            align={{ base: "center", md: "flex-start" }}
                            mb={3}
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={2}
                        >
                            <Heading size="md" fontSize={{ base: "md", md: "lg" }}>
                                Personal Information
                            </Heading>
                            <Button
                                size={isMobile ? "sm" : "sm"}
                                leftIcon={<EditIcon />}
                                variant="outline"
                                colorScheme="gray"
                                borderRadius="lg"
                            >
                                Edit
                            </Button>
                        </HStack>
                        <ProfileInfoGrid />
                    </TabPanel>
                    <TabPanel px={{ base: 0, md: 2 }}>
                        <HStack
                            justify="space-between"
                            align={{ base: "center", md: "flex-start" }}
                            mb={3}
                            flexDirection={{ base: "column", sm: "row" }}
                            gap={2}
                        >
                            <Heading size="md" fontSize={{ base: "md", md: "lg" }}>
                                Health Information
                            </Heading>
                        </HStack>
                        <HStack>
                            <Text {...labelStyle}>Medical Info :</Text>
                            <Text {...valueStyle}>Diabetes, Hypertension, Allergies - Peanuts, Soy </Text>
                        </HStack>
                    </TabPanel>
                    <TabPanel px={{ base: 0, md: 2 }}>
                        <VStack align="stretch" spacing={4}>
                            <HStack
                                justify="space-between"
                                align={{ base: "center", md: "flex-start" }}
                                mb={3}
                                flexDirection={{ base: "column", sm: "row" }}
                                gap={2}
                            >
                                <Heading size="md" fontSize={{ base: "md", md: "lg" }}>
                                    Booking History
                                </Heading>
                            </HStack>

                            <Tabs variant="enclosed">
                                <TabList>
                                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Upcoming</Tab>
                                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Past</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <SimpleGrid columns={gridColumns} spacing={4} mt={4}>
                                            {upcomingBookings.map((booking) => (
                                                <BookingCard key={booking.id} booking={booking} />
                                            ))}
                                        </SimpleGrid>
                                    </TabPanel>

                                    <TabPanel>
                                        <SimpleGrid columns={gridColumns} spacing={4} mt={4}>
                                            {pastBookings.map((booking) => (
                                                <BookingCard key={booking.id} booking={booking} />
                                            ))}
                                        </SimpleGrid>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default ProfileCard;
