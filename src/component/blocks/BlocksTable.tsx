import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useBlockStore } from '../../store/block';
import NoDataTr from '../common/NoDataTr';
import TablePagination from '../common/TablePagination';
import { BlockDataTypes } from '@/types/blocks';
import AgeTd from '../common/AgeTd';
import LoadingTable from '../common/LoadingTable';
import config from '@/config';
import bignumberUtil from '@/utils/bignumber';

const BlocksTable: FC = () => {
  const { data } = useBlockStore((state) => state);

  if (!data) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Block' },
        { name: 'Age' },
        { name: 'Txn' },
        { name: 'Validator' },
        { name: 'Gas Used' },
        { name: 'Gas Limit' },
        { name: 'Reward' },
        // { name: 'Fees Burnt' },
      ]}
    >
      {data && !data.length && <NoDataTr colspan={7} text="NoData" />}
      {data &&
        data.map((c: BlockDataTypes, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>
                  <Link to={`${c.block_number}`}>
                    <span className="active">{c.block_number}</span>
                  </Link>
                </p>
              </td>
              <AgeTd date={Number(c.timestamp) * 1000} last={data.length - 1 === i} />
              <td>
                <p>
                  <Link
                    to={`/tx/txns?block=${c?.block_number}`}
                    className={c.transaction_count ? 'active' : 'disabled'}
                  >
                    {c.transaction_count}
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  <Link to={`/address/${c.miner}`}>
                    <span className="active">{c.miner_name}</span>
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  <span className="deep">
                    {c.gas_used &&
                      Number(c.gas_used).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                  </span>
                  {/* <span className="sub small margin"> (42%)</span> */}
                </p>
                {/* <div className="progress-bar">
                  <div style={{ width: `${42}%` }}></div>
                </div> */}
              </td>
              <td>
                <p>
                  <span>
                    {c.gas_limit &&
                      Number(c.gas_limit).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span>
                    {c.block_reward
                      ? bignumberUtil.formatNumber(c.block_reward, 18, 9)
                      : 0}{' '}
                    {config.TOKEN}
                  </span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default BlocksTable;
