import { FC } from 'react';
import styled from 'styled-components';

import { useMainStore } from '../../store/main';
import bignumberUtil from '@/utils/bignumber';
import SkeletonComponent from '../common/Skeleton';

const Performance: FC = () => {
  const { generatedTime, totalBlocks, totalTransactions } = useMainStore(
    (state) => state,
  );

  return (
    <Wrapper>
      <h5>Network Performance</h5>
      <div className="info-box">
        <div className="content">
          {generatedTime ? (
            <img src="/images/icon/ico_txs.svg" alt="icoTxs" />
          ) : (
            <SkeletonComponent maxWidth="32px" height="32px" width="32px" circle />
          )}

          <div>
            {generatedTime ? (
              <span>Total Txs</span>
            ) : (
              <SkeletonComponent
                maxWidth="61px"
                height="13px"
                style={{ marginBottom: '2px' }}
              />
            )}
            {totalTransactions ? (
              <span>{bignumberUtil.formatNumber(totalTransactions)}</span>
            ) : (
              <SkeletonComponent maxWidth="150px" height="28px" />
            )}
          </div>
        </div>
        <div className="content">
          {generatedTime ? (
            <img src="/images/icon/ico_blocks.svg" alt="icoBlocks" />
          ) : (
            <SkeletonComponent maxWidth="32px" height="32px" width="32px" circle />
          )}
          <div>
            {generatedTime ? (
              <span>Total Blocks</span>
            ) : (
              <SkeletonComponent
                maxWidth="61px"
                height="13px"
                style={{ marginBottom: '2px' }}
              />
            )}
            {totalBlocks ? (
              <span>{bignumberUtil.formatNumber(totalBlocks.toString(), 0, 0)}</span>
            ) : (
              <SkeletonComponent maxWidth="150px" height="28px" />
            )}
          </div>
        </div>
        <div className="content">
          {generatedTime ? (
            <img src="/images/icon/ico_time.svg" alt="icoTime" />
          ) : (
            <SkeletonComponent maxWidth="32px" height="32px" width="32px" circle />
          )}
          <div>
            {generatedTime ? (
              <span>Block Time</span>
            ) : (
              <SkeletonComponent
                maxWidth="61px"
                height="13px"
                style={{ marginBottom: '2px' }}
              />
            )}
            {generatedTime ? (
              <span>
                ~ {bignumberUtil.formatNumber(generatedTime.toString())}
                Secs
              </span>
            ) : (
              <SkeletonComponent maxWidth="150px" height="28px" />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 75%;
  gap: 16px;

  ${({ theme }) => theme.media.tablet`
    width:100%;
    padding: 16px;
    ${'background :' + theme.colors.gray.white};
    border-radius: 16px;
    gap:0;
  `}

  >.block-time {
    margin-bottom: 16px;
    padding: 4px 8px;
    background: ${({ theme }) => theme.colors.primary.primary1};
    border-radius: 4px;
    img {
      margin-right: 4px;
    }
    > span {
      font-weight: 400;
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
      &.b {
        font-weight: 600;
        margin-left: 8px;
      }
    }
  }

  > h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray5};
    ${({ theme }) => theme.media.tablet`
      margin-bottom:8px;
    `}
  }

  .info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 24px;
    border: 1px solid ${({ theme }) => theme.colors.gray.gray1};
    border-radius: 8px;
    width: 100%;

    ${({ theme }) => theme.media.tablet`
      flex-direction:column;
      align-items: flex-start;
      padding:16px;
      gap:16px;
      border-radius: 16px;
    `}
    .content {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
      min-width: 160px;
      width: 33%;
      ${({ theme }) => theme.media.tablet`
      min-width:unset;
      width:100%;
    `}
      > img {
        width: 32px;
      }

      > div {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        > span {
          &:first-child {
            font-weight: 400;
            font-size: 12px;
            line-height: 1.2;
            color: ${({ theme }) => theme.colors.gray.gray3};
          }
          &:last-child {
            font-weight: 600;
            font-size: 20px;
            line-height: 1.5;
            color: ${({ theme }) => theme.colors.primary.primary10};
          }
        }
      }
    }
  }
`;

export default Performance;
