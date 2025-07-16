import { useTokenStore } from '@/store/token';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import TitleRow from '../../component/common/TitleRow';
import Transfer721Table from '../../component/tokens/Transfer721Table';
import bignumberUtil from '@/utils/bignumber';
import { usePaginationStore } from '@/store/pagination';
import Wrapper from '@/component/common/Wrapper';

const Transfer721: FC = () => {
  const { fetchTransferData, resetAllData } = useTokenStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { realTotalCount } = usePaginationStore((state) => state);

  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTransferData({ type: 'erc721', ...currentParams });
    }
  }, [searchParams]);
  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>ERC-721 Token Transfers</h1>
            <p>Non Fungible Tokens</p>
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
        <Transfer721Table />
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

export default Transfer721;
