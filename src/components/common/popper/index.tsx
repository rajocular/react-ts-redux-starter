import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  Grid,
  Popper as MuiPopper,
  Paper,
  ClickAwayListener,
  PopperPlacementType
} from '@material-ui/core';

const StyledPaper = styled(Paper)`
  position: relative;
  top: 5px;
`;

interface PopperProps {
  children: JSX.Element;
  isOpen: boolean;
  popperContent: JSX.Element;
  placement?: PopperPlacementType;
  useParentWidth?: boolean;
  handleClose: Function;
}

const Popper = (props: PopperProps) => {
  const { children, isOpen, popperContent, placement, useParentWidth, handleClose } = props;
  const [ref, setRef] = useState(undefined);
  const [parentWidth, setParentWidth] = useState(0);
  const popperRef = useRef();

  useEffect(() => {
    if (isOpen && popperRef.current) {
      (popperRef.current as any).scheduleUpdate();
    }
    if (ref) {
      setParentWidth(ref.clientWidth);
    }
  });

  return (
    <>
      <Grid ref={setRef}>
        {children}
      </Grid>
      {ref
        && (
        <MuiPopper
          anchorEl={ref}
          open={isOpen}
          placement={placement || 'bottom'}
          popperRef={popperRef}
          modifiers={{
            flip: {
              enabled: true
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'viewport'
            }
          }}
        >
          <ClickAwayListener onClickAway={() => handleClose()}>
            <StyledPaper {...useParentWidth && { style: { width: parentWidth } }}>
              {popperContent}
            </StyledPaper>
          </ClickAwayListener>
        </MuiPopper>
        )
      }
    </>
  );
};

export default Popper;
