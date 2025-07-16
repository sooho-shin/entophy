import { useTokenStore } from '@/store/token';
import { Transfers1155DataType } from '@/types/tokens';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import NoDataTr from '../common/NoDataTr';

import TablePagination from '../common/TablePagination';
import AgeTd from '../common/AgeTd';
import LoadingTable from '../common/LoadingTable';
import bignumberUtil from '@/utils/bignumber';

const Transfer1155Table: FC = () => {
  const { transfers1155Data } = useTokenStore((state) => state);
  if (!transfers1155Data) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Txn Hash' },
        { name: 'Age' },
        { name: 'From' },
        {
          name: 'To',
          to: true,
        },
        { name: 'Token ID' },
        { name: 'Value' },
        { name: 'Token' },
      ]}
    >
      <>
        {!transfers1155Data.length && <NoDataTr colspan={7} text="NoData" />}
        {transfers1155Data.length > 0 &&
          transfers1155Data.map((c: Transfers1155DataType, i: number) => {
            return (
              <tr key={i}>
                <td>
                  <p>
                    <Link to={`/tx/${c.tr_hash}`}>
                      <span className="address active">{c.tr_hash}</span>
                    </Link>
                  </p>
                </td>
                <AgeTd date={c.create_date} last={transfers1155Data.length - 1 === i} />
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
                  <p>
                    <span>{bignumberUtil.formatNumber(c.value)}</span>
                  </p>
                </td>
                <td>
                  <div className="token-info-group flex-center">
                    {/* <img src="/images/token/ico_binance.svg" alt="icoBinance" /> */}
                    <div className="token-info long">
                      <p>
                        {/* {c.name ?? c.token_address} {c.symbol && `(${c.symbol})`} */}
                        <Link
                          to={`/tokens/erc1155/${c.token_address}`}
                          className="active"
                        >
                          <span className="token-address">
                            {c.name ? c.name : 'ERC1155'}
                          </span>
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

export default Transfer1155Table;
