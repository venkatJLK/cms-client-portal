import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  HStack,
  Flex,
  Heading,
  List,
  ListItem,
  useColorModeValue,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Images from "../common/image/Images";
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const bgColor = useColorModeValue("#f8f9fa", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Zui Kai",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
      specialties: [
        "Thai Traditional Pharmacy",
        "Thai Traditional Midwifery",
        "Thai Traditional Medicine",
        "Thai Traditional Massage",
      ],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 2,
      name: "Dr. Aswathi",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      specialties: [
        "Thai Traditional Pharmacy",
        "Thai Traditional Midwifery",
        "Thai Traditional Medicine",
        "Thai Traditional Massage",
      ],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 3,
      name: "Dr. Pim",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
      specialties: [
        "Thai Traditional Pharmacy",
        "Thai Traditional Midwifery",
        "Thai Traditional Medicine",
        "Thai Traditional Massage",
      ],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 4,
      name: "Dr. Justin",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      specialties: [
        "Thai Traditional Pharmacy",
        "Thai Traditional Midwifery",
        "Thai Traditional Medicine",
        "Thai Traditional Massage",
      ],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 5,
      name: "Dr. Melody",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      specialties: ["Thai Traditional Pharmacy"],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 6,
      name: "Dr. Dexter Morgan",
      image:
        "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=400&q=80",
      specialties: ["Thai Traditional Pharmacy"],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 7,
      name: "Dr. Maharaj",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      specialties: ["Thai Functional Pharmacy"],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
    {
      id: 8,
      name: "Dr. Lila",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
      specialties: ["Thai Traditional Pharmacy"],
      certifications: [
        "Master of Applied Thai Traditional Medicine",
        "Bachelor of Applied Thai Traditional Medicine",
      ],
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const search = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(search) ||
      doctor.specialties.some((s) => s.toLowerCase().includes(search)) ||
      doctor.certifications.some((c) => c.toLowerCase().includes(search))
    );
  });

  const BulletPoint = () => (
    <Box
      w="4px"
      h="4px"
      bg="gray.500"
      borderRadius="full"
      display="inline-block"
      mr={2}
      mt="6px"
      flexShrink={0}
    />
  );

  return (
    <Box bg={bgColor} minH="100vh" py={6}>
      <Container maxW="container.2xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: 4, md: 0 }}
          mb={8}
        >
          <Box>
            <Text fontSize={["lg", "xl"]} fontWeight="bold">
              Doctors
            </Text>
            <Text color={textColor} fontSize="sm">
              Total {doctors.length} Records
            </Text>
          </Box>

          <Box w={{ base: "100%", md: "350px" }}>
            <InputGroup>
              <Input
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="8px"
                h="40px"
                fontSize="14px"
                _placeholder={{ color: "gray.400" }}
                _focus={{
                  borderColor: "blue.400",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
              />
              <InputLeftElement h="40px">
                <SearchIcon color="gray.400" w="16px" h="16px" />
              </InputLeftElement>
            </InputGroup>
          </Box>
        </Flex>

        <Grid
          templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
          gap={6}
          bg={cardBg}
          p={5}
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
        >
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <GridItem key={doctor.id}>
                <Flex
                  direction="column"
                  h="100%"
                  bg="#F4F6FA"
                  borderRadius="12px"
                  overflow="hidden"
                  shadow="sm"
                  border="1px solid"
                  borderColor={borderColor}
                  transition="all 0.2s"
                  _hover={{
                    shadow: "md",
                    transform: "translateY(-2px)",
                  }}
                >
                  <Box
                    w="236px"
                    h="135px"
                    bg="gray.100"
                    overflow="hidden"
                    borderRadius="10px"
                    m={5}
                  >
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>

                  <Flex direction="column" px={5} pt={0} pb={5} flex="1">
                    <Heading
                      size="md"
                      color={headingColor}
                      fontWeight="semibold"
                      mb={3}
                    >
                      {doctor.name}
                    </Heading>
                    <Divider mb={3} />
                    <Box mb={4}>
                      <HStack mb={2} align="center">
                        <Image
                          src={Images.report}
                          alt="Specialty Icon"
                          boxSize="16px"
                        />
                        <Text
                          fontWeight="semibold"
                          color={headingColor}
                          fontSize="sm"
                        >
                          Specialties
                        </Text>
                      </HStack>
                      <List spacing={2}>
                        {doctor.specialties.map((specialty, index) => (
                          <ListItem key={index}>
                            <HStack align="flex-start" spacing={0}>
                              <BulletPoint />
                              <Text
                                fontSize="sm"
                                color={textColor}
                                lineHeight="1.4"
                              >
                                {specialty}
                              </Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Divider mb={3} />
                    <Box mb={4}>
                      <HStack mb={2} align="center">
                        <Image
                          src={Images.report}
                          alt="Cert Icon"
                          boxSize="16px"
                        />
                        <Text
                          fontWeight="semibold"
                          color={headingColor}
                          fontSize="sm"
                        >
                          Professional Certifications
                        </Text>
                      </HStack>
                      <List spacing={2}>
                        {doctor.certifications.map((cert, index) => (
                          <ListItem key={index}>
                            <HStack align="flex-start" spacing={0}>
                              <BulletPoint />
                              <Text
                                fontSize="sm"
                                color={textColor}
                                lineHeight="1.4"
                              >
                                {cert}
                              </Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Spacer />
                    <Button
                      bg="#A78E63"
                      color="white"
                      size="md"
                      borderRadius="8px"
                      h="44px"
                      fontSize="14px"
                      fontWeight="medium"
                      _hover={{ bg: "#8f774f" }}
                      _active={{ bg: "#A78E63" }}
                      mt={2}
                      w="100%"
                    >
                      Book Appointment
                    </Button>
                  </Flex>
                </Flex>
              </GridItem>
            ))
          ) : (
            <GridItem
              colSpan={{ base: 1, md: 2, lg: 3 }}
              textAlign="center"
              py={10}
            >
              <Text color={textColor} fontSize="lg" fontWeight="medium">
                No doctors available
              </Text>
            </GridItem>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default DoctorProfile;
