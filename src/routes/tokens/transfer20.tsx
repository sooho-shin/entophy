import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageNumSelect from '@/component/common/PageNumSelect';
import Pagination from '@/component/common/Pagination';
import TitleRow from '@/component/common/TitleRow';
import Transfer20Table from '@/component/tokens/Transfer20Table';
import bignumberUtil from '@/utils/bignumber';
import Wrapper from '@/component/common/Wrapper';

const Transfer20: FC = () => {
  const { fetchTransferData, resetAllData } = useTokenStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { realTotalCount } = usePaginationStore((state) => state);

  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTransferData({ type: 'erc20', ...currentParams });
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>BEP-20 Token Transfers</h1>
            <p>By On-Chain Volume (Overall)</p>
          </>
        </TitleRow>
      </div>
      <div className="paging-row">
        <p>
          A total of{' '}
          {realTotalCount > 1000000
            ? '> 10 M txns found'
            : bignumberUtil.formatNumber(realTotalCount.toString())}{' '}
          (Showing the last 10,000 records only)
        </p>
        <Pagination />
      </div>
      <WhiteBox>
        {/* <CheckboxRow>
          <SearchRow placeholder="Filter Adderss / Txn Hash / Token ID" />
          <Checkbox state={state} setState={setState} />
        </CheckboxRow> */}
        <Transfer20Table />
      </WhiteBox>
      <div className="paging-row-bottom">
        <PageNumSelect />
        <Pagination />
      </div>
    </Wrapper>
  );
};

// const CheckboxRow = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
// `;

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

export default Transfer20;
