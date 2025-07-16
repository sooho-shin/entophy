import { BigNumber } from 'bignumber.js';

import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import { HolderDataType } from '@/types/tokens';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import NoDataTr from '@/component/common/NoDataTr';
import bignumberUtil from '@/utils/bignumber';
import TablePagination from '@/component/common/TablePagination';
import LoadingTable from '@/component/common/LoadingTable';

const HolderTable = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { hash, type } = useParams();
  const { limit, page } = usePaginationStore((state) => state);

  const { detailData, holderData, fetchHolderData, resetTableData } = useTokenStore(
    (state) => state,
  );
  useEffect(() => {
    resetTableData();
    if (type && hash) {
      fetchHolderData({
        type,
        hash,
        ...currentParams,
      });
    }
  }, [type, hash, searchParams]);

  if (detailData === 'nodata') return <></>;
  if (!holderData) return <LoadingTable />;
  return (
    <TablePagination
      theadList={[
        { name: 'Rank' },
        { name: 'Address' },
        { name: 'Quantity' },
        { name: 'Percantage' },
      ]}
    >
      {holderData && !holderData.length && <NoDataTr colspan={4} text="NoData" />}
      {holderData &&
        holderData.length > 0 &&
        holderData.map((c: HolderDataType, i: number) => {
          const balance =
            detailData &&
            new BigNumber(c.balance)
              .div(10 ** (type !== 'erc720' ? detailData.decimals : 0))
              .toFixed();
          return (
            <tr key={i}>
              <td>
                <p>
                  <span className="sub">{limit * (page - 1) + i + 1}</span>
                </p>
              </td>
              <td>
                <p>
                  <Link
                    to={
                      c.address.length === 66
                        ? `/tx/${c.address}`
                        : `/address/${c.address}`
                    }
                  >
                    {c.address_type === 'contract' && (
                      <img
                        className="ico_file"
                        src="/images/icon/ico_file.svg"
                        alt="icoFile"
                      />
                    )}
                    <span className="active address">{c.address}</span>
                  </Link>
                </p>
              </td>
              <td>
                <p>
                  {/* <span className="blk">80,000,000</span> */}
                  <span className="blk">
                    {balance && bignumberUtil.formatNumber(balance.toString())}
                  </span>
                </p>
              </td>
              <td>
                <p>
                  <span className="blk">
                    {detailData &&
                      (
                        (Number(balance) / Number(detailData?.total_supply)) *
                        100
                      ).toFixed(4)}
                    %
                  </span>
                  {/* <span className="percent">(50%)</span> */}
                </p>
                <div className="progress-bar">
                  <div
                    style={{
                      width: `${
                        (Number(balance) / Number(detailData?.total_supply)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default HolderTable;
