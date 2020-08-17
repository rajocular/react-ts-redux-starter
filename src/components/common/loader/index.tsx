import React from 'react';
import Lottie from 'react-lottie';
import { Grid, Box } from '@material-ui/core';
import styled from 'styled-components';

import * as PageLoadingAnimation from 'src/assets/animations/page-loader-animation.json';
import * as SectionLoadingAnimation from 'src/assets/animations/section-loader-animation.json';

const StyledBox = styled(Box)`
  height: 100%;
  width: 100%;
`;

interface LoadingProps {
  isLoading: boolean;
  isSection?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  isSection,
  children
}) => {
  const animation: any = isSection ? SectionLoadingAnimation : PageLoadingAnimation;

  const options = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <StyledBox display='flex' justifyContent='center' alignItems='center'>
      {!!isLoading
        ? (
          <Grid>
            <Lottie
              width={200}
              height={200}
              options={options}
            />
          </Grid>
        )
        : children
      }
    </StyledBox>
  );
};

export default Loading;
