import React from 'react';
import { SvgIcon } from '@material-ui/core';

interface SvgWrapperProps {
  fontSize?: any;
  className?: string;
  icon: any;
}

export const SvgWrapper = (props: SvgWrapperProps) => {
  const { fontSize= 'small', className, icon } = props;

  return (
    <SvgIcon fontSize={fontSize} classes={{ root: className || null }}>
      {icon}
    </SvgIcon>
  );
};
