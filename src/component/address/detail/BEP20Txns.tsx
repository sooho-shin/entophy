import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAddressStore } from '../../../store/address';
import bignumberUtil from '@/utils/bignumber';
import NoDataTr from '../../common/NoDataTr';
import TablePagination from '../../common/TablePagination';
import utils from '@/utils/utils';
import AgeTd from '@/component/common/AgeTd';
import { ERC20TokenTransactionListType } from '@/types/address';
import SkeletonComponent from '@/component/common/Skeleton';
import LoadingTable from '@/component/common/LoadingTable';

const BEP20Txns = ({ param }: { param: string | undefined }) => {
  const { detailData } = useAddressStore((state) => state);
  if (detailData === 'nodata') return <></>;
  return (
    <>
      <InfoRow>
        {detailData ? (
          <p>
            <img src="/images/icon/ico_sort_down.svg" alt="icoSort"></img>
            <span>Latest 25 BEP-20 Token Transfer Events</span>
          </p>
        ) : (
          <SkeletonComponent maxWidth="250px" />
        )}
        {detailData ? (
          <Link to={`/tokens/transfers20?address=${param}`}>View all</Link>
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
              { name: 'Value' },
              { name: 'Token' },
            ]}
          >
            {!detailData.ERC20_token_transaction_list.length && (
              <NoDataTr colspan={6} text="nodata" />
            )}
            {detailData.ERC20_token_transaction_list.length > 0 &&
              detailData.ERC20_token_transaction_list.map(
                (c: ERC20TokenTransactionListType, i: number) => {
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
                          <Link to={`/tx/${c.tr_hash}`}>
                            <span className="active address">{c.tr_hash}</span>
                          </Link>
                        </p>
                      </td>
                      <AgeTd
                        date={c.create_date}
                        last={detailData.ERC20_token_transaction_list.length - 1 === i}
                      />
                      <td>
                        <p>
                          <Link
                            to={
                              typeof c.from === 'string' && c.from.length === 66
                                ? `/tx/${c.from}`
                                : `/address/${c.from}`
                            }
                          >
                            <span className="active address">{c.from}</span>
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="deep sq small">
                            {param?.toString().toLocaleLowerCase() === c.from.toString()
                              ? 'out'
                              : 'in'}
                          </span>
                        </p>
                      </td>
                      <td>
                        <p>
                          <CopyToClipboard text={`${c.to}`}>
                            <img
                              className="ico_file"
                              src="/images/icon/ico_file.svg"
                              alt="icoDanger"
                            />
                          </CopyToClipboard>
                          <Link
                            to={
                              typeof c.to === 'string' && c.to.length === 66
                                ? `/tx/${c.to}`
                                : `/address/${c.to}`
                            }
                          >
                            <span className="active address">{c.to}</span>
                          </Link>
                        </p>
                      </td>
                      <td>
                        <p>
                          <span className="blk">
                            {bignumberUtil.formatNumber(c.value, c.decimals || 18)}
                          </span>
                          {/* <span className="blk" style={{ marginLeft: '4px' }}>
                          {config.TOKEN}
                        </span> */}
                        </p>
                      </td>
                      <td>
                        <div className="token-info-group flex-center">
                          <div className="token-info long">
                            <p>
                              <Link to={`/tokens/erc20/${c.token_address}`}>
                                <span className="token-address">
                                  {c.name || 'BEP-20'}
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
export default BEP20Txns;
