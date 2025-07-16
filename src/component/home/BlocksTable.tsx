import styled from 'styled-components';

import { useMainStore } from '../../store/main';
import Table from './Table';

const BlocksTable = () => {
  const { blockList } = useMainStore((state) => state);

  return (
    <TableWrapper>
      <Table
        theadList={['Block', 'Details', 'Reward']}
        type="block"
        title="Latest Blocks"
        data={blockList && blockList}
      />
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.media.tablet`
    padding: 16px;
    ${'background:' + theme.colors.gray.white};
    border-radius: 16px;
    gap:0;
  `}
`;
export default BlocksTable;
