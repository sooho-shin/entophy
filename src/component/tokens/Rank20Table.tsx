import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import { DataTypes } from '@/types/tokens';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingTable from '../common/LoadingTable';
import NoDataTr from '../common/NoDataTr';

import TablePagination from '../common/TablePagination';

const VolumnTable: FC = () => {
  const { tokenData } = useTokenStore((state) => state);
  const { limit, page } = usePaginationStore((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const [holderOrderState, setHolderOrderState] = useState<string | null>(
    searchParams.get('sort') === 'holder' ? searchParams.get('order') : null,
  );
  const [transferOrderState, setTransferOrderState] = useState<string | null>(
    searchParams.get('sort') === 'transfer' ? searchParams.get('order') : null,
  );

  const sortHolderHandling = useCallback(() => {
    setTransferOrderState(null);
    if (holderOrderState === 'desc' || !holderOrderState) {
      setHolderOrderState('asc');
    } else {
      setHolderOrderState('desc');
    }
  }, [holderOrderState]);

  const sortTransferHandling = useCallback(() => {
    setHolderOrderState(null);
    if (transferOrderState === 'desc' || !transferOrderState) {
      setTransferOrderState('asc');
    } else {
      setTransferOrderState('desc');
    }
  }, [transferOrderState]);

  useEffect(() => {
    if (holderOrderState) {
      setSearchParams({ ...currentParams, sort: 'holder', order: holderOrderState });
    }
  }, [holderOrderState]);

  useEffect(() => {
    if (transferOrderState) {
      setSearchParams({ ...currentParams, sort: 'transfer', order: transferOrderState });
    }
  }, [transferOrderState]);
  if (!tokenData) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Rank' },
        { name: 'Token' },
        {
          name: 'Holder Count',
          sort: true,
          order: holderOrderState,
          callback: () => sortHolderHandling(),
        },
        {
          name: 'Transfer Count',
          sort: true,
          order: transferOrderState,
          callback: () => sortTransferHandling(),
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
                    <Link to={`/tokens/erc20/${c.address}`}>
                      {c.token_name ? c.token_name : c.address}{' '}
                      {c.token_symbol && `(${c.token_symbol})`}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                <p>
                  <span>{c.holder_count}</span>
                </p>
              </td>
              <td>
                <p>
                  <span>{c.transfer_count}</span>
                </p>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default VolumnTable;
