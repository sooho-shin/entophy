import { FC } from 'react';
import { Link } from 'react-router-dom';

import TablePagination from '../common/TablePagination';

const MarketCapTable: FC = () => {
  return (
    <TablePagination
      theadList={[
        { name: 'Rank' },
        { name: 'Token' },
        {
          name: 'Price',
        },
        { name: 'Change (%)' },
        { name: 'Volume (24H)' },
        { name: 'Circulating Market Cap', tooltip: { name: 'tooltip' } },
        { name: 'On-Chain Market Cap', tooltip: { name: 'tooltip' } },
        { name: 'Holders', sort: true },
      ]}
      verticalAlign="top"
    >
      <>
        <tr>
          <td>
            <p>
              <span>#</span>
            </p>
          </td>
          <td>
            <div className="token-info-group">
              <img src="/images/token/ico_binance.svg" alt="icoBinance" />
              <div className="token-info">
                <Link to="/tokens/wef">Binance-Peg Ethereum Token (ETH)</Link>
                <p className="sub">
                  Ethereum is a global, open-source platform for decentralized
                  applications. Eth is fueling transactions on the Chain.
                </p>
                <span>Cross-chain</span>
              </div>
            </div>
          </td>
          <td>
            <p>
              <span>$3,179.04</span>
            </p>
            <p>
              <span className="sub small">0.64635432 BTC</span>
            </p>
            <p>
              <span className="sub small">0.64635432 BNB</span>
            </p>
          </td>
          <td>
            <p>
              <span className="variance down">12.4%</span>
            </p>
          </td>
          <td>
            <p>
              <span>$10,952,346,312.24</span>
            </p>
          </td>
          <td>
            <p>
              <span>$10,952,346,312.24</span>
            </p>
          </td>
          <td>
            <p>
              <span>$10,952,346,312.24</span>
            </p>
          </td>
          <td>
            <p>
              <span>$10,952,346,312.24</span>
            </p>
          </td>
        </tr>
      </>
    </TablePagination>
  );
};

export default MarketCapTable;
