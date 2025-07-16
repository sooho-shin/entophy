import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logs: FC = () => {
  return (
    <LogsWrapper>
      <h5>Transaction Receipt Event Logs</h5>
      <div className="logs-group">
        <div className="log-content-group">
          <span className="number">512</span>
          <div className="log-content">
            <Row type="address" />
            <Row type="topics" />
            <Row type="data" />
          </div>
        </div>
        <div className="log-content-group">
          <span className="number">513</span>
          <div className="log-content">
            <Row type="address" />
            <Row type="topics" />
            <Row type="data" />
          </div>
        </div>
      </div>
    </LogsWrapper>
  );
};

interface RowProps {
  type?: string;
}

const Row: FC<RowProps> = ({ type }) => {
  return (
    <div className="row">
      {type === 'address' && (
        <>
          <span className="title address">Address</span>
          <div className="info-box">
            <div className="address-row">
              <p>0xba2ae424d960c26247dd6c32edc70b295c744c43</p>
              <Link className="link-btn" to="https://www.naver.com/">
                <span>Matches Topic [0]</span>
                <img src="/images/icon/ico_move_right.svg" alt="icoMoveRight" />
              </Link>
            </div>
          </div>
        </>
      )}
      {type === 'topics' && (
        <>
          <span className="title">Topics</span>
          <div className="info-box">
            <div className="topic-row">
              <span className="number">0</span>
              <span className="address">
                0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
              </span>
            </div>
            <div className="topic-row">
              <span className="number">1</span>
              <span className="address">
                {'>'} 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
              </span>
            </div>
            <div className="topic-row">
              <span className="number">2</span>
              <span className="address">
                {'>'} 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
              </span>
            </div>
          </div>
        </>
      )}
      {type === 'data' && (
        <>
          <span className="title">Data</span>
          <div className="info-box">
            <div className="data-box">
              <div className="data-content">
                <p>0x000000000000000000000000a3282f190abd0772fef84189c6ade1e339ca050f</p>
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
      > span.number {
        width: 120px;
        flex: 120px 0 0;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray3};
      }
      .log-content {
        flex: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 16px;
        .row {
          display: flex;
          align-items: stretch;
          justify-content: center;
          width: 100%;
          gap: 24px;
          > .title {
            width: 74px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            font-size: 14px;
            line-height: 1.6;
            color: ${({ theme }) => theme.colors.gray.gray4};
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
                }
              }
              &.data-box {
                padding: 18px 16px;
                background: ${({ theme }) => theme.colors.primary.primary1};
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
