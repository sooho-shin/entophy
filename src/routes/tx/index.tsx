import Wrapper from '@/component/common/Wrapper';
import { usePaginationStore } from '@/store/pagination';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import TitleRow from '../../component/common/TitleRow';
import TransactionTable from '@/component/tx/TransactionTable';
import { useTxStore } from '../../store/tx';
import bignumberUtil from '@/utils/bignumber';

const Txns = () => {
  const { fetchTxData, resetAllData } = useTxStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { realTotalCount } = usePaginationStore((state) => state);

  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTxData(currentParams);
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>Transactions</h1>
            {currentParams.block ? (
              <p>
                For Block <span className="active">{currentParams.block}</span>
              </p>
            ) : (
              <p>
                {currentParams.address ? (
                  'Showing the last 50k records'
                ) : (
                  <>
                    More than &gt; {bignumberUtil.formatNumber(realTotalCount.toString())}{' '}
                    transactions found (Showing the last 50k records)
                  </>
                )}
              </p>
            )}
          </>
        </TitleRow>
        <Pagination />
      </div>
      <WhiteBox>
        <TransactionTable />
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
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  ${({ theme }) => theme.media.tablet`
     padding:16px
    `}
`;

export default Txns;
