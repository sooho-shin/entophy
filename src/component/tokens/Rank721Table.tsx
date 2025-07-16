import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import { DataTypes } from '@/types/tokens';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingTable from '../common/LoadingTable';
import NoDataTr from '../common/NoDataTr';

import TablePagination from '../common/TablePagination';

const Rank721Table: FC = () => {
  const { tokenData } = useTokenStore((state) => state);
  const { limit, page } = usePaginationStore((state) => state);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const [order24State, setOrder24State] = useState<string | null>(
    searchParams.get('sort') === '24h' ? searchParams.get('order') : null,
  );
  const [order48State, setOrder48State] = useState<string | null>(
    searchParams.get('sort') === '48h' ? searchParams.get('order') : null,
  );

  const sort24Handling = useCallback(() => {
    setOrder48State(null);
    if (order24State === 'desc' || !order24State) {
      setOrder24State('asc');
    } else {
      setOrder24State('desc');
    }
  }, [order24State]);

  const sort48Handling = useCallback(() => {
    setOrder24State(null);
    if (order48State === 'desc' || !order48State) {
      setOrder48State('asc');
    } else {
      setOrder48State('desc');
    }
  }, [order48State]);

  useEffect(() => {
    if (order24State) {
      setSearchParams({ ...currentParams, sort: '24h', order: order24State });
    }
  }, [order24State]);

  useEffect(() => {
    if (order48State) {
      setSearchParams({ ...currentParams, sort: '48h', order: order48State });
    }
  }, [order48State]);
  if (!tokenData) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Rank' },
        { name: 'Token' },
        {
          name: 'Transfers(24)',
          sort: true,
          order: order24State,
          callback: () => sort24Handling(),
        },
        {
          name: 'Transfers(2D)',
          sort: true,
          order: order48State,
          callback: () => sort48Handling(),
        },
      ]}
    >
      {!tokenData.length && <NoDataTr colspan={4} text="No Data" />}
      {tokenData.length > 0 &&
        tokenData.map((c: DataTypes, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>
                  <span className="sub">{limit * (page - 1) + i + 1}</span>
                </p>
              </td>
              <td>
                <div className="token-info-group flex-center">
                  {/* <img src="/images/token/ico_binance.svg" alt="icoBinance" /> */}
                  <div className="token-info long">
                    <Link to={`/tokens/erc721/${c.address}`}>
                      {c.token_name ? c.token_name : c.address}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                <p>
                  <span>
                    {Number(c.transfer_count_24).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span>
                    {Number(c.transfer_count_48).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default Rank721Table;
