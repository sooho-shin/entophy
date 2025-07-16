import config from '@/config';
import styled from 'styled-components';

// import AccountsTable from '../../component/address/addressTable';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import TitleRow from '../../component/common/TitleRow';

const Accounts = () => {
  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>Top Accounts by {config.TOKEN} Balance</h1>
            <p>
              A total of {'>'} <span className="active">1,999,999 accounts found</span>{' '}
              (22,593,368.77 BNB)
            </p>
          </>
        </TitleRow>
      </div>
      <div className="paging-row">
        <p>A total of 21 internal transactions found</p>
        <Pagination />
      </div>
      <WhiteBox>{/* <AccountsTable /> */}</WhiteBox>
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

export default Accounts;
