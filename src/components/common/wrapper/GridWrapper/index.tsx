import React, { ReactNode } from 'react';
import { Grid, GridProps } from '@material-ui/core';

interface GridComponentProps {
  gridProps?: GridProps;
  content: ReactNode;
}

interface GridWrapperProps {
  containerProps: GridProps;
  gridComponents?: GridComponentProps[];
}

export const GridWrapper = (props: GridWrapperProps) => {
  const { containerProps, gridComponents } = props;

  return (
    <Grid container {...containerProps}>
      {gridComponents.map((component, index) => (
        <Grid key={index} item {...component.gridProps || {}}>
          {component.content}
        </Grid>
      ))}
    </Grid>
  );
};
