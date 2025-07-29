import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    FormControl,
    FormLabel,
    Select,
    Stack,
    Button,
    SimpleGrid,
    GridItem,
    useBreakpointValue,
    Heading,
    HStack,
    Text,
    Divider,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const appointmentCategories = ["Health check-up", "Health promotion treatment"];
const services = ["General Check-up", "Vaccination", "Consultation", "Screening"];

const generateTimeSlots = (start: string, end: string, selectedDate: string | null): string[] => {
    const slots: string[] = [];
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const date = new Date();
    date.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    while (date <= endTime) {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        const formattedHour = hour12.toString().padStart(2, "0");
        const formattedMinute = minutes.toString().padStart(2, "0");
        const suffix = hours >= 12 ? "pm" : "am";
        const formattedTime = `${formattedHour}:${formattedMinute}${suffix}`;

        slots.push(formattedTime);
        date.setMinutes(date.getMinutes() + 30);
    }

    return slots;
};

const AddEditAppointment = () => {
    const [category, setCategory] = useState(appointmentCategories[0]);
    const [service, setService] = useState(services[0]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [aiClinicTime, setAiClinicTime] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const gridColumns = useBreakpointValue({ base: 7 });

    useEffect(() => {
        const today = new Date();
        const dateKey = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        setSelectedDate(dateKey);
    }, []);

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push({ day: null, isCurrentMonth: false, isPastDate: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            currentDate.setHours(0, 0, 0, 0);

            const isPastDate = currentDate < today;
            days.push({ day: i, isCurrentMonth: true, isPastDate });
        }

        return days;
    };

    const calendarDays = generateCalendarDays();

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const getDateKey = (day: number, month: number, year: number) => `${day}-${month + 1}-${year}`;

    const isTimeInPast = (time: string, date: string | null) => {
        if (!date) return false;

        const [day, month, year] = date.split('-').map(Number);
        const [timePart, period] = time.split(/(am|pm)/);
        const [hours, minutes] = timePart.split(':').map(Number);

        let hours24 = hours;
        if (period === 'pm' && hours !== 12) {
            hours24 += 12;
        } else if (period === 'am' && hours === 12) {
            hours24 = 0;
        }

        const selectedDateTime = new Date(year, month - 1, day, hours24, minutes);
        const now = new Date();

        return selectedDateTime < now;
    };

    useEffect(() => {
        if (selectedDate) {
            const slots = generateTimeSlots("08:00", "19:30", selectedDate);

            if (selectedTime && isTimeInPast(selectedTime, selectedDate)) {
                setSelectedTime(null);
            }

            if (aiClinicTime && isTimeInPast(aiClinicTime, selectedDate)) {
                setAiClinicTime(null);
            }
        }
    }, [selectedDate]);

    const timeSlots = generateTimeSlots("08:00", "19:30", selectedDate);

    return (
        <Box p={{ base: 4, md: 10 }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
                <FormControl>
                    <FormLabel fontWeight="bold">Appointment Category</FormLabel>
                    <Select value={category} size={"lg"} onChange={(e) => setCategory(e.target.value)} placeholder="Select category">
                        {appointmentCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                        
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight="bold">Service</FormLabel>
                    <Select value={service} size={"lg"} onChange={(e) => setService(e.target.value)} placeholder="Select service">
                        {services.map(srv => (
                            <option key={srv} value={srv}>{srv}</option>
                        ))}
                    </Select>
                </FormControl>
            </SimpleGrid>
            <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
                gap={6}
                mb={8}
                mt={10}
            >
                <Box>
                    <Heading as="h2" size="md" mb={2}>
                        Select Date & Time
                    </Heading>
                    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
                        <HStack justify="space-between" mb={4}>
                            <Button size="sm" onClick={handlePrevMonth}>
                                <ChevronLeftIcon />
                            </Button>
                            <Text fontWeight="bold">
                                {currentMonth.toLocaleString("default", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </Text>
                            <Button size="sm" onClick={handleNextMonth}>
                                <ChevronRightIcon />
                            </Button>
                        </HStack>

                        <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={1}>
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <GridItem
                                    key={day}
                                    textAlign="center"
                                    fontWeight="bold"
                                    py={2}
                                >
                                    {day}
                                </GridItem>
                            ))}
                            {calendarDays.map(({ day, isCurrentMonth, isPastDate }, index) => {
                                if (day === null) {
                                    return <GridItem key={`empty-${index}`} py={2} />;
                                }

                                const dateKey = getDateKey(
                                    day,
                                    currentMonth.getMonth(),
                                    currentMonth.getFullYear()
                                );
                                const isSelected = selectedDate === dateKey;
                                const isToday = dateKey === `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

                                return (
                                    <GridItem key={index} textAlign="center" py={2}>
                                        <Button
                                            size="sm"
                                            variant={isSelected ? "solid" : "ghost"}
                                            colorScheme={isSelected ? "blue" : isToday ? "green" : undefined}
                                            color={isCurrentMonth ? "current" : "gray.400"}
                                            onClick={() =>
                                                isCurrentMonth &&
                                                !isPastDate &&
                                                setSelectedDate(dateKey)
                                            }
                                            isDisabled={!isCurrentMonth || isPastDate}
                                        >
                                            {day}
                                        </Button>
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    </Box>
                </Box>

                <Box>
                    <Text fontWeight="bold" mb={2}>
                        Select Appointment Time
                    </Text>
                    <Box bg="gray.50" rounded="md" p={4} maxH="385px" overflowY="auto">
                        <SimpleGrid columns={2} spacing={2}>
                            {timeSlots.map((time) => {
                                const isPast = isTimeInPast(time, selectedDate);
                                return (
                                    <Button
                                        key={time}
                                        variant={selectedTime === time ? "solid" : "outline"}
                                        colorScheme={selectedTime === time ? "blue" : undefined}
                                        onClick={() => !isPast && setSelectedTime(time)}
                                        opacity={isPast ? 0.6 : 1}
                                        cursor={isPast ? "not-allowed" : "pointer"}
                                        isDisabled={isPast}
                                    >
                                        {time}
                                    </Button>
                                );
                            })}
                        </SimpleGrid>
                    </Box>
                </Box>
                <Box>
                    <Text fontWeight="bold" mb={2}>
                        Select AI Clinic Examination Time
                    </Text>
                    <Box bg="gray.50" rounded="md" p={4} maxH="385px" overflowY="auto">
                        <SimpleGrid columns={2} spacing={2}>
                            {timeSlots.map((time) => {
                                const isPast = isTimeInPast(time, selectedDate);
                                return (
                                    <Button
                                        key={time}
                                        variant={aiClinicTime === time ? "solid" : "outline"}
                                        colorScheme={aiClinicTime === time ? "blue" : undefined}
                                        onClick={() => !isPast && setAiClinicTime(time)}
                                        opacity={isPast ? 0.6 : 1}
                                        cursor={isPast ? "not-allowed" : "pointer"}
                                        isDisabled={isPast}
                                    >
                                        {time}
                                    </Button>
                                );
                            })}
                        </SimpleGrid>
                    </Box>
                </Box>
            </Grid>
            <Stack direction="row" spacing={4} justify="flex-end">
                <Button variant="outline" colorScheme="red">Cancel</Button>
                <Button colorScheme="blue">Submit</Button>
            </Stack>
        </Box>
    );
};

export default AddEditAppointment;