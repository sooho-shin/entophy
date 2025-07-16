import config from '@/config';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import TablePagination from '../common/TablePagination';

const AccountsTable: FC = () => {
  return (
    <TablePagination
      theadList={[
        { name: 'Rank' },
        { name: 'Address' },
        {
          name: 'Name Tag',
        },
        { name: 'Balance', sort: true },
        { name: 'Percentage' },
        { name: 'Txn Count' },
      ]}
    >
      <>
        <tr>
          <td>
            <p>
              <span>#</span>
            </p>
          </td>
          <td>
            <p>
              <Link to={``}>
                <img src="/images/icon/ico_file.svg" alt="icoFile" />
                <span>946,304 {config.TOKEN}</span>
              </Link>
            </p>
          </td>
          <td>
            <p>
              <span>BSC: Token Hub</span>
            </p>
          </td>
          <td>
            <p>
              <span>153,813,192.23372273 {config.TOKEN}</span>
            </p>
          </td>
          <td>
            <p>
              <span>25.33431820 %</span>
            </p>
          </td>
          <td>
            <p>
              <span>4,576,303</span>
            </p>
          </td>
        </tr>
      </>
    </TablePagination>
  );
};

export default AccountsTable;
