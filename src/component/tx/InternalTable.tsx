import { TxInternalDataTypes } from '@/types/tx';
import bignumberUtil from '@/utils/bignumber';
import { FC, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useTxStore } from '../../store/tx';
import AgeTd from '../common/AgeTd';
import LoadingTable from '../common/LoadingTable';
import NoDataTr from '../common/NoDataTr';
import TablePagination from '../common/TablePagination';

const InternalTable: FC = () => {
  const { txInternalData } = useTxStore((state) => state);
  const blocks = useRef<string>();

  // ( 0 _0)bbb
  const setBlockNumber = useCallback(
    (n: string, i: number) => {
      let target = blocks.current;
      const template = (
        <Link to={`/blocks/${n}`}>
          <span className="active">{n}</span>
        </Link>
      );
      if (i === 0) {
        target = '';
      }
      if (target !== n) {
        blocks.current = n;
        return template;
      }
    },
    [blocks],
  );
  if (!txInternalData) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Block' },
        { name: 'Age' },
        { name: 'Parent Txn Hash' },
        { name: 'Type' },
        { name: 'From' },
        { name: 'To', to: true },
        { name: 'Value' },
      ]}
    >
      {txInternalData && !txInternalData.length && (
        <NoDataTr colspan={7} text="There are no matching entries" />
      )}
      {txInternalData &&
        txInternalData.length > 0 &&
        txInternalData.map((c: TxInternalDataTypes, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>{setBlockNumber(c.block_number, i)}</p>
              </td>
              <AgeTd date={c.create_date} last={txInternalData.length - 1 === i} />
              <td>
                <p>
                  {c.status === null && (
                    <img
                      className="ico-ico_warn"
                      src="/images/icon/ico_warn.svg"
                      alt="icoWarn"
                    />
                  )}
                  {c.status === 0 && (
                    <img
                      className="ico-danger"
                      src="/images/icon/ico_danger.svg"
                      alt="icoDanger"
                    />
                  )}
                  {c.status === 1 && (
                    <img
                      className="ico-success"
                      src="/images/icon/ico_success.svg"
                      alt="icoSuccess"
                    />
                  )}
                  {c.status === 2 && (
                    <img
                      className="ico-ico_warn"
                      src="/images/icon/ico_warn.svg"
                      alt="icoWarn"
                    />
                  )}

                  <Link to={`/tx/${c.tr_hash}`}>
                    <span className="active address">{c.tr_hash}</span>
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  <span>{c.type}</span>
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

                  {c.to_type === 'contract' && (
                    <img
                      className="ico_file"
                      src="/images/icon/ico_file.svg"
                      alt="icoDanger"
                    />
                  )}

                  <Link to={`/address/${c.to}`}>
                    <span className="active address">{c.to}</span>
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
        })}
    </TablePagination>
  );
};

export default InternalTable;
