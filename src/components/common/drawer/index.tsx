import React from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';

interface DrawerProps {
  open?: boolean;
  anchor?: any;
  variant?: any;
  drawerContent: JSX.Element;
  handleClose?: Function;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  anchor,
  variant,
  drawerContent,
  handleClose
}) => (
  <MuiDrawer
    open={open}
    anchor={anchor || 'left'}
    variant={variant || 'permanent'}
    onClose={handleClose as any}
  >
    {drawerContent}
  </MuiDrawer>
);

export default Drawer;
