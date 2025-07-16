import { BigNumber } from 'bignumber.js';

import { useTokenStore } from '@/store/token';
import { useEffect } from 'react';
import { Transfers20DataType } from '@/types/tokens';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import NoDataTr from '@/component/common/NoDataTr';
import AgeTd from '@/component/common/AgeTd';
import TablePagination from '@/component/common/TablePagination';
import LoadingTable from '@/component/common/LoadingTable';

const Transfer20Table = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { hash, type } = useParams();

  const { detailData, transfers20Data, fetchTransferData, resetTableData } =
    useTokenStore((state) => state);
  useEffect(() => {
    resetTableData();
    if (type && hash) {
      fetchTransferData({ type, hash, ...currentParams });
    }
  }, [type, hash, searchParams]);

  if (detailData === 'nodata') return <></>;
  if (!transfers20Data) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Txn Hash' },
        {
          name: 'Method',
          tooltip: {
            name: 'Function executed based on decoded input data. For unidentified functions, method ID is displayed instead.',
          },
        },
        { name: 'Age' },
        { name: 'From' },
        { name: 'To' },
        { name: 'Quantity' },
      ]}
    >
      {transfers20Data && !transfers20Data.length && (
        <NoDataTr colspan={6} text="No Data" />
      )}
      {transfers20Data &&
        transfers20Data.length > 0 &&
        transfers20Data.map((c: Transfers20DataType, i: number) => {
          const value =
            detailData && new BigNumber(c.value).div(10 ** detailData.decimals).toFixed();
          return (
            <tr key={i}>
              <td>
                <p>
                  {/* <img className="ico-danger" src="/images/icon/ico_danger.svg" alt="icoDanger" /> */}
                  <span className="active address">
                    <Link to={`/tx/${c.tr_hash}`}>{c.tr_hash}</Link>
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span className="sub">{c.function_name}</span>
                </p>
              </td>

              <AgeTd date={c.create_date} last={transfers20Data.length - 1 === i} />
              <td>
                <p>
                  {c.from_type === 'contract' && (
                    <img
                      className="ico_file"
                      src="/images/icon/ico_file.svg"
                      alt="icoDanger"
                    />
                  )}
                  <Link
                    to={c.from.length === 66 ? `/tx/${c.from}` : `/address/${c.from}`}
                  >
                    <span className="address active">{c.from}</span>
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  {c.to_type === 'contract' && (
                    <img
                      className="ico_file"
                      src="/images/icon/ico_file.svg"
                      alt="icoDanger"
                    />
                  )}
                  <Link to={c.to.length === 66 ? `/tx/${c.to}` : `/address/${c.to}`}>
                    <span className="address active">{c.to}</span>
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  <span className="blk">
                    {Number(value).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="blk" style={{ marginLeft: '4px' }}>
                    {c.symbol}
                  </span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default Transfer20Table;
