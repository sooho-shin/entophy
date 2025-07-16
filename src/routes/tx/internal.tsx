import { usePaginationStore } from '@/store/pagination';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import TitleRow from '../../component/common/TitleRow';
import Wrapper from '../../component/common/Wrapper';
import InternalTable from '../../component/tx/InternalTable';
import { useTxStore } from '../../store/tx';

const Internal = () => {
  const { fetchTxInternalData, resetAllData } = useTxStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { totalCount } = usePaginationStore((state) => state);

  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTxInternalData(currentParams);
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>Contract Internal Transactions</h1>
          </>
        </TitleRow>
      </div>
      <div className="paging-row">
        <p>
          A total of{' '}
          {totalCount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{' '}
          internal transactions found
        </p>
        <Pagination />
      </div>
      <WhiteBox>
        <InternalTable />
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
  ${({ theme }) => theme.media.tablet`
      padding:1rem;
      margin-top: 1rem;
    `}
`;

export default Internal;
