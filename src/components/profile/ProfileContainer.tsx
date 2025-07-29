import React from "react";
import { Box, Flex, Avatar, Text, Badge } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";

const ProfileContainer: React.FC = () => {
    return (
        <React.Fragment>
            <Box
                bg="white"
                borderRadius="2xl"
                boxShadow="sm"
                p={{ base: 3, md: 6 }}
                display="flex"
                alignItems="center"
            >
                <Flex align="center">
                    <Box
                        minW={{ base: "56px", md: "90px" }}
                        w={{ base: "56px", md: "90px" }}
                        h={{ base: "56px", md: "90px" }}
                        borderRadius="lg"
                        bg="gray.100"
                        overflow="hidden"
                        mr={{ base: 3, md: 6 }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar
                            name="Andrew Louis"
                            src=""
                            size={{ base: "lg", md: "xl" }}
                            bg="gray.100"
                        />
                    </Box>
                    <Box>
                        <Text
                            fontWeight="medium"
                            fontSize={{ base: "md", md: "lg" }}
                            mb="1"
                            color="gray.800"
                        >
                            Andrew Louis
                        </Text>
                        <Badge
                            colorScheme="blue"
                            fontSize={{ base: "0.70em", md: "0.92em" }}
                            fontWeight="normal"
                            borderRadius="md"
                            px="2"
                            py="0.5"
                            display="inline-flex"
                            alignItems="center"
                        >
                            <Box as="span" mr="1" fontSize="1em" color="blue.500">✔️</Box>
                            Face Verified
                        </Badge>
                    </Box>
                </Flex>
            </Box>
            <ProfileCard />
        </React.Fragment>
    );
};

export default ProfileContainer;
