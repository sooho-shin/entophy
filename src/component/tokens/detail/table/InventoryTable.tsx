import NoDataTr from '@/component/common/NoDataTr';
import { useState } from 'react';
// import { usePaginationStore } from '@/store/pagination';
import { useTokenStore } from '@/store/token';
import { InvenDataType } from '@/types/tokens';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import bignumberUtil from '@/utils/bignumber';
import TablePagination from '@/component/common/TablePagination';
import LoadingTable from '@/component/common/LoadingTable';

const InventoryTable = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { hash, type } = useParams();
  // const { limit, page } = usePaginationStore((state) => state);

  const { invenData, fetchInvenData, resetTableData } = useTokenStore((state) => state);

  const [inventoryThead, setInventoryThead] = useState<
    | [{ name: string }, { name: string }, { name: string }]
    | [{ name: string }, { name: string }]
    | []
  >([]);

  useEffect(() => {
    resetTableData();
    if (type && hash) {
      fetchInvenData({
        type,
        hash,
        ...currentParams,
      });
    }
    if (type === 'erc721') {
      setInventoryThead([{ name: 'Token_id' }, { name: 'Owner' }]);
    } else {
      setInventoryThead([{ name: 'Token_id' }, { name: 'Owner' }, { name: 'Amount' }]);
    }
  }, [type, hash, searchParams]);

  if (!invenData) return <LoadingTable />;
  return (
    <TablePagination theadList={inventoryThead}>
      {invenData && !invenData.length && <NoDataTr colspan={2} text="NoData" />}
      {invenData &&
        invenData.length > 0 &&
        invenData.map((c: InvenDataType, i: number) => {
          return (
            <tr key={i}>
              <td>
                <p>
                  <span className="small pale">{c.id}</span>
                </p>
              </td>
              <td>
                <p>
                  <Link to={`/address/${c.address}`}>
                    {c.address_type === 'contract' && (
                      <img
                        className="ico_file"
                        src="/images/icon/ico_file.svg"
                        alt="icoFile"
                      />
                    )}
                    <span className="active">{c.address}</span>
                  </Link>
                </p>
              </td>
              {type !== 'erc721' && (
                <td>
                  <p>
                    <span>{bignumberUtil.formatNumber(c.balance)}</span>
                  </p>
                </td>
              )}
            </tr>
          );
        })}
    </TablePagination>
  );
};

export default InventoryTable;
