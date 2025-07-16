import Wrapper from '@/component/common/Wrapper';
import ErrorComponent from '@/component/error/ErrorComponent';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import TitleRow from '@/component/common/TitleRow';
import Detail from '@/component/tx/Detail';
import { useTxStore } from '@/store/tx';

const TransactionDetail = () => {
  const { detailData, fetchTxDetailData, resetAllData } = useTxStore((state) => state);
  const { txid } = useParams<'txid'>();

  useEffect(() => {
    resetAllData();
    if (txid) fetchTxDetailData(txid);
  }, [txid]);
  if (detailData === 'nodata') return <ErrorComponent />;
  return (
    <Wrapper>
      <TitleRow>
        <h1>Transactions Details</h1>
      </TitleRow>
      <WhiteBox>
        <Detail />
      </WhiteBox>
    </Wrapper>
  );
};

// const Wrapper = styled.div`
//   padding: 40px 24px 60px 24px;
// `;

const WhiteBox = styled.div`
  width: 100%;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.gray.white};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  ${({ theme }) => theme.media.tablet`
      padding:1rem;
      margin-top: 1rem;
    `}
`;

export default TransactionDetail;
