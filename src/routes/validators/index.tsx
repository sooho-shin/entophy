import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PageNumSelect from '../../component/common/PageNumSelect';
import Pagination from '../../component/common/Pagination';
import TitleRow from '../../component/common/TitleRow';
import LeaderboardTable from '../../component/validators/LeaderboardTable';

const LeaderBoard = () => {
  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>Validators Top Leaderboard (Blocks Validated)</h1>
            <p>Showing 1 to 25 of validators found</p>
          </>
        </TitleRow>
        <Pagination />
      </div>
      <WhiteBox>
        <LeaderboardTable />
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
`;

const Wrapper = styled.div`
  padding: 40px 24px 60px 24px;
  .top-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .paging-row-bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
    gap: 32px;
  }
`;

export default LeaderBoard;
