import config from '@/config';
import { FC } from 'react';

import TablePagination from '../common/TablePagination';

const LeaderboardTable: FC = () => {
  return (
    <TablePagination
      theadList={[
        { name: 'Rank' },
        { name: 'Address' },
        {
          name: 'Voting Power',
          sort: true,
        },
        { name: 'First Block', sort: true },
        { name: 'Last Block', sort: true },
        { name: '1 Day', sort: true },
        { name: '7 Days', sort: true },
        { name: '30 Days', sort: true },
        { name: 'Active', sort: true },
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
              <span className="active">Validator: BscScan</span>
            </p>
          </td>
          <td>
            <p>
              <img src="/images/icon/ico_vote.svg" alt="icoVote" />
              <span>946,304 {config.TOKEN}</span>
            </p>
          </td>
          <td>
            <p>
              <span className="active">12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span className="active">12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span>12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span>12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span>12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span className="status success">Yes</span>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <span>#</span>
            </p>
          </td>
          <td>
            <p>
              <span className="active">Validator: BscScan</span>
            </p>
          </td>
          <td>
            <p>
              <img src="/images/icon/ico_vote.svg" alt="icoVote" />
              <span>946,304 {config.TOKEN}</span>
            </p>
          </td>
          <td>
            <p>
              <span className="active">12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span className="active">12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span>12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span>12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span>12283402</span>
            </p>
          </td>
          <td>
            <p>
              <span className="status fail">No</span>
            </p>
          </td>
        </tr>
      </>
    </TablePagination>
  );
};

export default LeaderboardTable;
