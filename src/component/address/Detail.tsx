import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import BEP20Txns from './detail/BEP20Txns';
import ERC721Txns from './detail/ERC721Txns';
import ERC1155Txns from './detail/ERC1155Txns';
import InternalTxns from './detail/InternalTxns';
import Transactions from './detail/Transactions';
import TabRow from '../common/TabRow';
import { useAddressStore } from '../../store/address';

const Detail = () => {
  const { detailData } = useAddressStore((state) => state);
  if (detailData === 'nodata') return <></>;
  const [tabList, setTabList] = useState<Array<string>>([]);
  const [tabState, setTabState] = useState<string | null>();
  const list = useMemo(
    () => [
      { Transactions: detailData?.transaction_list },
      { 'Internal Txns': detailData?.internal_transaction_list },
      { 'BEP-20 Token Txns': detailData?.ERC20_token_transaction_list },
      { 'ERC-721 Token Txns': detailData?.ERC721_token_transaction_list },
      { 'ERC-1155 Token Txns': detailData?.ERC1155_token_transaction_list },
    ],
    [detailData],
  );

  const [searchParams] = useSearchParams();
  // const [tab] = useState<string | null>();
  const tabParam = searchParams.get('tab');
  const { address } = useParams<string>();

  useEffect(() => {
    const filteredList = Object.values(list)
      .filter((v) => Object.values(v)[0]?.length !== 0)
      .map((t) => Object.keys(t)[0]);

    setTabList(filteredList);
    setTabState(filteredList[0]);
  }, [detailData]);

  useEffect(() => {
    tabParam && setTabState(tabParam);
  }, [detailData, tabParam]);

  return (
    <Wrapper>
      <TabRow tabList={tabList} load={detailData ? false : true} address={true} />
      {tabState === 'Transactions' && <Transactions param={address} />}
      {tabState === 'Internal Txns' && <InternalTxns param={address} />}
      {tabState === 'BEP-20 Token Txns' && <BEP20Txns param={address} />}
      {tabState === 'ERC-721 Token Txns' && <ERC721Txns param={address} />}
      {tabState === 'ERC-1155 Token Txns' && <ERC1155Txns param={address} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.white};
  padding: 8px 24px;
  margin-top: 40px;
  border-radius: 16px;
`;

export default Detail;
