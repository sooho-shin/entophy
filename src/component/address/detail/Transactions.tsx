import { TransactionListType } from '@/types/address';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import config from '../../../config';
import { useAddressStore } from '../../../store/address';
import NoDataTr from '../../common/NoDataTr';
import TablePagination from '../../common/TablePagination';
import utils from '@/utils/utils';
import bignumberUtil from '@/utils/bignumber';
import SkeletonComponent from '@/component/common/Skeleton';
import LoadingTable from '@/component/common/LoadingTable';
import AgeTd from '@/component/common/AgeTd';

const Transactions = ({ param }: { param: string | undefined }) => {
  const [filterState] = useState<boolean>(false);
  const { detailData } = useAddressStore((state) => state);
  if (detailData === 'nodata') return <></>;
  // useEffect(() => {
  //   console.log(detailData);
  //   console.log(param);
  // }, []);
  return (
    <>
      <InfoRow filterState={filterState}>
        {detailData ? (
          <>
            <p>
              <img src="/images/icon/ico_sort_down.svg" alt="icoSort"></img>
              <span>Latest 25 from a total transactions</span>
            </p>
            <Link to={`/tx/txns?address=${param}`}>View all</Link>
          </>
        ) : (
          <>
            <SkeletonComponent maxWidth="220px" />
            <SkeletonComponent maxWidth="80px" height="30px" />
          </>
        )}
        {/* <p>
          <img src="/images/icon/ico_sort_down.svg" alt="icoSort"></img>
          <span>
            Latest 25 from a total of <b>{detailData?.total_transaction_count}</b>{' '}
            transactions
          </span>
        </p> */}
      </InfoRow>
      <WhiteBox>
        {detailData ? (
          <TablePagination
            theadList={[
              { name: 'Txn Hash' },
              {
                name: 'Method',
                tooltip: {
                  name: 'Function executed based on decoded input data. For unidentified functions, method ID is displayed instead.',
                },
              },
              { name: 'Block' },
              { name: 'Age' },
              { name: 'From' },
              { name: '' },
              { name: 'To' },
              { name: 'Value' },
              // { name: 'Txn Fee' },
            ]}
          >
            {detailData && !detailData.transaction_list.length && (
              <NoDataTr colspan={8} text="nodata" />
            )}

            {detailData &&
              detailData.transaction_list.length > 0 &&
              detailData.transaction_list.map((c: TransactionListType, i: number) => {
                return (
                  <tr key={i}>
                    <td>
                      <p>
                        {c.status !== 1 && (
                          <img
                            className="ico-danger"
                            src={utils.setIcon(c.status)}
                            alt="icon"
                          />
                        )}

                        <Link to={`/tx/${c.hash}`}>
                          <span className="active address">{c.hash}</span>
                        </Link>
                      </p>
                    </td>
                    <td>
                      <p>
                        <span className="deep sq small method">{c.data}</span>
                      </p>
                    </td>
                    <td>
                      <p>
                        <Link to={`/blocks/${c.block_number}`}>
                          <span className="active">{c.block_number}</span>
                        </Link>
                      </p>
                    </td>
                    <AgeTd
                      date={c.create_date}
                      last={detailData.transaction_list.length - 1 === i}
                    />
                    <td>
                      <p>
                        <span className="active address">
                          <Link
                            to={
                              typeof c.from === 'string' && c.from.length === 66
                                ? `/tx/${c.from}`
                                : `/address/${c.from}`
                            }
                          >
                            {c.from}
                          </Link>
                        </span>
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
                        {(c.to_type === 'contract' || !c.to) && (
                          <img
                            className="ico_file"
                            src="/images/icon/ico_file.svg"
                            alt="icoFile"
                          />
                        )}
                        {c.to ? (
                          <Link
                            to={c.from.length === 66 ? `/tx/${c.to}` : `/address/${c.to}`}
                          >
                            <span className="address active">{c.to}</span>
                          </Link>
                        ) : (
                          <span className="address active">Contract Creation</span>
                        )}
                      </p>
                    </td>
                    <td>
                      <p>
                        <span className="blk">
                          {bignumberUtil.formatNumber(c.value, 18)}
                        </span>
                        <span className="blk" style={{ marginLeft: '4px' }}>
                          {config.TOKEN}
                        </span>
                      </p>
                    </td>
                  </tr>
                );
              })}
          </TablePagination>
        ) : (
          <LoadingTable />
        )}
      </WhiteBox>
    </>
  );
};

interface InfoRowProps {
  filterState: boolean;
}
const InfoRow = styled.div<InfoRowProps>`
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
  .select-box {
    width: 202px;
    position: relative;
    > .selected-row {
      width: 100%;
      height: 32px;
      padding: 0 12px;
      padding-right: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: ${({ theme }) => theme.colors.gray.white};
      border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
      box-sizing: border-box;
      border-radius: 8px;
      ${(props) =>
        props.filterState &&
        css`
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          border-bottom: none;
        `}
      > span {
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
    }
    > .dropdown-box {
      width: 100%;
      position: absolute;
      left: 0;
      top: 100%;
      background: ${({ theme }) => theme.colors.gray.white};
      border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px;
      z-index: 100;
      padding-top: 0;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-top: none;
      > p {
        padding: 4px;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray3};
        background: ${({ theme }) => theme.colors.primary.primary1};
        border-radius: 4px;
      }
    }
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
export default Transactions;
