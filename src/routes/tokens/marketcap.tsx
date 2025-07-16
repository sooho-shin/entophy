import styled from 'styled-components';

// import AccountsTable from '../../component/address/addressTable';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import SearchRow from '../../component/common/SearchRow';
import TitleRow from '../../component/common/TitleRow';
import MarketCapTable from '../../component/tokens/MarketCapTable';

const MarketCap = () => {
  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>BEP-20 Tokens</h1>
            <p>By MarketCapitalization</p>
          </>
        </TitleRow>
      </div>
      <div className="paging-row">
        <p>
          Showing <span>383</span> Token Contracts (From a total of 2,230,342 Token
          Contracts)
        </p>
        <Pagination />
      </div>
      <WhiteBox>
        <SearchRow placeholder="Search for Token Name" />
        <MarketCapTable />
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
  justify-content: flex-start;
  flex-direction: column;
  /* margin-top: 12px; */
`;

const Wrapper = styled.div`
  padding: 40px 24px 60px 24px;
  .top-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .paging-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    padding: 8px;
    > p {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
      > span {
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
    }
  }
  .paging-row-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
    gap: 32px;
  }
`;

export default MarketCap;
