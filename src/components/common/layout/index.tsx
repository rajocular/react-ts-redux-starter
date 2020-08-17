import React from 'react';
import { Box, Container } from '@material-ui/core';

interface LayoutProps {
  containerWidth?: string;
  containerHeight?: any;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  containerWidth,
  containerHeight,
  children
}) => (
  <Box component={Container} maxWidth={containerWidth || 'lg'} height={containerHeight || '100%'}>
    <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
      {children}
    </Box>
  </Box>
);

export default Layout;
