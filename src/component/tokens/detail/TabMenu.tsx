import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import TabRow from '../../common/TabRow';

// type TabProps = {
//   type?: string;
// };

export const TabMenu = ({ load }: { load: boolean }) => {
  const { type } = useParams();
  const tabList = ['Transfers', 'Holders'];
  return (
    <Wrapper>
      {!load && type === 'erc20' && <TabRow tabList={tabList} />}
      {!load && type === 'erc721' && <TabRow tabList={[...tabList, 'Inventory']} />}
      {!load && type === 'erc1155' && <TabRow tabList={['Transfers', 'Inventory']} />}
      {load && <TabRow tabList={[]} load={true} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
