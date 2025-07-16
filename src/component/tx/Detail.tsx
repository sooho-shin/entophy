import React, { useEffect, useState } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useTxStore } from '../../store/tx';
import SkeletonComponent from '../common/Skeleton';
import Internal from './datail/Internal';
import Logs from './datail/Logs';
import Overview from './datail/Overview';

const Detail = () => {
  const tabList = ['Overview', 'Internal Txns', 'Logs'];
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState('Overview');
  const tabParam = searchParams.get('tab');
  const { detailData } = useTxStore((state) => state);
  useEffect(() => {
    if (tabParam) {
      setTab(tabParam);
    } else {
      setTab('Overview');
    }
  }, [tabParam]);

  // useEffect(() => {

  // }, [detailData]);
  if (detailData === 'nodata') return <></>;
  return (
    <Wrapper>
      {detailData ? (
        <TabRow>
          {tabList.map((c, i) => {
            if (
              c === tabList[1] &&
              detailData &&
              (!detailData.internal_transaction_list ||
                (detailData.internal_transaction_list &&
                  detailData.internal_transaction_list.length === 0))
            ) {
              return false;
            }
            if (c === tabList[2] && detailData && !detailData.eventLogs) {
              return false;
            }
            return (
              <li key={i}>
                <TabLink tab={c} isActive={tab === c}>
                  <span>
                    {c}{' '}
                    {c === 'Logs'
                      ? `(${
                          detailData && detailData.eventLogs && detailData.eventLogs.logs
                            ? detailData.eventLogs.logs.length
                            : 0
                        })`
                      : undefined}
                  </span>
                </TabLink>
              </li>
            );
          })}
        </TabRow>
      ) : (
        <SkeletonComponent
          maxWidth="100px"
          height="37px"
          style={{ marginBottom: '32px', marginRight: 'auto', padding: '8px' }}
        />
      )}
      {(tab === 'Overview' || tab === null) && <Overview />}
      {tab === 'Internal Txns' && <Internal />}
      {tab === 'Logs' && <Logs />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const TabRow = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 32px;
  ${({ theme }) => theme.media.tablet`
        margin-bottom:1rem;
    `}
  li {
    padding: 8px;
    a {
      text-decoration: none;
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray3};
      &.active {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray.gray5};
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

export default Detail;
