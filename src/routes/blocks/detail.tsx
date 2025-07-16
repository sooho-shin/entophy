import Wrapper from '@/component/common/Wrapper';
import ErrorComponent from '@/component/error/ErrorComponent';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Detail from '../../component/blocks/Detail';
import TitleRow from '../../component/common/TitleRow';
import { useBlockStore } from '../../store/block';

const BlocksDetail = () => {
  const { block } = useParams<'block'>();
  const { detailData, fetchBlockDetailData } = useBlockStore((state) => state);
  useEffect(() => {
    if (block) fetchBlockDetailData(block);
  }, [block]);

  if (detailData === 'nodata') return <ErrorComponent />;
  return (
    <Wrapper>
      <TitleRow>
        <h1>Block #{block}</h1>
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
    padding:16px;
  margin-top: 16px;
  `}
`;

export default BlocksDetail;
