import Wrapper from '@/component/common/Wrapper';
import { usePaginationStore } from '@/store/pagination';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import BlocksTable from '@/component/blocks/BlocksTable';
import PageNumSelect from '@/component/common/PageNumSelect';
import Pagination from '@/component/common/Pagination';
import TitleRow from '@/component/common/TitleRow';
import { useBlockStore } from '@/store/block';
// import ErrorComponent from '@/component/error/ErrorComponent';

const Blocks = () => {
  const { data, fetchBlockData, resetAllData } = useBlockStore((state) => state);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { totalCount } = usePaginationStore((state) => state);

  useEffect(() => {
    resetAllData();
    if (searchParams) {
      fetchBlockData(currentParams);
    }
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="top-row">
        <TitleRow>
          <>
            <h1>Blocks</h1>
            <p>
              Block #{data && data.length > 0 && data[data.length - 1].block_number} to #
              {data && data.length > 0 && data[0].block_number} (Total{' '}
              {totalCount
                ? totalCount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                : undefined}{' '}
              blocks)
            </p>
          </>
        </TitleRow>
        <Pagination />
      </div>
      <WhiteBox>
        <BlocksTable />
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
  ${({ theme }) => theme.media.tablet`
     padding:16px;
  `}
`;

export default Blocks;
