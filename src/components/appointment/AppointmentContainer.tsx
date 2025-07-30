import React from "react";
import {
    Box,
    Text,
    Button,
    Flex,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    useBreakpointValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const AppointmentContainer = () => {

    const navigate = useNavigate();
    const appointments = [
        {
            doctor: "Dr. Smith",
            time: "10:00 AM",
            aiClinicTime: "10:05 AM",
            appointment: "General Checkup",
            status: "Confirmed",
        },
        {
            doctor: "Dr. Watson",
            time: "11:00 AM",
            aiClinicTime: "11:10 AM",
            appointment: "Dental",
            status: "Pending",
        },
    ];

    return (
        <Box p={[2, 4]}>
            {/* Header Section */}
            <Flex
                direction={["column", "row"]}
                justify="space-between"
                align={["flex-start", "center"]}
                gap={2}
                mb={4}
            >
                <Box>
                    <Text fontSize={["lg", "xl"]} fontWeight="bold">
                        Appointments
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Total 124 Records
                    </Text>
                </Box>
                <Button
                    colorScheme="teal"
                    rightIcon={<span>+</span>}
                    variant="solid"
                    mt={[2, 0]}
                    width={["100%", "auto"]}
                    onClick={() => navigate("/appointments/schedule")}
                >
                    New Appointment
                </Button>
            </Flex>

            <Box
                backgroundColor="white"
                boxShadow="md"
                p={[2, 4]}
                borderRadius="md"
                mb={4}
            >
                <Flex
                    direction={["column", "row"]}
                    justify="space-between"
                    align={["stretch", "center"]}
                    gap={4}
                    mb={4}
                >
                    <Box>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.500" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search appointments"
                                variant="outline"
                                size="md"
                                borderRadius="10px"
                                w="100%"
                                _focus={{
                                    borderColor: "teal.500",
                                    boxShadow: "0 0 0 1px rgba(0, 159, 167, 0.6)",
                                }}
                            />
                        </InputGroup>
                    </Box>

                    <Box>
                        <DatePicker
                            selected={new Date()}
                            onChange={(date) => console.log(date)}
                            dateFormat="MMMM d, yyyy"
                            customInput={<Input w="100%" />}
                        />
                    </Box>
                </Flex>

                <Box overflowX="auto">
                    <Table variant="simple" minWidth="800px" width="100%">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th whiteSpace="nowrap">Doctor</Th>
                                <Th whiteSpace="nowrap">Time</Th>
                                <Th whiteSpace="nowrap">AI Clinic Time</Th>
                                <Th whiteSpace="nowrap">Appointment</Th>
                                <Th whiteSpace="nowrap">Status</Th>
                                <Th whiteSpace="nowrap">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {appointments.map((appt, index) => (
                                <Tr key={index}>
                                    <Td whiteSpace="nowrap">{appt.doctor}</Td>
                                    <Td whiteSpace="nowrap">{appt.time}</Td>
                                    <Td whiteSpace="nowrap">{appt.aiClinicTime}</Td>
                                    <Td whiteSpace="nowrap">{appt.appointment}</Td>
                                    <Td
                                        whiteSpace="nowrap"
                                        color={appt.status === "Confirmed" ? "green.500" : "orange.500"}
                                    >
                                        {appt.status}
                                    </Td>
                                    <Td whiteSpace="nowrap">
                                        <Flex gap={2}>
                                            <IconButton
                                                aria-label="Edit"
                                                icon={<EditIcon />}
                                                size="sm"
                                            />
                                            <IconButton
                                                aria-label="Delete"
                                                icon={<DeleteIcon />}
                                                size="sm"
                                                colorScheme="red"
                                            />
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>

            <Flex justify="center" mt={4}>
                <Stack direction="row" spacing={2} wrap="wrap" justify="center">
                    <Button variant="outline">Previous</Button>
                    <Button variant="solid" colorScheme="teal">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">Next</Button>
                </Stack>
            </Flex>
        </Box>
    );
};

export default AppointmentContainer;
