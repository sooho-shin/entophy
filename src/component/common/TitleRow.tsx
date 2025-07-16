import React, { FC } from 'react';
import styled from 'styled-components';

interface TitleRowProps {
  children: JSX.Element;
  align?: boolean;
}

const TitleRow: FC<TitleRowProps> = ({ children, align = false }: TitleRowProps) => {
  return <TitleBox align={align}>{children}</TitleBox>;
};

const TitleBox = styled.div<{ align: boolean | false }>`
  display: flex;
  align-items: ${(props) => (props.align ? 'center' : 'flex-end')};
  justify-content: flex-start;
  width: 100%;
  ${({ theme }) => theme.media.tablet`
      align-items:flex-start;
      flex-wrap:wrap;
    `}
  > h1 {
    font-weight: 800;
    font-size: 24px;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.primary.primary10};
    margin-right: 16px;
    ${({ theme }) => theme.media.tablet`
      margin-bottom:4px;
    `}
  }
  img {
    width: 32px;
    height: 32px;
    display: block;
    object-fit: cover;
    margin-right: 0.5rem;
  }
  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.9;
    color: ${({ theme }) => theme.colors.gray.gray3};
    align-self: ${(props) => (props.align ? 'flex-end' : 'unset')};
    ${({ theme }) => theme.media.tablet`
      align-self:unset;
      width:100%;
      font-size:12px;
      line-height:14px;
      margin-bottom:1rem;
      word-break:break-all;
      margin-top:0.4rem;
    `}
    span {
      &.active {
        color: ${({ theme }) => theme.colors.primary.primary6};
      }
    }
  }
`;
export default TitleRow;
