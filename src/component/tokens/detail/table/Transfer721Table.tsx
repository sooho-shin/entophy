import { useTokenStore } from '@/store/token';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Transfers721DataType } from '@/types/tokens';
import NoDataTr from '@/component/common/NoDataTr';
import AgeTd from '@/component/common/AgeTd';
import TablePagination from '@/component/common/TablePagination';
import LoadingTable from '@/component/common/LoadingTable';

const Transfer721Table = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { hash, type } = useParams();

  const { transfers721Data, fetchTransferData, resetTableData } = useTokenStore(
    (state) => state,
  );
  useEffect(() => {
    resetTableData();
    if (type && hash) {
      fetchTransferData({ type, hash, ...currentParams });
    }
  }, [type, hash, searchParams]);

  if (!transfers721Data) return <LoadingTable />;
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
        { name: 'tokenID' },
      ]}
    >
      {transfers721Data && !transfers721Data.length && (
        <NoDataTr colspan={6} text="No Data" />
      )}
      {transfers721Data &&
        transfers721Data.length > 0 &&
        transfers721Data.map((c: Transfers721DataType, i: number) => {
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
              <AgeTd date={c.create_date} last={transfers721Data.length - 1 === i} />
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
                  <span>{c.item_id}</span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default Transfer721Table;
