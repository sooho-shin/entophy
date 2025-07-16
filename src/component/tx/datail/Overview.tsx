import {
  InternalTransactionListType,
  Erc20TokensTransferredTypes,
  Erc721TokensTransferredTypes,
  Erc1155TokensTransferredType,
} from '@/types/tx';

import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from '../../../config';
import { useTxStore } from '../../../store/tx';
import dayjsUtil from '../../../utils/dayjs';
import bignumberUtil from '@/utils/bignumber';
import SkeletonComponent from '@/component/common/Skeleton';

const Overview: FC = () => {
  const [moreState, setMoreState] = useState<boolean>(false);
  const { detailData } = useTxStore((state) => state);
  if (detailData === 'nodata') return <></>;

  return (
    <OverviewWrapper>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Transaction Hash</span>
          ) : (
            <SkeletonComponent maxWidth="115px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span>{detailData.hash}</span>
              <CopyToClipboard text={`${detailData.hash}`}>
                <button type="button" className="copy-btn" />
              </CopyToClipboard>
            </p>
          ) : (
            <SkeletonComponent maxWidth="530px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? <span>Status</span> : <SkeletonComponent maxWidth="43px" />}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              {detailData.status === null && (
                <span className="status indexing">Indexing</span>
              )}
              {detailData.status === 0 && <span className="status fail">Fail</span>}
              {detailData.status === 1 && <span className="status success">Success</span>}
              {detailData.status === 2 && <span className="status pending">Pending</span>}
            </p>
          ) : (
            <SkeletonComponent maxWidth="60px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? <span>Block</span> : <SkeletonComponent maxWidth="43px" />}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              {detailData.blockNumber ? (
                <Link to={`/blocks/${detailData.blockNumber}`}>
                  <span className="active">{detailData.blockNumber}</span>
                </Link>
              ) : (
                <span className="sub">(Pending)</span>
              )}
              {/* <span className="block">284 Block Confirmations</span> */}
            </p>
          ) : (
            <SkeletonComponent maxWidth="60px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? <span>TimeStamp</span> : <SkeletonComponent maxWidth="75px" />}
        </div>
        <div className="content">
          {detailData ? (
            <p className="time">
              <span>{dayjsUtil.getDiffDay(detailData.createDate)}</span>
              <span className="sub">
                {detailData.createDate &&
                  `(${dayjsUtil.getUtcFormat(detailData.createDate)})`}
              </span>
            </p>
          ) : (
            <SkeletonComponent maxWidth="360px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? <span>From</span> : <SkeletonComponent maxWidth="43px" />}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              {detailData.from_address_type === 'address' ? (
                <></>
              ) : (
                <span className="full">Contract </span>
              )}
              <Link to={`/address/${detailData?.from}`} className="active">
                {detailData?.from}
              </Link>
              {/* <span className="sub">(Validator: NodeReal)</span> */}
              <CopyToClipboard text={`${detailData && detailData.from}`}>
                <button type="button" className="copy-btn" />
              </CopyToClipboard>
            </p>
          ) : (
            <SkeletonComponent maxWidth="360px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img
            src="/images/icon/ico_help.svg"
            alt="icoHelp"
            style={{ alignSelf: 'start', paddingTop: '3px' }}
          /> */}
          {detailData ? (
            <span style={{ alignSelf: 'start' }}>To</span>
          ) : (
            <SkeletonComponent maxWidth="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              {detailData.creates && (
                <>
                  <span>[Contract </span>
                  <Link to={`/address/${detailData.creates}`} className="active">
                    {detailData?.creates}
                  </Link>
                  <span>
                    {' '}
                    Created] ({detailData.token_name && detailData.token_name}{' '}
                    {detailData.token_symbol && `: ${detailData.token_symbol}`})
                  </span>
                </>
              )}

              {detailData.to && (
                <>
                  {detailData.to_address_type === 'address' ? (
                    <></>
                  ) : (
                    <span className="full">Contract </span>
                  )}
                  <Link to={`/address/${detailData.to}`} className="active">
                    {detailData.to}
                  </Link>
                </>
              )}

              {/* <span className="sub">(BSC: Validator Set)</span> */}
              <CopyToClipboard
                text={`${detailData.creates ? detailData.creates : detailData?.to}`}
              >
                <button type="button" className="copy-btn" />
              </CopyToClipboard>
            </p>
          ) : (
            <SkeletonComponent maxWidth="430px" />
          )}
          {detailData &&
            detailData.internal_transaction_list &&
            detailData.internal_transaction_list.map(
              (c: InternalTransactionListType, i: number) => {
                if (Number(c.value) === 0) return false;
                return (
                  <p key={i}>
                    <span className="sub">Transfer</span>
                    <span className="sub-blk mrl">
                      {bignumberUtil.formatNumber(c.value, 18, 4)} {config.TOKEN}
                    </span>
                    <span className="sub">From</span>

                    <span className="sub-active mrl">
                      <Link
                        to={c.from.length === 66 ? `/tx/${c.from}` : `/address/${c.from}`}
                      >
                        {c.from.slice(0, 5) +
                          '...' +
                          c.from.slice(c.from.length - 4, c.from.length)}
                      </Link>
                    </span>

                    <span className="sub">To</span>
                    <span className="sub-active mrl">
                      <Link to={c.to.length === 66 ? `/tx/${c.to}` : `/address/${c.to}`}>
                        {c.to.slice(0, 5) +
                          '...' +
                          c.to.slice(c.to.length - 4, c.to.length)}
                      </Link>
                    </span>
                  </p>
                );
              },
            )}
        </div>
      </div>
      {detailData &&
        detailData.erc20_tokens_transferred &&
        detailData.erc20_tokens_transferred.length > 0 && (
          <div className="row">
            <div
              className="title"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <p>
                {/* <img
                  src="/images/icon/ico_help.svg"
                  alt="icoHelp"
                  style={{ alignSelf: 'start', paddingTop: '3px' }}
                /> */}
                <span style={{ alignSelf: 'start' }}>Tokens Transferred</span>
              </p>
              <p>
                <span className="sub">
                  ({detailData.erc20_tokens_transferred.length} ERC-20 Transfers found)
                </span>
              </p>
            </div>
            <div className="content transferred">
              {detailData.erc20_tokens_transferred.map(
                (c: Erc20TokensTransferredTypes, i: number) => {
                  return (
                    <p key={i}>
                      <span className="">From</span>
                      <Link to={`/address/${c.from}`} className="address">
                        <span className="active mrl">{c.from}</span>
                      </Link>

                      <span className="">To</span>
                      <Link to={`/address/${c.to}`} className="address">
                        <span className="active mrl">{c.to}</span>
                      </Link>
                      <span>For {bignumberUtil.formatNumber(c.value, 18)}</span>
                      <Link to={`/tokens/erc20/${c.token_address}`} className="active">
                        <span>
                          {c.token_name || c.token_address}{' '}
                          {c.token_symbol && `(${c.token_symbol})`}
                        </span>
                      </Link>
                    </p>
                  );
                },
              )}
            </div>
          </div>
        )}

      {detailData &&
        detailData.erc721_tokens_transferred &&
        detailData.erc721_tokens_transferred.length > 0 && (
          <div className="row">
            <div
              className="title"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <p>
                <img
                  src="/images/icon/ico_help.svg"
                  alt="icoHelp"
                  style={{ alignSelf: 'start', paddingTop: '3px' }}
                />
                <span style={{ alignSelf: 'start' }}>Tokens Transferred</span>
              </p>
              <p>
                <span className="sub">
                  ({detailData.erc721_tokens_transferred.length} ERC-721 Transfers found)
                </span>
              </p>
            </div>
            <div className="content transferred">
              {detailData.erc721_tokens_transferred.map(
                (c: Erc721TokensTransferredTypes, i: number) => {
                  return (
                    <p key={i}>
                      <span>From</span>
                      <Link to={`/address/${c.from}`} className="address">
                        <span className="active mrl">{c.from}</span>
                      </Link>

                      <span>To</span>
                      <Link to={`/address/${c.to}`} className="address">
                        <span className="active mrl">{c.to}</span>
                      </Link>
                      <span style={{ marginRight: '0' }}>For ERC-721 TokenID</span>

                      <span>
                        [
                        <Link
                          to={`/tokens/erc721/${c.token_address}`}
                          className="active"
                          style={{ marginRight: '0' }}
                        >
                          {c.item_id}
                        </Link>
                        ]{' '}
                      </span>

                      <Link to={`/tokens/erc721/${c.token_address}`} className="active">
                        <span>
                          {c.token_name || c.token_address}{' '}
                          {c.token_symbol && `(${c.token_symbol})`}
                        </span>
                      </Link>
                    </p>
                  );
                },
              )}
            </div>
          </div>
        )}

      {detailData &&
        detailData.erc1155_tokens_transferred &&
        detailData.erc1155_tokens_transferred.length > 0 && (
          <div className="row">
            <div
              className="title"
              style={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <p>
                <img
                  src="/images/icon/ico_help.svg"
                  alt="icoHelp"
                  style={{ alignSelf: 'start', paddingTop: '3px' }}
                />
                <span style={{ alignSelf: 'start' }}>Tokens Transferred</span>
              </p>
              <p>
                <span className="sub">
                  ({detailData.erc1155_tokens_transferred.length} ERC-1155 Transfers
                  found)
                </span>
              </p>
            </div>
            <div className="content transferred">
              {detailData.erc1155_tokens_transferred.map(
                (c: Erc1155TokensTransferredType, i: number) => {
                  return (
                    <p key={i}>
                      <span>From</span>
                      <Link to={`/address/${c.from}`} className="address">
                        <span className="active mrl">{c.from}</span>
                      </Link>

                      <span>To</span>
                      <Link to={`/address/${c.to}`} className="address">
                        <span className="active mrl">{c.to}</span>
                      </Link>
                      <span style={{ marginRight: '0' }}>
                        ERC-1155 For {bignumberUtil.formatNumber(c.value)} of TokenID
                      </span>

                      <span>
                        [
                        <Link
                          to={`/tokens/erc1155/${c.token_address}`}
                          className="active"
                          style={{ marginRight: '0' }}
                        >
                          {c.item_id}
                        </Link>
                        ]{' '}
                      </span>

                      <Link to={`/tokens/erc1155/${c.token_address}`} className="active">
                        <span>{c.token_name || 'ERC-1155'}</span>
                      </Link>
                    </p>
                  );
                },
              )}
            </div>
          </div>
        )}

      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? <span>Value</span> : <SkeletonComponent maxWidth="90%" />}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span>
                {bignumberUtil.formatNumber(
                  typeof detailData.value === 'string'
                    ? detailData.value
                    : detailData.value.hex,
                  18,
                )}{' '}
                {config.TOKEN}
              </span>
              {/* <span className="sub">($0.00)</span> */}
            </p>
          ) : (
            <SkeletonComponent maxWidth="100px" />
          )}
        </div>
      </div>
      {/* <div className="row">
        <div className="title">
          // <img src="/images/icon/ico_help.svg" alt="icoHelp" />
          <span>Transaction Fee</span>
        </div>
        <div className="content">
          <p>
            <span>0 {config.TOKEN}</span>
            <span className="sub">($0.00)</span>
          </p>
        </div>
      </div> */}
      {moreState && (
        <>
          <div className="row">
            <div className="title">
              <span>Transaction Fee</span>
            </div>
            <div className="content">
              <p>
                <span>
                  {detailData &&
                    (detailData.status === 2 || detailData.status === null) &&
                    0}
                  {detailData &&
                    (detailData.status === 0 || detailData.status === 1) &&
                    bignumberUtil.formatNumber(detailData.transactionFee)}{' '}
                  {config.TOKEN}
                </span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="title">
              {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
              <span>Gas Limit</span>
            </div>
            <div className="content">
              <p>
                <span>
                  {detailData &&
                    bignumberUtil.formatNumber(
                      typeof detailData.gasLimit === 'string'
                        ? detailData.gasLimit
                        : detailData.gasLimit.hex,
                    )}
                </span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="title">
              <span>Gas Used by Transaction</span>
            </div>
            <div className="content">
              <p>
                <span>
                  {detailData &&
                    (detailData.status === 2 || detailData.status === null) &&
                    0}
                  {detailData &&
                    (detailData.status === 0 || detailData.status === 1) &&
                    bignumberUtil.formatNumber(detailData.gasUsedByTransaction)}{' '}
                  {detailData &&
                    (detailData.status === 2 || detailData.status === null) &&
                    '(0%)'}
                  {detailData &&
                    (detailData.status === 0 || detailData.status === 1) &&
                    `(${detailData.gasUsedByTransactionPer}%)`}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="row">
            <div className="title">
              // <img src="/images/icon/ico_help.svg" alt="icoHelp" />
              <span>Gas Used by Transaction</span>
            </div>
            <div className="content">
              <p>
                <span>39,042</span>
                <span className="sub">(17.15%)</span>
              </p>
            </div>
          </div> */}
          <div className="row">
            <div className="title">
              {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
              <span>Gas Price</span>
            </div>
            <div className="content">
              <p>
                <span>
                  {detailData &&
                    bignumberUtil.formatNumber(
                      typeof detailData.gasPrice === 'string'
                        ? detailData.gasPrice
                        : detailData.gasPrice.hex,
                      0,
                      0,
                    )}{' '}
                  WEI
                </span>
                <span className="sub">
                  (
                  {detailData &&
                    bignumberUtil.formatNumber(
                      typeof detailData.gasPrice === 'string'
                        ? detailData.gasPrice
                        : detailData.gasPrice.hex,
                      9,
                    )}{' '}
                  Gwei)
                </span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="title">
              {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
              <span>Nonce</span>
              {/* <span className="tag">Position</span> */}
            </div>
            <div className="content">
              <p>
                <span>{detailData && detailData.nonce}</span>
                {/* <span className="sub">253</span> */}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="title">
              {/* <img
                src="/images/icon/ico_help.svg"
                alt="icoHelp"
                style={{ alignSelf: 'start', paddingTop: '3px' }}
              /> */}
              <span style={{ alignSelf: 'start' }}>Input Data</span>
            </div>
            <div className="content">
              <div className="pre-box">
                <pre>
                  <p>{detailData && detailData.function_name}</p>
                  {detailData && detailData.function_name && <br />}

                  {detailData && detailData.data}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}
      {detailData ? (
        <button
          type="button"
          className="more-btn"
          onClick={() => setMoreState(!moreState)}
        >
          <span>{moreState ? 'see less' : 'see more'}</span>
          <img
            src="/images/icon/ico_dropdown_p.svg"
            alt="icoArrow"
            style={{ transform: `rotate(${moreState ? '18' : '0'}0deg)` }}
          />
        </button>
      ) : (
        <SkeletonComponent
          maxWidth="100px"
          style={{ marginRight: 'auto', marginBottom: '32px' }}
        />
      )}
    </OverviewWrapper>
  );
};

const OverviewWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  ${({ theme }) => theme.media.tablet`
    gap: 32px;
    `}
  .row {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    ${({ theme }) => theme.media.tablet`
    flex-direction:column;
      justify-content:flex-start;
      flex-wrap:wrap
    `}
    > .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 200px;
      flex: 200px 0 0;
      ${({ theme }) => theme.media.tablet`
      width:unset;
      flex:unset;
      margin-bottom:4px;
    `}
      > p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      img {
        width: 16px;
        margin-right: 4px;
      }

      span {
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray4};
        &.sub {
          font-size: 12px;
        }
        &.tag {
          padding: 2px 8px;
          font-size: 12px;
          line-height: 14px;
          color: ${({ theme }) => theme.colors.gray.gray4};
          background-color: ${({ theme }) => theme.colors.primary.primary1};
          border-radius: 4px;
          margin-left: 4px;
        }
      }
    }
    > .content {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      gap: 4px;

      &.transferred {
        p {
          width: 100%;

          ${({ theme }) => theme.media.tablet`
          flex-direction: column;
          margin-bottom:16px
          `}
          a {
            ${({ theme }) => theme.media.tablet`
             max-width: unset ! important;
          `}
            span {
              ${({ theme }) => theme.media.tablet`
             margin-bottom:4px;
          `}
            }
          }
        }
      }
      .pre-box {
        width: 100%;
        padding: 8px;
        border: 1px solid ${({ theme }) => theme.colors.gray.gray1};
        border-radius: 8px;
        pre {
          white-space: pre-line;
          font-size: 14px;
          line-height: 21px;
          color: ${({ theme }) => theme.colors.gray.gray6};
          word-break: break-word;
        }
      }
      > p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &.time {
          ${({ theme }) => theme.media.tablet`
               flex-direction: column;
           `}
        }
        width: 100%;
        ${({ theme }) => theme.media.tablet`
        align-items:flex-start;
      `}
        a {
          color: ${({ theme }) => theme.colors.primary.primary6} !important;
          &:visited,
          &:active {
            color: ${({ theme }) => theme.colors.primary.primary6};
          }
        }
        > span,
        a {
          font-size: 14px;
          line-height: 1.5;
          color: ${({ theme }) => theme.colors.gray.gray6};
          margin-right: 8px;
          ${({ theme }) => theme.media.tablet`
        word-break:break-all;
        line-height: 21px;
    `}
          &.full {
            ${({ theme }) => theme.media.tablet`
        min-width:65px;
    `}
          }
          &.mrl {
            margin-right: 16px;
          }
          &.status {
            padding: 4.5px 6px;
            font-size: 12px;
            border-radius: 4px;
            display: block;
            &.indexing {
              color: ${({ theme }) => theme.colors.gray.gray4};
              background-color: ${({ theme }) => theme.colors.primary.primary1};
            }
            &.success {
              color: #0aaa23;
              background-color: #f0fff1;
            }
            &.pending {
              color: #6015ff;
              background-color: #edeeff;
            }
            &.fail {
              color: ${({ theme }) => theme.colors.danger};
              background-color: #fff0ed;
            }
          }
          &.active {
            color: ${({ theme }) => theme.colors.primary.primary6};
          }
          &.block {
            background: ${({ theme }) => theme.colors.primary.primary1};
            border-radius: 4px;
            padding: 2px 8px;
            font-size: 12px;
          }
          &.sub {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.gray.gray3};
          }
          &.sub-blk {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.gray.gray6};
          }
          &.sub-active {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.primary.primary6};
          }
          &.address {
            display: inline-block;
            max-width: 123px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-transform: capitalize;
          }
        }
        button.copy-btn {
          width: 16px;
          height: 16px;
          background-image: url(/images/icon/ico_copy.svg);
          background-position: center;
          background-size: cover;
          ${({ theme }) => theme.media.tablet`
        flex:none
    `}
        }
      }
    }
  }
  button.more-btn {
    padding: 4px 12px;
    background: ${({ theme }) => theme.colors.gray.gray1};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-right: auto;
    margin-top: 32px;
    > span {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
    }
    > img {
      width: 16px;
    }
  }
`;

export default Overview;
