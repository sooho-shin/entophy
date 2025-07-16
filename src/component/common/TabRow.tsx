import { FC, useEffect, useState } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SkeletonComponent from '../common/Skeleton';
interface TabRowProps {
  tabList: string[];
  load?: boolean;
  address?: boolean;
}

const TabRow: FC<TabRowProps> = ({ tabList, load, address }) => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<string>();
  const tabParam = searchParams.get('tab');
  useEffect(() => {
    tabParam ? setTab(tabParam) : setTab(tabList[0]);
  }, [tabList, tabParam]);

  // useEffect(() => {
  //   if (tabParam) setTab(tabParam);
  // }, [tabParam]);

  return (
    <TabUl address={address}>
      {!load ? (
        tabList?.map((c, i) => {
          return (
            <li key={i}>
              <TabLink tab={c} isActive={tab === c}>
                <span>{c}</span>
              </TabLink>
            </li>
          );
        })
      ) : (
        <SkeletonComponent height="45px" />
      )}
    </TabUl>
  );
};

const TabUl = styled.ul<{ address: boolean | undefined }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  margin: 1rem 0;
  ${(props) =>
    props.address &&
    css`
      margin: 8px 0;
    `}
  gap: 0 8px;
  ${({ theme }) => theme.media.tablet`
    margin:8px 0;
    
  `}
  li {
    height: 45px;
    line-height: 29px;
    padding: 8px;
    a {
      text-decoration: none;
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray3};
      word-break: keep-all;
      white-space: nowrap;
      &.active {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray.gray5};
        font-size: 16px;
        border-bottom: 2px solid ${({ theme }) => theme.colors.gray.gray5};
      }
    }
  }
`;
interface TabLinkProps extends Omit<LinkProps, 'to'> {
  tab: string;
  isActive: boolean;
}

const TabLink = ({ tab, children, isActive, ...props }: TabLinkProps) => {
  return (
    <Link to={`?tab=${tab}`} {...props} className={isActive ? 'active' : undefined}>
      {children}
    </Link>
  );
};

export default TabRow;
