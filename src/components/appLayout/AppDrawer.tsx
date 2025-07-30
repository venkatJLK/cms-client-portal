import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  VStack,
  Text,
  useBreakpointValue,
  Image,
  Flex,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import Images from "../common/image/Images";
import "./AppLayoutStyle.css";

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

const navItems = [
  {
    label: "Profile",
    path: "/profile",
    activeIcon: Images.active_profile,
    inactiveIcon: Images.inactive_profile,
  },
  {
    label: "Reports",
    path: "/report",
    activeIcon: Images.active_report,
    inactiveIcon: Images.inactive_report,
  },
  {
    label: "Appointments",
    path: "/appointments",
    activeIcon: Images.active_appointment,
    inactiveIcon: Images.inactive_appointment,
  },
  {
    label: "Doctor",
    path: "/doctor",
    activeIcon: Images.active_doctor,
    inactiveIcon: Images.inactive_doctor,
  },
];

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  isCollapsed,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();

  const sidebarWidth = isCollapsed ? '60px' : '250px';

  const SidebarContent = (
    <Box
      bg="#1C2B47"
      color="white"
      w={{ base: 'full', md: sidebarWidth }}
      h="100vh"

    >
      <Flex justify="center" align="center" mb={8} direction="column">
        <Image
          src={isCollapsed ? Images.sidebar_small_logo : Images.sidebar_logo}
          alt="Logo"
          h="84px"
          w="100%"
          objectFit="contain"
          className='logo'
          mb={isCollapsed ? 0 : 2}
        />
      </Flex>
      <VStack align="stretch" spacing={3} p={4}>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink key={item.label} to={item.path}>
              <Flex
                align="center"
                gap={isCollapsed ? 0 : 4}
                justify={isCollapsed ? 'center' : 'flex-start'}
                px={isCollapsed ? 2 : 4}
                py={3}
                borderRadius="xl"
                bg={isActive ? 'white' : 'transparent'}
                color={isActive ? '#1C2B47' : 'white'}
                fontWeight={isActive ? 'semibold' : 'normal'}
                _hover={{ bg: isActive ? 'white' : 'whiteAlpha.300' }}
              >
                <Image
                  src={isActive ? item.activeIcon : item.inactiveIcon}
                  alt={`${item.label} icon`}
                  boxSize="24px"
                  objectFit="contain"
                />
                {!isCollapsed && <Text fontSize="md">{item.label}</Text>}
              </Flex>
            </NavLink>
          );
        })}

      </VStack>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#1C2B47">{SidebarContent}</DrawerContent>
      </Drawer>
    );
  }

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w={sidebarWidth}
      transition="width 0.3s"
      zIndex={999}
    >
      {SidebarContent}
    </Box>
  );
};
