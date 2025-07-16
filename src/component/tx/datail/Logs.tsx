import { EventLogsType } from '@/types/tx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useTxStore } from '../../../store/tx';
import SkeletonComponent from '@/component/common/Skeleton';

const Logs: FC = () => {
  const { detailData } = useTxStore((state) => state);
  if (detailData === 'nodata') return <></>;
  return (
    <LogsWrapper>
      <h5>Transaction Receipt Event Logs</h5>
      <div className="logs-group">
        {!detailData && (
          <div className="log-content-group">
            <span className="number">
              <SkeletonComponent maxWidth="10px" />
            </span>
            <div className="log-content">
              <div className="row">
                <span className="title">
                  <SkeletonComponent maxWidth="75px" />
                </span>
                <div className="info-box" style={{ width: '100%' }}>
                  <div className="topic-row" style={{ width: '100%' }}>
                    <span className="name" style={{ width: '100%' }}>
                      <SkeletonComponent maxWidth="600px" height="22px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {detailData && detailData.eventLogs && !detailData.eventLogs.logs.length && (
          <NoDataContainer>No Data</NoDataContainer>
        )}
        {detailData &&
          detailData.eventLogs &&
          detailData.eventLogs.logs.length > 0 &&
          detailData.eventLogs.logs.map((c: EventLogsType, i: number) => {
            return (
              <div className="log-content-group" key={i}>
                <span className="number">{i}</span>
                <div className="log-content">
                  <Row type="address" data={c} />
                  {c.eventName && <Row type="name" data={c} />}
                  {c.topics.length && <Row type="topics" data={c} />}
                  <Row type="data" data={c} />
                </div>
              </div>
            );
          })}
      </div>
    </LogsWrapper>
  );
};

const NoDataContainer = styled.div`
  width: 100%;
  padding: 25px 40px;
  text-align: left;
  background: #f6e7c7;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #b57b00;
`;

interface RowProps {
  type?: string;
  data: EventLogsType;
}

const Row: FC<RowProps> = ({ type, data }) => {
  return (
    <div className="row">
      {type === 'address' && (
        <>
          <span className="title address">Address</span>
          <div className="info-box">
            <div className="address-row">
              <p>
                <Link to={`/address/${data.address}`}>{data.address}</Link>
              </p>
              {/* <Link className="link-btn" to="https://www.naver.com/">
                <span>Matches Topic [{data.topics.length}]</span>
                <img src="/images/icon/ico_move_right.svg" alt="icoMoveRight" />
              </Link> */}
            </div>
          </div>
        </>
      )}
      {type === 'name' && (
        <>
          <span className="title">Name</span>
          <div className="info-box">
            <div className="topic-row">
              <span className="name">{data.eventName}</span>
            </div>
          </div>
        </>
      )}
      {type === 'topics' && (
        <>
          <span className="title">Topics</span>
          <div className="info-box">
            {typeof data.topics === 'object' &&
              data.topics.map((c: string, i: number) => {
                return (
                  <div className="topic-row" key={i}>
                    <span className="number">{i}</span>
                    <span className="address">
                      <>
                        {i !== 0 && '>'} {c}
                      </>
                    </span>
                  </div>
                );
              })}
          </div>
        </>
      )}
      {type === 'data' && (
        <>
          <span className="title">Data</span>
          <div className="info-box">
            <div className="data-box">
              <div className="data-content">
                <p>{data.data}</p>
              </div>
              <div className="btn-box"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const LogsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  h5 {
    font-size: 12px;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.gray.gray3};
    width: 100%;
    text-align: left;
  }
  .logs-group {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    margin-top: 16px;
    .log-content-group + .log-content-group {
      padding-top: 40px;
      margin-top: 40px;
      border-top: 1px solid ${({ theme }) => theme.colors.gray.gray1};
    }
    .log-content-group {
      display: flex;
      align-items: stretch;
      justify-content: center;
      width: 100%;
      ${({ theme }) => theme.media.tablet`
          flex-wrap:wrap;
          flex-direction:column
          `}
      > span.number {
        width: 120px;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray3};
        ${({ theme }) => theme.media.tablet`
         width:unset
          `}
      }
      .log-content {
        flex: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 16px;
        ${({ theme }) => theme.media.tablet`
          width:100%;
          gap:32px;
          `}
        .row {
          display: flex;
          align-items: stretch;
          justify-content: center;
          width: 100%;
          gap: 24px;
          ${({ theme }) => theme.media.tablet`
          flex-direction: column;
          gap:4px
          `}
          > .title {
            width: 74px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            font-size: 14px;
            line-height: 1.6;
            color: ${({ theme }) => theme.colors.gray.gray4};
            ${({ theme }) => theme.media.tablet`
          justify-content:flex-start
          `}
            &.address {
              font-weight: 600;
            }
          }
          .info-box {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            gap: 8px;
            flex: 1;
            > div {
              &.address-row {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                p {
                  font-size: 14px;
                  line-height: 1.5;
                  color: ${({ theme }) => theme.colors.primary.primary6};
                  a {
                    color: ${({ theme }) => theme.colors.primary.primary6};
                    word-break: break-all;
                  }
                }
                a.link-btn {
                  margin-left: 8px;
                  background-color: ${({ theme }) => theme.colors.primary.primary1};
                  padding: 4px 6px;
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 4px;
                  text-decoration: none;
                  > span {
                    font-size: 12px;
                    line-height: 1.2;
                    color: ${({ theme }) => theme.colors.gray.gray4};
                  }
                  > img {
                    width: 16px;
                  }
                }
              }
              &.topic-row {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                ${({ theme }) => theme.media.tablet`
                  align-items:flex-start;
                `}
                span.name {
                  font-size: 14px;
                  line-height: 1.5;
                  color: ${({ theme }) => theme.colors.gray.gray3};
                }
                span.number {
                  font-size: 14px;
                  line-height: 1.5;
                  color: ${({ theme }) => theme.colors.gray.gray3};
                  padding: 4px 9px;
                  background: ${({ theme }) => theme.colors.gray.gray1};
                  border-radius: 4px;
                }
                span.address {
                  font-size: 14px;
                  line-height: 1.5;
                  color: ${({ theme }) => theme.colors.gray.gray6};
                  margin-left: 8px;
                  ${({ theme }) => theme.media.tablet`
              word-break:break-all
              `}
                }
              }
              &.data-box {
                padding: 18px 16px;
                background-color: ${({ theme }) => theme.colors.primary.primary12};
                border-radius: 8px;
                width: 100%;
                display: flex;
                align-items: stretch;
                justify-content: space-between;
                gap: 18px;
                .data-content {
                  flex: 1;
                  display: flex;
                  align-items: flex-start;
                  justify-content: flex-start;
                  flex-direction: column;
                  gap: 8px;
                  > p {
                    font-size: 14px;
                    line-height: 1.5;
                    color: ${({ theme }) => theme.colors.gray.gray6};
                    word-break: break-all;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Logs;
