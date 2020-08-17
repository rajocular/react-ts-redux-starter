import React from 'react';
import { Avatar } from '@material-ui/core';

interface AvatarWrapperProps {
  src?: string;
  alt?: string;
  content?: React.ReactNode;
  className?: string;
  handleClick?: () => void;
}

export const AvatarWrapper = (props: AvatarWrapperProps) => {
  const { src, alt, content, className, handleClick } = props;

  return (
    <>
      {src
        ? <Avatar src={src} alt={alt} className={className} onClick={handleClick || null} />
        : <Avatar className={className} onClick={handleClick || null}>{content}</Avatar>
      }
    </>
  );
};
