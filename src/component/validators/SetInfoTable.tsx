import config from '@/config';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import TablePagination from '../common/TablePagination';

const SetInfoTable: FC = () => {
  return (
    <TablePagination
      theadList={[
        { name: 'Age', active: true },
        { name: 'Block' },
        { name: 'Validators' },
        { name: 'Total Voting Power' },
        { name: 'Total Jailed' },
        { name: 'Total Incoming' },
      ]}
    >
      <>
        <tr>
          <td>
            <p>
              <span className="sub">5 secs ago</span>
            </p>
          </td>
          <td>
            <p>
              <span className="active">
                <Link to={`/blocks/12283402`}>12283402</Link>
              </span>
            </p>
          </td>
          <td>
            <p>
              <img src="/images/icon/ico_user.svg" alt="icoUser" />
              <span className="active">50</span>
            </p>
          </td>
          <td>
            <p>
              <span>946,304 {config.TOKEN}</span>
            </p>
          </td>
          <td>
            <p>
              <span>0</span>
            </p>
          </td>
          <td>
            <p>
              <span className="address">0.1160221929223156641231568945631</span>
              <span>{config.TOKEN}</span>
            </p>
          </td>
        </tr>
      </>
    </TablePagination>
  );
};

export default SetInfoTable;
