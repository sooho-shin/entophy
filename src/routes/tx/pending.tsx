import Wrapper from '@/component/common/Wrapper';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchBox from '../../component/common/SearchBox';
import TitleRow from '../../component/common/TitleRow';
import PendingTable from '../../component/tx/PendingTable';
import { useTxStore } from '../../store/tx';

const Pending = () => {
  const [searchBoxview, setSearchBoxview] = useState(false);
  const { fetchTxPendingData, resetAllData } = useTxStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchTxPendingData(currentParams);
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row" style={{ marginBottom: '24px' }}>
        <TitleRow>
          <>
            <h1>Pending Transactions</h1>
          </>
        </TitleRow>
      </div>
      <div className="search-row">
        {/* <button type="button" onClick={() => setSearchBoxview(!searchBoxview)}>
          Q
        </button> */}
        {searchBoxview && (
          <CustomSearchBox
            placeholder="Txn Hash"
            submitBtnText="Search"
            callback={() => setSearchBoxview(false)}
          />
        )}
      </div>
      <WhiteBox>
        <PendingTable />
      </WhiteBox>
    </Wrapper>
  );
};

const CustomSearchBox = styled(SearchBox)`
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 100;
  > .fixed {
    position: relative;
  }
`;

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

export default Pending;
