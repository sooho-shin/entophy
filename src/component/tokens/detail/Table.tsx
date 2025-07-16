import styled from 'styled-components';
import { useParams } from 'react-router';
import { useTokenStore } from '@/store/token';
import Pagination from '@/component/common/Pagination';
import HolderTable from './table/HolderTable';
import InventoryTable from './table/InventoryTable';
import Transfer20Table from './table/Transfer20Table';
import Transfer721Table from './table/Transfer721Table';
import Transfer1155Table from './table/Transfer1155Table';
import { useSearchParams } from 'react-router-dom';
import { usePaginationStore } from '@/store/pagination';
import bignumberUtil from '@/utils/bignumber';

export const Table = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as string;
  const { realTotalCount } = usePaginationStore((state) => state);
  const { detailData } = useTokenStore((state) => state);

  return (
    <>
      <Topper>
        {tabParam === 'Holders' ? (
          <p>{`Top 1,000 holders (From a total of ${bignumberUtil.formatNumber(
            realTotalCount.toString(),
          )} holders)`}</p>
        ) : (
          <p>{`A total of ${bignumberUtil.formatNumber(realTotalCount.toString())} ${
            tabParam === 'Inventory' ? 'tokens found' : 'transactions found'
          }`}</p>
        )}
        <Pagination />
      </Topper>
      {detailData && (
        <>
          {(!tabParam || tabParam === 'Transfers') && type === 'erc20' && (
            <Transfer20Table />
          )}
          {(!tabParam || tabParam === 'Transfers') && type === 'erc721' && (
            <Transfer721Table />
          )}
          {(!tabParam || tabParam === 'Transfers') && type === 'erc1155' && (
            <Transfer1155Table />
          )}
          {tabParam === 'Holders' && <HolderTable />}
          {tabParam === 'Inventory' && <InventoryTable />}
        </>
      )}
    </>
  );
};

const Topper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 8px;
  margin-bottom: 1.5rem;
  ${({ theme }) => theme.media.tablet`
    flex-direction:column;
    align-items:flex-start;
    padding:0;
    margin-bottom:1rem;
    height:auto
  `}
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: ${({ theme }) => theme.colors.gray.gray3};
    ${({ theme }) => theme.media.tablet`
      margin-bottom:1rem
    `}
  }
`;
