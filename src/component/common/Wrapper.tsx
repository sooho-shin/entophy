import React, { FC } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  children: React.ReactNode | JSX.Element;
  className?: string;
}

const Wrapper: FC<WrapperProps> = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

const Container = styled.div`
  padding: 40px 24px 60px 24px;
  .box {
    margin-top: 24px;
    ${({ theme }) => theme.media.tablet`
    margin-top:0px;
  `}
  }
  .row-box {
    display: flex;
    gap: 1rem;
    ${({ theme }) => theme.media.tablet`
    display:unset
  `}
  }
  .search-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    > button {
      width: 34px;
      height: 34px;
      background: ${({ theme }) => theme.colors.primary.primary6};
      border-radius: 5px;
      color: #fff;
    }
  }
  ${({ theme }) => theme.media.tablet`
    padding: 24px 16px 88px 16px;
  `}

  .top-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    ${({ theme }) => theme.media.tablet`
     flex-direction:column;
     align-items:flex-start;
    `}
  }
  .paging-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    padding: 8px;
    ${({ theme }) => theme.media.tablet`
     flex-direction:column;
     align-items:flex-start;
     margin-top:0px;
     padding:8px 0;
    `}
    > p {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
      ${({ theme }) => theme.media.tablet`
      margin-bottom:1rem;
    `}
    }
  }
  .paging-row-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
    gap: 32px;
    ${({ theme }) => theme.media.tablet`
     flex-direction:column-reverse;
     align-items:flex-start;
     gap:1rem;
    `}
  }
`;

export default Wrapper;
