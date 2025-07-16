import { useTokenStore } from '@/store/token';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import NoDataTr from '../common/NoDataTr';

import TablePagination from '../common/TablePagination';
import { Transfers20DataType } from '@/types/tokens';
import bignumberUtil from '@/utils/bignumber';
import AgeTd from '../common/AgeTd';
import LoadingTable from '../common/LoadingTable';

const Transfer20Table: FC = () => {
  const { transfers20Data } = useTokenStore((state) => state);

  if (!transfers20Data) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Txn Hash' },
        { name: 'Age', active: true },
        { name: 'From' },
        { name: 'To', to: true },
        { name: 'Value' },
        { name: 'Token' },
      ]}
    >
      {!transfers20Data.length && <NoDataTr colspan={6} text="NoData" />}
      {transfers20Data.length > 0 &&
        transfers20Data.map((c: Transfers20DataType, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>
                  <Link to={`/tx/${c.tr_hash}`}>
                    <span className="active address">{c.tr_hash}</span>
                  </Link>
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
                    {c.value && bignumberUtil.formatNumber(c.value, 18)}
                    {/* {c.symbol ? c.symbol : ''} */}
                  </span>
                </p>
              </td>
              <td>
                <div className="token-info-group flex-center">
                  {/* <img src="/images/token/ico_binance.svg" alt="icoBinance" /> */}
                  <div className="token-info long">
                    <p>
                      <Link to={`/tokens/erc20/${c.token_address}`}>
                        <span className="token-address">{c.name || c.token_address}</span>{' '}
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
        })}
    </TablePagination>
  );
};

export default Transfer20Table;
