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
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
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
        <Button variant="ghost">English</Button>

        <Menu>
          <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
            <HStack>
              <Avatar size="sm" name="John Doe" />
              <Text display={{ base: 'none', md: 'inline' }}>John Doe</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
