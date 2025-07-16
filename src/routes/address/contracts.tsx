import React, { FC } from 'react';
import styled from 'styled-components';

import ContractsTable from '../../component/address/ContractsTable';
import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import SearchRow from '../../component/common/SearchRow';
import TitleRow from '../../component/common/TitleRow';

const Contracts: FC = () => {
  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>Contracts</h1>
            <p>With veryfied source codes only</p>
          </>
        </TitleRow>
      </div>
      <div className="paging-row">
        <p>Showing the last 500 verified contracts source code </p>
        <Pagination />
      </div>
      <WhiteBox>
        <SearchRow placeholder="Search for Token Name" />
        <ContractsTable />
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

export default Contracts;
