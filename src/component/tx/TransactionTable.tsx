import config from '@/config';
import { TxDataTypes } from '@/types/tx';
import utils from '@/utils/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTxStore } from '../../store/tx';
import NoDataTr from '../common/NoDataTr';
import TablePagination from '../common/TablePagination';
import bignumberUtil from '@/utils/bignumber';
import AgeTd from '../common/AgeTd';
import LoadingTable from '../common/LoadingTable';

const TransactionTable: FC = () => {
  const { txData } = useTxStore((state) => state);

  // const [hover, setHover] = useState(0);
  const theadList = [
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
    { name: 'To', to: true },
    { name: 'Value' },
    { name: 'Txn Fee' },
  ];

  if (!txData) return <LoadingTable />;
  if (txData && !txData.length)
    return <NoDataTr colspan={theadList.length} text="NoData" />;
  return (
    <TablePagination theadList={theadList}>
      {txData && !txData.length && (
        <NoDataTr colspan={theadList.length} text="There are no matching entries" />
      )}
      {txData &&
        txData.map((c: TxDataTypes, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>
                  {c.status !== 1 && <img src={utils.setIcon(c.status)} alt="icon"></img>}
                  <span className="active address">
                    <Link to={`/tx/${c.hash}`}>{c.hash}</Link>
                  </span>
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
              <AgeTd date={c.create_date} last={txData.length - 1 === i} />
              <td>
                <p>
                  {c.from_type === 'contract' && (
                    <img
                      className="ico_file"
                      src="/images/icon/ico_file.svg"
                      alt="icoFile"
                    />
                  )}

                  <Link
                    to={c.from.length === 66 ? `/tx/${c.from}` : `/address/${c.from}`}
                  >
                    <span className="address active">{c.from}</span>
                  </Link>
                </p>
              </td>
              <td className="to">
                <p>
                  <img
                    className="ico-arrow-circle"
                    src="/images/icon/ico_arrow_circle.svg"
                    alt="icoArrowCircle"
                  />
                  {(c.to_type === 'contract' || !c.to) && (
                    <img
                      className="ico_file"
                      src="/images/icon/ico_file.svg"
                      alt="icoFile"
                    />
                  )}
                  {c.to ? (
                    <Link to={c.from.length === 66 ? `/tx/${c.to}` : `/address/${c.to}`}>
                      <span className="address active">{c.to}</span>
                    </Link>
                  ) : (
                    <Link to={`/address/${c.creates}`}>
                      {' '}
                      <span className="address active">Contract Creation</span>
                    </Link>
                  )}
                </p>
              </td>
              <td>
                <p>
                  <span className="blk" style={{ marginRight: '4px' }}>
                    {Number(c.value) === 0
                      ? '#'
                      : bignumberUtil.formatNumber(c.value, 18)}
                  </span>
                  <span className="blk">{config.TOKEN}</span>
                </p>
              </td>
              <td>
                <p>
                  <span className="blk">{c.transaction_fee}</span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default TransactionTable;
