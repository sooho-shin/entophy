import Wrapper from '@/component/common/Wrapper';
import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import SearchRow from '../../component/common/SearchRow';
import TitleRow from '../../component/common/TitleRow';
import VolumnTable from '../../component/tokens/Rank20Table';

const Rank20: FC = () => {
  const { fetchTokenData, resetAllData } = useTokenStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { totalCount } = usePaginationStore((state) => state);
  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTokenData({ type: 'erc20', ...currentParams });
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>BEP-20 Tokens</h1>
            <p>Top Ranking</p>
          </>
        </TitleRow>
      </div>
      <div className="paging-row">
        <p>
          A total of{' '}
          {Number(totalCount).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{' '}
          BEP-20 Token Contracts found
        </p>
        <Pagination />
      </div>
      <WhiteBox>
        <SearchRow placeholder="Search for Token Name or Address" />
        <VolumnTable />
      </WhiteBox>
      <div className="paging-row-bottom">
        <PageNumSelect />
        <Pagination />
      </div>
    </Wrapper>
  );
};

const WhiteBox = styled.div`
  width: 100%;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.gray.white};
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  ${({ theme }) => theme.media.tablet`
      padding:1rem;
      margin-top: 1rem;
    `}
`;

export default Rank20;
