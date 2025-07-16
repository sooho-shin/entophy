import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAddressStore } from '../../../store/address';
import NoDataTr from '../../common/NoDataTr';
import TablePagination from '../../common/TablePagination';
import utils from '@/utils/utils';
import AgeTd from '@/component/common/AgeTd';
import { ERC1155TokenTransactionListType } from '@/types/address';
import SkeletonComponent from '@/component/common/Skeleton';
import LoadingTable from '@/component/common/LoadingTable';
import bignumberUtil from '@/utils/bignumber';

const ERC1155Txns = ({ param }: { param: string | undefined }) => {
  const { detailData } = useAddressStore((state) => state);
  if (detailData === 'nodata') return <></>;
  return (
    <>
      <InfoRow>
        {detailData ? (
          <p>
            <img src="/images/icon/ico_sort_down.svg" alt="icoSort"></img>
            <span>Latest 25 ERC-721 Token Transfer Events</span>
          </p>
        ) : (
          <SkeletonComponent maxWidth="250px" />
        )}
        {detailData ? (
          <Link to={`/tokens/transfers1155?address=${param}`}>View all</Link>
        ) : (
          <SkeletonComponent maxWidth="82px" />
        )}
      </InfoRow>
      <WhiteBox>
        {detailData ? (
          <TablePagination
            theadList={[
              { name: 'Txn Hash' },
              { name: 'Age', active: true },
              {
                name: 'From',
              },
              { name: '' },
              {
                name: 'To',
              },
              { name: 'Token ID' },
              { name: 'Value' },
              { name: 'Token' },
            ]}
          >
            {detailData && !detailData.ERC1155_token_transaction_list.length && (
              <NoDataTr colspan={8} text="nodata" />
            )}
            {detailData.ERC1155_token_transaction_list.length > 0 &&
              detailData.ERC1155_token_transaction_list.map(
                (c: ERC1155TokenTransactionListType, i: number) => {
                  return (
                    <tr key={i}>
                      <td>
                        <p>
                          {c.status !== 1 && (
                            <img
                              className="ico-danger"
                              src={utils.setIcon(c.status as number)}
                              alt="icoDanger"
                            />
                          )}
                          <span className="active address">
                            <Link to={`/tx/${c.tr_hash}`}>{c.tr_hash}</Link>
                          </span>
                        </p>
                      </td>
                      <AgeTd
                        date={c.create_date}
                        last={detailData.ERC1155_token_transaction_list.length - 1 === i}
                      />
                      <td>
                        <p>
                          <Link
                            to={
                              c.from.length === 66
                                ? `/tx/${c.from}`
                                : `/address/${c.from}`
                            }
                          >
                            <span className="address active">{c.from}</span>
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="deep  sq small">
                            {param?.toString().toLocaleLowerCase() === c.from.toString()
                              ? 'out'
                              : 'in'}
                          </span>
                        </p>
                      </td>
                      <td>
                        <p>
                          {c.to_type === 'contract' && (
                            <img
                              className="ico_file"
                              src="/images/icon/ico_file.svg"
                              alt="icoFile"
                            />
                          )}
                          <Link
                            to={c.to.length === 66 ? `/tx/${c.to}` : `/address/${c.to}`}
                          >
                            <span className="address active">{c.to}</span>
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="blk">{c.item_id}</span>
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="blk">
                            {bignumberUtil.formatNumber(c.value)}
                          </span>
                        </p>
                      </td>
                      <td>
                        <div className="token-info-group flex-center">
                          <div className="token-info long">
                            <p>
                              <Link to={`/tokens/erc1155/${c.token_address}`}>
                                <span className="token-address">
                                  {c.name || 'ERC-1155'}
                                </span>{' '}
                                {c.symbol && (
                                  <>
                                    <span>(</span>
                                    <span className="symbol">{c.symbol}</span>
                                    <span>)</span>
                                  </>
                                )}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
          </TablePagination>
        ) : (
          <LoadingTable />
        )}
      </WhiteBox>
    </>
  );
};

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  ${({ theme }) => theme.media.tablet`
      flex-direction:column;
      align-items:flex-start;
    `}
  > p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > img {
      margin-right: 4px;
    }
    span {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
      > b {
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
    }
  }
  > a {
    background: ${({ theme }) => theme.colors.primary.primary1};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.primary.primary9_bg};

    font-size: 14px;
    font-weight: 300;
    padding: 8px 16px;
    ${({ theme }) => theme.media.tablet`
      font-size:12px;
      margin-top:8px
    `}
  }
`;

const WhiteBox = styled.div`
  width: 100%;
  padding: 8px 0px;
  background: ${({ theme }) => theme.colors.gray.white};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.media.tablet`
      padding:16px
    `}
`;
export default ERC1155Txns;
