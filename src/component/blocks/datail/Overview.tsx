import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import disabled from '/images/icon/ico_default_dis.svg';
import left from '/images/icon/ico_default_left.svg';
import { useBlockStore } from '../../../store/block';
import dayjsUtil from '../../../utils/dayjs';
import { Mobile, PC } from '@/component/common/MediaQuery';
import SkeletonComponent from '@/component/common/Skeleton';
import bignumberUtil from '@/utils/bignumber';
import config from '@/config';

const Overview: FC = () => {
  const [moreState, setMoreState] = useState<boolean>(false);
  dayjs.extend(utc);

  const { detailData } = useBlockStore((state) => state);
  if (detailData === 'nodata') return <></>;
  return (
    <OverviewWrapper>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Block Height</span>
          ) : (
            <SkeletonComponent maxWidth="83px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span>{detailData && detailData.block_number}</span>
              <span className="link-box">
                <Link to={`/blocks/${Number(detailData?.block_number) - 1}`}>
                  prev block
                </Link>
                <Link
                  to={`/blocks/${Number(detailData?.block_number) + 1}`}
                  className={detailData?.is_last_block ? 'disabled' : ''}
                >
                  next block
                </Link>
              </span>
            </p>
          ) : (
            <SkeletonComponent maxWidth="140px" height="20px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>TimeStamp</span>
          ) : (
            <SkeletonComponent maxWidth="75px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p className="time">
              <span>
                {detailData && dayjsUtil.getDiffDay(detailData.timestamp * 1000)}
              </span>
              <span className="sub">
                ({detailData && dayjsUtil.getUtcFormat(detailData.timestamp * 1000)})
              </span>
            </p>
          ) : (
            <SkeletonComponent maxWidth="350px" height="20px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Transactions</span>
          ) : (
            <SkeletonComponent maxWidth="83px" height="20px" />
          )}
        </div>
        <div className="content">
          <PC>
            {detailData ? (
              <p>
                <Link
                  to={`/tx/txns?block=${detailData && detailData.block_number}`}
                  className={
                    detailData && detailData.transaction_count > 0 ? 'active' : 'disabled'
                  }
                >
                  {detailData && detailData.transaction_count} transactions
                </Link>
                <span className="sub">and</span>
                <Link
                  to={`/tx/internal?block=${detailData && detailData.block_number}`}
                  className={
                    detailData && detailData.internal_transaction_count > 0
                      ? 'active'
                      : 'disabled'
                  }
                >
                  {detailData && detailData.internal_transaction_count} contract internal
                  transactions
                </Link>
                <span className="sub">in this block</span>
              </p>
            ) : (
              <SkeletonComponent maxWidth="410px" height="20px" />
            )}
          </PC>
          <Mobile>
            {detailData ? (
              <p>
                {/* <span className="active">
              {detailData && detailData.transaction_count} transactions
            </span> */}
                <Link
                  to={`/tx/txns?block=${detailData && detailData.block_number}`}
                  className={
                    detailData && detailData.transaction_count > 0 ? 'active' : 'disabled'
                  }
                >
                  {detailData && detailData.transaction_count} transactions
                </Link>
                <span className="sub">and</span>
              </p>
            ) : (
              <SkeletonComponent maxWidth="410px" height="20px" />
            )}
          </Mobile>
          <Mobile>
            <p>
              <Link
                to={`/tx/internal?block=${detailData && detailData.block_number}`}
                className={
                  detailData && detailData.internal_transaction_count > 0
                    ? 'active'
                    : 'disabled'
                }
              >
                {detailData && detailData.internal_transaction_count} contract internal
                transactions
              </Link>
              <span className="sub">in this block</span>
            </p>
          </Mobile>
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Validated by</span>
          ) : (
            <SkeletonComponent maxWidth="83px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <Link
                to={`/address/${detailData && detailData.miner}`}
                className="active address"
              >
                {detailData && detailData.miner_name}
              </Link>
            </p>
          ) : (
            <SkeletonComponent maxWidth="380px" height="20px" />
          )}
        </div>
      </div>
      {/* <div className="row">
        <div className="title">
          // <img src="/images/icon/ico_help.svg" alt="icoHelp" />
          <span>Block Reward</span>
        </div>
        <div className="content">
          <p>
            <span>0.204650307688202266 {config.TOKEN}</span>
          </p>
        </div>
      </div> */}
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Difficulty</span>
          ) : (
            <SkeletonComponent maxWidth="59px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span>{detailData && detailData.difficulty}</span>
            </p>
          ) : (
            <SkeletonComponent maxWidth="20px" height="20px" />
          )}
        </div>
      </div>
      {/* <div className="row">
        <div className="title">
          // <img src="/images/icon/ico_help.svg" alt="icoHelp" />
          <span>Total Difficulty</span>
        </div>
        <div className="content">
          <p>
            <span>33,269,253</span>
          </p>
        </div>
      </div> */}
      {/* <div className="row">
        <div className="title">
          // <img src="/images/icon/ico_help.svg" alt="icoHelp" />
          <span>Size</span>
        </div>
        <div className="content">
          <p>
            <span>33,269,253</span>
            <span className="sub">bytes</span>
          </p>
        </div>
      </div> */}
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Gas Used</span>
          ) : (
            <SkeletonComponent maxWidth="62px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span>{detailData.gas_used}</span>
              {/* <span className="sub">bytes</span> */}
            </p>
          ) : (
            <SkeletonComponent maxWidth="20px" height="20px" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Gas Limit</span>
          ) : (
            <SkeletonComponent maxWidth="62px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span>{bignumberUtil.formatNumber(detailData.gas_limit, 0, 2)}</span>
            </p>
          ) : (
            <SkeletonComponent maxWidth="70px" height="20px" />
          )}
        </div>
      </div>
      {detailData && detailData.burn && (
        <div className="row">
          <div className="title">
            <span>Fee Burnt</span>
          </div>
          <div className="content">
            <p>
              <span>
                🔥 {bignumberUtil.formatNumber(detailData.burn, 18)} {config.TOKEN}
              </span>
            </p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="title">
          {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
          {detailData ? (
            <span>Reward</span>
          ) : (
            <SkeletonComponent maxWidth="62px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <p>
              <span className="blk">
                {detailData.block_reward
                  ? bignumberUtil.formatNumber(detailData.block_reward, 18)
                  : 0}{' '}
                {config.TOKEN}
              </span>
            </p>
          ) : (
            <SkeletonComponent maxWidth="70px" height="20px" />
          )}
        </div>
      </div>
      {/* <div className="0 */}
      <div className="row">
        <div className="title">
          {/* <img
            src="/images/icon/ico_help.svg"
            alt="icoHelp"
            style={{ alignSelf: 'start', paddingTop: '3px' }}
          /> */}
          {detailData ? (
            <span style={{ alignSelf: 'start' }}>Extra Data</span>
          ) : (
            <SkeletonComponent maxWidth="70px" height="20px" />
          )}
        </div>
        <div className="content">
          {detailData ? (
            <div className="pre-box">
              <pre>
                Hex:
                {detailData && <> {detailData.hash}</>}
              </pre>
            </div>
          ) : (
            <SkeletonComponent height="39px" />
          )}
        </div>
      </div>
      {moreState && (
        <>
          <div className="row">
            <div className="title">
              {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
              <span>Hash</span>
            </div>
            <div className="content">
              <p>
                <span>{detailData && detailData.hash}</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="title">
              {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
              <span>Parent Hash</span>
            </div>
            <div className="content">
              <p>
                <span>{detailData && detailData.parent_hash}</span>
              </p>
            </div>
          </div>
          {/* <div className="row">
            <div className="title">
              // <img src="/images/icon/ico_help.svg" alt="icoHelp" />
              <span>Sha3Uncles</span>
            </div>
            <div className="content">
              <p>
                <span>0x2d4c407bbe49438ed859fe965b140dcf1aab71a9</span>
              </p>
            </div>
          </div> */}
          <div className="row">
            <div className="title">
              {/* <img src="/images/icon/ico_help.svg" alt="icoHelp" /> */}
              <span>Nonce</span>
            </div>
            <div className="content">
              <p>
                <span>{detailData && detailData.nonce}</span>
              </p>
            </div>
          </div>
        </>
      )}
      <button type="button" className="more-btn" onClick={() => setMoreState(!moreState)}>
        <span>{moreState ? 'see less' : 'see more'}</span>
        <img
          src="/images/icon/ico_dropdown_p.svg"
          alt="icoArrow"
          style={{ transform: `rotate(${moreState ? '18' : '0'}0deg)` }}
        />
      </button>
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
  flex-direction: column;
  gap:4px;
  `}
    > .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 200px;
      flex: 200px 0 0;
      ${({ theme }) => theme.media.tablet`
  width:auto;
  flex:auto;
  `}

      > img {
        width: 16px;
        margin-right: 4px;
      }

      > span {
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray4};
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
        word-break: break-all;
        cursor: text;
        flex-wrap: wrap;
        &.time {
          ${({ theme }) => theme.media.tablet`
               flex-direction: column;
             align-items: flex-start;
           `}
          > span {
            line-height: 21px;
          }
        }
        > span,
        a {
          font-size: 14px;
          line-height: 1.2;
          color: ${({ theme }) => theme.colors.gray.gray6};
          margin-right: 8px;
          &.disabled {
            pointer-events: none;
            color: ${({ theme }) => theme.colors.gray.gray6};
          }
          &.mrl {
            margin-right: 16px;
          }
          &.success {
            padding: 4.5px 6px;
            font-size: 12px;
            color: #0aaa23;
            background-color: #f0fff1;
            border-radius: 4px;
            display: block;
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
        }
        button.copy-btn {
          width: 16px;
          height: 16px;
          background-image: url(/images/icon/ico_copy.svg);
          background-position: center;
          background-size: cover;
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
  .link-box {
    display: flex;
    gap: 0 8px;

    a {
      width: 16px;
      height: 16px;
      display: block;
      background-size: cover;
      text-indent: -9999px;
      background: url(${left}) center no-repeat;
      &:last-child {
        transform: rotate(180deg);
      }
      &.disabled {
        background: url(${disabled}) center no-repeat;
        transform: rotate(0deg);
        pointer-events: none;
      }
    }
  }
`;

export default Overview;
