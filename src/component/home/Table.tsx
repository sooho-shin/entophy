import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import dayjsUtil from '@/utils/dayjs';
import config from '@/config';
import bignumberUtil from '@/utils/bignumber';
import LoadingTable from '../common/LoadingTable';
import { BlockListTypes } from '@/types/blocks';
import { TxListTypes } from '@/types/tx';
// import AgeTd from '@/common/AgeTd';

interface TableProps {
  theadList: Array<string>;
  type: string;
  title: string;
  data: BlockListTypes[] | TxListTypes[] | null | undefined;
}

const Table: FC<TableProps> = ({ theadList, type, title, data }) => {
  return (
    <Wrapper>
      <h5>{title || ''}</h5>
      <div className="scroll-x">
        {data ? (
          <table>
            <thead>
              <tr>
                {theadList ? (
                  theadList.map((c, i) => {
                    return <th key={i}>{c}</th>;
                  })
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {data &&
                typeof data === 'object' &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.map((c: any) => {
                  return (
                    <tr key={type === 'block' ? c.block_number : c.hash}>
                      <td>
                        <p>
                          {type === 'block' ? (
                            <Link to={`/blocks/${c.block_number}`}>
                              <span className="active">{c.block_number}</span>
                            </Link>
                          ) : (
                            <Link to={`/tx/${c.hash}`}>
                              <span className="active hash">{c.hash}</span>
                            </Link>
                          )}
                        </p>
                        <p>
                          <span className="sub">
                            {type === 'block'
                              ? dayjsUtil.getDiffDay(c.timestamp * 1000)
                              : dayjsUtil.getDiffDay(c.create_date)}
                          </span>
                        </p>
                      </td>
                      <td>
                        <p>
                          {type === 'transactions' ? (
                            <span className="sub sm">From</span>
                          ) : (
                            <></>
                          )}

                          {type === 'block' ? (
                            <Link to={`/tx/txns?block=${c.block_number}`}>
                              <span className="active address sm">
                                {c.transaction_count + ' transactions'}
                              </span>
                            </Link>
                          ) : (
                            <Link
                              to={
                                c.from.length === 66
                                  ? `/tx/${c.from}`
                                  : `/address/${c.from}`
                              }
                            >
                              <span className="sm active address">{c.from}</span>
                            </Link>
                          )}
                        </p>
                        <p>
                          <span className="sub">
                            {type === 'transactions' ? 'To' : 'Validator'}
                          </span>

                          {type === 'transactions' ? (
                            <Link to={`/address/${c.to ? c.to : c.creates}`}>
                              <span className="active address">
                                {c.to ? c.to : c.creates}
                              </span>
                            </Link>
                          ) : (
                            <Link to={`/address/${c.miner}`}>
                              <span className="active address">{c.miner_name}</span>
                            </Link>
                          )}
                        </p>
                      </td>
                      <td>
                        <p>
                          {type === 'transactions' ? (
                            <span className="blk">
                              {bignumberUtil.formatNumber(c.value, 18) || '#'}{' '}
                              {config.TOKEN}
                            </span>
                          ) : (
                            <span className="blk">
                              {c.block_reward
                                ? bignumberUtil.formatNumber(c.block_reward, 18, 9)
                                : 0}{' '}
                              {config.TOKEN}
                            </span>
                          )}
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <LoadingTable />
        )}
      </div>

      <div className="btn-row">
        {type === 'block' ? (
          <Link to={`/blocks`}>view all</Link>
        ) : (
          <Link to={`/tx`}>view all</Link>
        )}
      </div>
    </Wrapper>
  );
};
const addedItems = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 16px;
  position: relative;

  height: 500px;
  overflow: hidden;

  > .btn-row {
    width: 100%;
    padding: 70px 0 24px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(0deg, #ffffff 40%, rgba(255, 255, 255, 0) 100%);

    > a {
      background: ${({ theme }) => theme.colors.gray.gray1};
      border-radius: 16px;
      padding: 4px 16px;
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray6};
    }
  }

  > h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray5};
  }
  > .scroll-x {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    > table {
      width: 100%;

      thead {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray1};
      }

      tbody {
        tr {
          animation: ${addedItems} 0.3s ease-in alternate;
        }
      }
      th {
        padding: 8px 16px;
        text-align: left;
        font-size: 12px;
        line-height: 1.2;
        text-transform: capitalize;
      }

      td {
        padding: 12px 16px;
        text-align: left;
        font-size: 12px;
        line-height: 1.5;
        vertical-align: middle;

        > p {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          &:first-child {
            font-size: 14px;
          }
          > a {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
          }
          span {
            white-space: nowrap;
            &.hash {
              display: inline-block;
              max-width: 130px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &.active {
              color: ${({ theme }) => theme.colors.primary.primary6};
            }
            &.sub {
              color: ${({ theme }) => theme.colors.gray.gray3};
            }
            &.blk {
              color: ${({ theme }) => theme.colors.primary.primary10};
            }
            &.address {
              display: inline-block;
              max-width: 240px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
`;

export default Table;
