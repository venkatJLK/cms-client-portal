import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { AppDrawer } from './AppDrawer';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const sidebarWidth = isCollapsed ? '60px' : '250px';

  return (
    <Flex h="100vh" bg="#F4F6FA" overflow="hidden">
      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        isCollapsed={isCollapsed}
      />

      <Box
        ml={{ base: 0, md: sidebarWidth }}
        flex="1"
        display="flex"
        flexDirection="column"
        transition="margin-left 0.3s"
        overflow="auto"
      >
        <Header
          onOpenDrawer={toggleDrawer}
          onToggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />
        <Box as="main" p={4} flex="1" overflowY="auto">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};
