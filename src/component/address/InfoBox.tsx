import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import bignumberUtil from '@/utils/bignumber';
import config from '../../config';
import { useAddressStore } from '../../store/address';
import SkeletonComponent from '@/component/common/Skeleton';
interface InfoBoxType {
  contract?: boolean;
}

const InfoBox: FC<InfoBoxType> = ({ contract }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const { detailData } = useAddressStore((state) => state);
  if (detailData === 'nodata') return <></>;
  return (
    <Box>
      <h5>{contract ? 'More Info' : 'Overview'}</h5>
      <div className="row-group">
        <div className="row">
          <div className="title">
            <span>{contract ? 'Creator' : 'Balance'}</span>
          </div>
          <div className="info">
            {!contract &&
              (detailData ? (
                <p>
                  {detailData.balance_human} {config.TOKEN}
                </p>
              ) : (
                <SkeletonComponent width="150px" height="21px" />
              ))}
            {contract &&
              (detailData ? (
                <p>
                  <Link to={`/address/${detailData.more_info.creator_address}`}>
                    <span className="address active">
                      {detailData.more_info.creator_address}
                    </span>
                  </Link>{' '}
                  at txn{' '}
                  <Link to={`/tx/${detailData.more_info.created_tx_hash}`}>
                    <span className="address active" style={{ marginLeft: '4px' }}>
                      {detailData.more_info.created_tx_hash}
                    </span>
                  </Link>
                </p>
              ) : (
                <SkeletonComponent maxWidth="100px" />
              ))}
          </div>
        </div>
        <div className="row">
          <div className="title">
            <span>{contract ? 'Tracker' : 'Token'}</span>
          </div>
          <div className="info">
            {detailData ? (
              contract ? (
                <p>
                  <span>
                    {detailData && detailData.more_info.token_name}{' '}
                    {detailData &&
                      detailData.more_info.token_symbol &&
                      `(${detailData.more_info.token_symbol})`}
                  </span>
                </p>
              ) : (
                <TokenSelectBox dropdownState={dropdownState}>
                  <button
                    className="selected-row"
                    type="button"
                    onClick={() => setDropdownState(!dropdownState)}
                  >
                    <TokenBox>
                      {/* <img src={tokenIcon} alt="" /> */}
                      <span>
                        {detailData?.ERC20_token_list &&
                        detailData.ERC20_token_list.length > 0
                          ? `${detailData?.ERC20_token_list[0].name}(${detailData?.ERC20_token_list[0].symbol})`
                          : 'empty'}
                      </span>
                    </TokenBox>
                    <img
                      src="/images/icon/ico_dropdown_p.svg"
                      alt="icoDropdown"
                      style={{ transform: `rotate(${dropdownState ? '18' : '0'}0deg)` }}
                    />
                  </button>
                  {dropdownState && (
                    <div className="droopdown-content">
                      <ul>
                        <p>
                          {detailData?.ERC20_token_list &&
                          detailData.ERC20_token_list.length > 0
                            ? `ERC-20 Tokens (${detailData?.ERC20_token_list.length})`
                            : ''}
                        </p>
                        {detailData?.ERC20_token_list &&
                          detailData?.ERC20_token_list.map((item, i) => {
                            return (
                              <li key={`item${i}`}>
                                <TokenBox>
                                  <Link to={`/tokens/erc20/${item.address}`}>
                                    {/* <img src={tokenIcon} alt="" /> */}
                                    <span>
                                      {item.name && item.symbol
                                        ? `${item.name}(${item.symbol})`
                                        : '-'}
                                    </span>
                                  </Link>
                                </TokenBox>
                                <p>
                                  {bignumberUtil.formatNumber(
                                    item.balance,
                                    item.decimals || 18,
                                  )}{' '}
                                  {item.symbol}
                                </p>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </TokenSelectBox>
              )
            ) : (
              <SkeletonComponent maxWidth="356px" height="32px" />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

interface TokenSelectBoxProps {
  dropdownState: boolean;
}

const TokenSelectBox = styled.div<TokenSelectBoxProps>`
  width: 100%;
  position: relative;

  .droopdown-content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    background: ${({ theme }) => theme.colors.gray.white};
    border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
    border-top: none;
    box-sizing: border-box;
    padding: 0 12px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 5;
    /* .search-box {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 12px;
      border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
      border-radius: 8px;
      margin-bottom: 16px;
      img {
        width: 16px;
      }
      input {
        flex: 1;
        &::placeholder {
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          color: ${({ theme }) => theme.colors.gray.gray3};;
        }
      }
    } */
    ul {
      > p {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        margin: 24px 0 19px 4px;
      }
      li {
        line-height: 1.5;
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 8px;
        }
      }
    }
  }

  .selected-row {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.gray.white};
    border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
    box-sizing: border-box;
    padding: 0 12px;
    border-radius: 8px;
    ${({ theme }) => theme.media.tablet`
        height:auto;
        padding:4px 12px;
    `}
    ${(props) =>
      props.dropdownState &&
      css`
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom: 1px solid transparent;
      `}
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  > h5 {
    width: 100%;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray5};
    margin-bottom: 24px;
  }

  > .row-group {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 16px;
    ${({ theme }) => theme.media.tablet`
        gap:32px;
    `}
    .row {
      width: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      ${({ theme }) => theme.media.tablet`
        flex-direction:column;
        align-items: flex-start;
        gap:4px;
    `}

      > .title {
        width: 196px;
        color: ${({ theme }) => theme.colors.gray.gray4};
        ${({ theme }) => theme.media.tablet`
        width:80px;
    `}
      }

      > .info {
        flex: 1;
        color: ${({ theme }) => theme.colors.gray.gray6};
        display: flex;
        align-items: center;
        justify-content: flex-start;
        p {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          a {
            display: inline-flex;
          }
        }

        span.sub {
          color: ${({ theme }) => theme.colors.gray.gray3};
        }
        span.active {
          color: ${({ theme }) => theme.colors.primary.primary6};
        }
        span.address {
          display: inline-block;
          max-width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

const TokenBox = styled.div`
  display: flex;
  align-items: center;
  > span {
    text-align: left;
  }
  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray.gray6};
  }
`;

export default InfoBox;
