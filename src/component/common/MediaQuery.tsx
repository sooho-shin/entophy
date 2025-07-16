import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

import sizes from '../../config/breakpoint';

interface MediaQueryProps {
  children: React.ReactNode;
}

const Mobile: FC<MediaQueryProps> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: `(max-width:${sizes.tablet}px)`,
  });
  return <>{isMobile && children}</>;
};

const PC: FC<MediaQueryProps> = ({ children }) => {
  const isPc = useMediaQuery({
    query: `(min-width:${sizes.tablet}px)`,
  });
  return <>{isPc && children}</>;
};

export { Mobile, PC };
