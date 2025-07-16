import config from '@/config';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TablePagination from '../../common/TablePagination';

const Internal: FC = () => {
  return (
    <InternalWrapper>
      <p>
        <span>Contract call</span>
        <span className="blk">From</span>
        <span className="address">0x7f7a9857cC1bb8382690e524c3DB0f5A03ac251C</span>
        <span className="blk">To</span>
        <span className="address">0x7f7a9857cC1bb8382690e524c3DB0f5A03ac251C</span>
        <span>produced</span>
        <span className="blk">5</span>
        <span>internal transactions</span>
      </p>

      <TablePagination
        theadList={[
          { name: 'Type Trace Address' },
          { name: 'From' },
          { name: 'To', to: true },
          { name: 'Value' },
          { name: 'Gas Limit' },
        ]}
        type="detail"
      >
        <tr>
          <td>
            <p>
              <img
                className="ico-code-result"
                src="/images/icon/ico_code_result.svg"
                alt="icoCodeResult"
              />
              <img
                className="ico-underbar"
                src="/images/icon/ico_underbar.svg"
                alt="icoUnderbar"
              />
              <img
                className="ico-success"
                src="/images/icon/ico_success.svg"
                alt="icoSuccess"
              />
              <span>call_0_1</span>
            </p>
          </td>
          <td>
            <p>
              <Link to={'/'}>
                <span className="address">
                  0x7f7a9857cC1bb8382690e524c3DB0f5A03ac251C
                </span>
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
              <Link to={'/'}>
                <img
                  className="ico-internal"
                  src="/images/icon/ico_internal.svg"
                  alt="icoInternal"
                />
                <span className="address">
                  0x7f7a9857cC1bb8382690e524c3DB0f5A03ac251C
                </span>
              </Link>
            </p>
          </td>
          <td>
            <p>
              <span>0.063994224740704205 {config.TOKEN}</span>
            </p>
          </td>
          <td>
            <p>
              <span>2,300</span>
            </p>
          </td>
        </tr>
      </TablePagination>
    </InternalWrapper>
  );
};

const InternalWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > p {
    width: 100%;
    text-align: left;
    padding-left: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    margin-bottom: 12px;
    span {
      font-size: 12px;
      line-height: 14px;
      color: ${({ theme }) => theme.colors.gray.gray3};
      &.blk {
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
      &.address {
        color: ${({ theme }) => theme.colors.primary.primary6};
        width: 156px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export default Internal;
