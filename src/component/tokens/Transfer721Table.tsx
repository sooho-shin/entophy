import { useTokenStore } from '@/store/token';
import { Transfers721DataType } from '@/types/tokens';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import NoDataTr from '../common/NoDataTr';

import TablePagination from '../common/TablePagination';
import AgeTd from '@/component/common/AgeTd';
import LoadingTable from '../common/LoadingTable';

const Transfer721Table: FC = () => {
  const { transfers721Data } = useTokenStore((state) => state);

  if (!transfers721Data) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Txn Hash' },
        { name: 'Age', active: true },
        { name: 'From' },
        {
          name: 'To',
          to: true,
        },
        { name: 'Token ID' },
        { name: 'Token' },
      ]}
    >
      <>
        {!transfers721Data.length && <NoDataTr colspan={6} text="NoData" />}
        {transfers721Data.length > 0 &&
          transfers721Data.map((c: Transfers721DataType, i: number) => {
            return (
              <tr key={i}>
                <td>
                  <p>
                    <Link to={`/tx/${c.tr_hash}`}>
                      <span className="address active">{c.tr_hash}</span>
                    </Link>
                  </p>
                </td>
                <AgeTd date={c.create_date} last={transfers721Data.length - 1 === i} />
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
                    {c.to_type === 'contract' && (
                      <img
                        className="ico_file"
                        src="/images/icon/ico_file.svg"
                        alt="icoFile"
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
                <td>
                  <div className="token-info-group flex-center">
                    {/* <img src="/images/token/ico_binance.svg" alt="icoBinance" /> */}
                    <div className="token-info long">
                      <p>
                        <Link to={`/tokens/erc721/${c.token_address}`}>
                          <span className="token-address">
                            {c.name || c.token_address}
                          </span>{' '}
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
      </>
    </TablePagination>
  );
};

export default Transfer721Table;
