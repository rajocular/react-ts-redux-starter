import React, { ReactNode } from 'react';
import { IconButton } from '@material-ui/core';

interface IconWrapperProps {
  icon: ReactNode;
  iconClassName?: string;
}

export const IconWrapper = (props: IconWrapperProps) => {
  const { icon, iconClassName } = props;

  return (
    <IconButton classes={{ root: iconClassName || 'navbar__icon__button' }}>
      {icon}
    </IconButton>
  );
};
