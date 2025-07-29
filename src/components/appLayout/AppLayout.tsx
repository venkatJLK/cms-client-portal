import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
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
    <Box>
      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        isCollapsed={isCollapsed}
      />
      <Box
        ml={{ base: 0, md: sidebarWidth }}
        transition="margin-left 0.3s"
      >
        <Header
          onOpenDrawer={toggleDrawer}
          onToggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />
        <Box as="main" p={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
