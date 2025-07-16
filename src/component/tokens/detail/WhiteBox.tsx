import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SkeletonComponent from '@/component/common/Skeleton';

type ContentType = {
  title: string;
  value: string;
  path?: string;
};

type BoxProps = {
  children?: JSX.Element;
  content: ContentType[];
  pad?: boolean;
};

export const WhiteBox = ({ content, children, pad = true }: BoxProps) => {
  return (
    <WhiteBoxWrapper pad={pad}>
      {children}
      <Content>
        {content.map((v, i) => {
          return (
            <li key={i + 1}>
              <div>{v.title}</div>
              {v.path ? (
                <Link to={v.path}>
                  {v.value ? v.value : <SkeletonComponent width="100px" />}
                </Link>
              ) : (
                <div>
                  {v.value === null ? (
                    <SkeletonComponent width="100px" />
                  ) : v.value === 'none' ? null : (
                    v.value
                  )}
                </div>
              )}
            </li>
          );
        })}
      </Content>
    </WhiteBoxWrapper>
  );
};

export const WhiteBoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 24px;
  ${({ theme }) => theme.media.tablet`
    padding: 1rem 0;
    flex-direction:column;
    gap:16px 0;
  `}
`;

export const WhiteBoxWrapper = styled.div<{ pad: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.gray.white};
  border-radius: 24px;
  padding: ${(props) => (props.pad ? '24px' : '24px 0')};
  ${({ theme }) => theme.media.tablet`
    padding: 1rem 0;
  `}
`;

const Content = styled.ul`
  ${({ theme }) => theme.media.tablet`
        padding:0 1rem
      `}
  li {
    font-size: 14px;
    font-weight: 300;
    line-height: 21px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
    div {
      color: ${({ theme }) => theme.colors.gray.gray4};
      width: 196px;
      ${({ theme }) => theme.media.tablet`
        width:104px
      `}
      &:last-child {
        width: calc(100% - 196px);
        color: ${({ theme }) => theme.colors.gray.gray6};
        ${({ theme }) => theme.media.tablet`
           width:calc(100% - 104px)
        `}
      }
    }
    a {
      width: calc(100% - 196px);
      color: ${({ theme }) => theme.colors.primary.primary6};
      word-break: break-all;
      ${({ theme }) => theme.media.tablet`
           width:calc(100% - 104px)
        `}
    }
  }
`;
