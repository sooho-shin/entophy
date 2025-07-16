import { InternalTransactionListType } from '../../../types/tx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useTxStore } from '../../../store/tx';
import NoDataTr from '../../common/NoDataTr';
import TablePagination from '../../common/TablePagination';
import LoadingTable from '@/component/common/LoadingTable';
import config from '@/config';
import bignumberUtil from '@/utils/bignumber';

const Internal: FC = () => {
  const { detailData } = useTxStore((state) => state);

  // {!detailData  <LoadingTable type="short" />}
  if (detailData === 'nodata') return <></>;
  if (!detailData) return <LoadingTable type="short" />;
  return (
    <InternalWrapper>
      {detailData.internal_transaction_list.length === 1 &&
      (detailData.internal_transaction_list[0].type === 'CREATE' ||
        detailData.internal_transaction_list[0].type === 'CREATE2') ? (
        <p>
          <span>Contract creation by </span>
          <Link to={`/address/${detailData.from}`}>
            <span className="address">{detailData.from}</span>
          </Link>
          <span>created New Contract which produced</span>
          <Link to={`/address/${detailData.to}`}>
            <span className="address">{detailData.to}</span>
          </Link>
          <span>contract internal Transaction</span>
        </p>
      ) : (
        <p>
          <span>The Contract call From </span>
          <Link to={`/address/${detailData.from}`}>
            <span className="address active">{detailData.from}</span>
          </Link>
          <span>To</span>
          <Link to={`/address/${detailData.to}`}>
            <span className="address active">{detailData.to}</span>
          </Link>
          <span>
            produced {detailData.internal_transaction_list.length} internal Transactions
          </span>
        </p>
      )}

      {/* <p>
        <span>Contract call</span>
        <span className="blk">From</span>
        <span className="address">{detailData && detailData.from}</span>
        <span className="blk">To</span>
        <span className="address">{detailData && detailData.to}</span>
        <span>produced</span>
        <span className="blk">
          {detailData && detailData.internal_transaction_list.length}
        </span>
        <span>internal transactions</span>
      </p> */}

      <TablePagination
        theadList={[
          { name: 'Type' },
          { name: 'From' },
          { name: 'To', to: true },
          { name: 'Value' },
        ]}
        type="detail"
      >
        {!detailData.internal_transaction_list.length && (
          <NoDataTr colspan={4} text="No Data" />
        )}
        {detailData.internal_transaction_list.length > 0 &&
          detailData.internal_transaction_list.map(
            (c: InternalTransactionListType, i: number) => {
              return (
                <tr key={i}>
                  <td>
                    <p>
                      <span>{c.type}</span>
                    </p>
                  </td>
                  <td>
                    <p>
                      <Link
                        to={c.from.length === 66 ? `/tx/${c.from}` : `/address/${c.from}`}
                      >
                        <span className="address active">{c.from}</span>
                      </Link>
                    </p>
                  </td>
                  <td className="to">
                    <p>
                      {/* <img
                        className="ico-arrow-circle"
                        src="/images/icon/ico_arrow_circle.svg"
                        alt="icoArrowCircle"
                      /> */}
                      <Link to={c.to.length === 66 ? `/tx/${c.to}` : `/address/${c.to}`}>
                        <img
                          className="ico-internal"
                          src="/images/icon/ico_internal.svg"
                          alt="icoInternal"
                        />
                        <span className="address active">{c.to}</span>
                      </Link>
                    </p>
                  </td>
                  <td>
                    <p>
                      <span>
                        {bignumberUtil.formatNumber(c.value, 18)} {config.TOKEN}
                      </span>
                    </p>
                  </td>
                </tr>
              );
            },
          )}
      </TablePagination>
    </InternalWrapper>
  );
};

const InternalWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > p {
    width: 100%;
    text-align: left;
    padding-left: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    margin-bottom: 12px;
    span {
      font-size: 12px;
      line-height: 14px;
      color: ${({ theme }) => theme.colors.gray.gray3};
      &.blk {
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
      &.active {
        color: ${({ theme }) => theme.colors.primary.primary6};
      }
      &.address {
        display: block;
        width: 156px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export default Internal;
