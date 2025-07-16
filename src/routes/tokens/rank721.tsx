import Wrapper from '@/component/common/Wrapper';
import Rank721Table from '@/component/tokens/Rank721Table';
import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import SearchRow from '../../component/common/SearchRow';
import TitleRow from '../../component/common/TitleRow';

const Rank721: FC = () => {
  const { fetchTokenData, resetAllData } = useTokenStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { totalCount } = usePaginationStore((state) => state);
  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTokenData({ type: 'erc721', ...currentParams });
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>ERC-721 Tokens</h1>
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
          ERC-721 Token Contracts found
        </p>
        <Pagination />
      </div>
      <WhiteBox>
        <CheckboxRow>
          <SearchRow placeholder="Search for Token Name or Address" />
          {/* <Checkbox state={state} setState={setState} text="Hide $0.00 assets" /> */}
        </CheckboxRow>
        <Rank721Table />
      </WhiteBox>
      <div className="paging-row-bottom">
        <PageNumSelect />
        <Pagination />
      </div>
    </Wrapper>
  );
};

const CheckboxRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

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

export default Rank721;
