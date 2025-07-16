import { FC } from 'react';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  maxWidth?: string;
  style?: object;
  circle?: boolean;
  theme?: string;
}

const SkeletonComponent: FC<SkeletonProps> = ({
  width = '100%',
  maxWidth = '100%',
  height = '100%',
  style,
  circle,
  theme,
}) => {
  return (
    <div
      style={{
        width: width,
        maxWidth: maxWidth,
        height: height,
        ...style,
      }}
    >
      {circle ? (
        <SkeletonTheme>
          <Skeleton style={{ width: width, height: height }} circle />
        </SkeletonTheme>
      ) : (
        <SkeletonTheme
          baseColor={theme === 'dark' ? '#b8b8b8' : '#ebebeb'}
          highlightColor={theme === 'dark' ? '#dfdfdf' : '#f5f5f5'}
        >
          <Skeleton style={{ height: '100%' }} />
        </SkeletonTheme>
      )}
    </div>
  );
};

export default SkeletonComponent;
