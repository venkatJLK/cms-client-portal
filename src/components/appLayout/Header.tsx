import React, { useState } from 'react';
import {
  Flex,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  IconButton,
  Image,
  Icon,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  InfoOutlineIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
   AtSignIcon,
   CalendarIcon,
} from '@chakra-ui/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

import "./AppLayoutStyle.css";



interface HeaderProps {
  onOpenDrawer: () => void;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onToggleCollapse,
  isCollapsed,
}) => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'th'>('en');

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

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

  return (
    <Flex
      as="header"
      w="full"
      h="85px"
      px={4}
      bg="white"
      align="center"
      justify="space-between"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex={10}
    >
      <Flex align="center" gap={2}>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={onOpenDrawer}
        />
        <IconButton
          aria-label="Toggle sidebar"
          icon={<HamburgerIcon />}
          variant="ghost"
          display={{ base: 'none', md: 'inline-flex' }}
          onClick={onToggleCollapse}
        />
      </Flex>

      <Flex align="center" gap={4}>
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
            <Flex align="center" gap={2}>
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

        <Menu placement="bottom-end" closeOnBlur closeOnSelect>
          <MenuButton as={Button} variant="ghost"
            p={0}
            borderRadius="full"
            minW="auto"
            h="60px"
            w="60px"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar size="md" name="John Doe" color="black" />
          </MenuButton>
          <MenuList border="2px solid" borderColor="gray.300" shadow={2 }>
            <Box px={4} py={3} display="flex" alignItems="center" gap={3}>
              <Avatar name="John Doe" size="sm" />
              <Box>
                <Text fontWeight="semibold" fontSize="sm">
                  John Doe
                </Text>
                <Text fontSize="xs" color="gray.500">
                  john.doe@example.com
                </Text>
              </Box>
            </Box>
            <Box borderBottom="1px solid" borderColor="gray.200" my={1} />

            <MenuItem icon={<FaUser />} _hover={{ bg: "gray.100" }}>
              Profile
            </MenuItem>
            <MenuItem
              icon={<MdLogout />}
              onClick={handleLogout}
              color={"#FF2C00"}
              _hover={{ bg: "gray.100" }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
