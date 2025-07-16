import styled from 'styled-components';

import { useMainStore } from '../../store/main';
import Table from './Table';

const TransactionTable = () => {
  const { transactionList } = useMainStore((state) => state);

  return (
    <TableWrapper>
      <Table
        theadList={['Txn Hash', 'Details', 'Value']}
        type="transactions"
        title="Latest Transactions"
        data={transactionList && transactionList}
      />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.media.tablet`
    padding: 16px;
    border-radius: 16px;
    gap:0;
    ${'background: ' + theme.colors.gray.white};
  `}
  .sm {
    font-size: 12px;
  }
`;
export default TransactionTable;
