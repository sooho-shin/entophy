import { FC } from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
import { useTxStore } from '../../store/tx';
import NoDataTr from '../common/NoDataTr';
import TablePagination from '../common/TablePagination';
import { TxPendingDataTypes } from '@/types/tx';
import bignumberUtil from '@/utils/bignumber';
import AgeTd from '../common/AgeTd';
import LoadingTable from '../common/LoadingTable';

const PendingTable: FC = () => {
  const { txPendingData } = useTxStore((state) => state);
  if (!txPendingData) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Txn Hash' },
        { name: 'Nonce' },
        { name: 'Age' },
        { name: 'Gas Limit' },
        { name: 'Gas Price' },
        { name: 'From' },
        { name: 'To', to: true },
        { name: 'Value' },
      ]}
    >
      {txPendingData && !txPendingData.length && (
        <NoDataTr colspan={8} text="There are no matching entries" />
      )}
      {txPendingData &&
        txPendingData.map((c: TxPendingDataTypes, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>
                  <img
                    className="ico-ico_warn"
                    src="/images/icon/ico_warn.svg"
                    alt="icoWarn"
                  />
                  <span className="active address">
                    <Link to={`/tx/${c.tx_hash}`}>{c.tx_hash}</Link>
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span className="active">{c.nonce}</span>
                </p>
              </td>
              <AgeTd date={c.create_date} last={txPendingData.length - 1 === i} />
              <td>
                <p>
                  <span className="sub">{c.gas_limit}</span>
                </p>
              </td>
              <td>
                <p>
                  <span className="sub">
                    {bignumberUtil.formatNumber(c.gas_price)} Gwei
                  </span>
                </p>
              </td>
              <td>
                <p>
                  {c.from_type === 'contract' && (
                    <img
                      className="ico_file"
                      src="/images/icon/ico_file.svg"
                      alt="icoDanger"
                    />
                  )}
                  <Link to={`/address/${c.from}`}>
                    <span className="active address">{c.from}</span>
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
                  <Link to={`/address/${c.to}`} className={c.to ? '' : 'disabled'}>
                    <span className={c.to ? 'active address' : ''}>
                      {c.to ? c.to : 'Contract Creation'}
                    </span>
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  <span className="blk">{bignumberUtil.formatNumber(c.value)}</span>
                  <span className="blk mg-l">{config.TOKEN}</span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default PendingTable;
