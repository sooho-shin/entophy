import { useEffect } from 'react';
import styled from 'styled-components';

import Wrapper from '../../component/common/Wrapper';
import BlocksTable from '../../component/home/BlocksTable';
import History from '../../component/home/History';
import Performance from '../../component/home/Performance';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QuoteBox from '../../component/home/QuoteBox';
import SearchBoxHome from '../../component/common/SearchBoxHome';
import TransactionTable from '../../component/home/TransactionTable';
import { useMainStore } from '../../store/main';

const Home = () => {
  const { fetchMainList, deactivate } = useMainStore((state) => state);

  useEffect(() => {
    fetchMainList();
    return () => {
      deactivate();
    };
  }, []);
  return (
    <Wrapper>
      <TopRow>
        <SearchBoxHome main={true} />
        {/* <QuoteBox /> */}
      </TopRow>
      <CustomWhiteBox>
        <Performance />
        <History />
      </CustomWhiteBox>
      <LastestRow>
        <WhiteBox>
          <BlocksTable />
        </WhiteBox>
        <WhiteBox>
          <TransactionTable />
        </WhiteBox>
      </LastestRow>
    </Wrapper>
  );
};

const LastestRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  > div {
    width: calc(50% - 12px);
    ${({ theme }) => theme.media.tablet`
    width:100%;
  `}
  }
  ${({ theme }) => theme.media.tablet`
    flex-direction:column;
    margin-top:16px;
    gap: 16px;
  `}
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 24px;
  margin-bottom: 40px;

  ${({ theme }) => theme.media.tablet`
    margin-bottom:24px;
  `}
`;

const WhiteBox = styled.div`
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.colors.gray.white};
  border-radius: 16px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 32px;
  ${({ theme }) => theme.media.tablet`
  align-items: center;
  flex-direction:column;
  gap: 16px;
  padding:0;
  `}
`;

const CustomWhiteBox = styled(WhiteBox)`
  ${({ theme }) => theme.media.tablet`
  background:transparent;
  `}
`;
export default Home;
