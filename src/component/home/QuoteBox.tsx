import config from '@/config';
import { FC } from 'react';
import styled from 'styled-components';

const QuoteBox: FC = () => {
  return (
    <Box>
      <img src="/images/img_{config.TOKEN}.svg" alt="img{config.TOKEN}" />
      <div className="info">
        <span>{config.TOKEN} Token</span>
        <div>
          <span>2.3778 USD</span>
          <div className="yield">
            <span>-</span>
            <span>9.76</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </Box>
  );
};

const Box = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 32px;
  }
  > .info {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 12px;
    > span {
      &:first-child {
        font-size: 12px;
        line-height: 1.2;
        color: ${({ theme }) => theme.colors.gray.gray3};
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        font-weight: 600;
        font-size: 20px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.primary.primary10};
      }
      > .yield {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        span {
          font-size: 14px;
          line-height: 1.5;
          color: ${({ theme }) => theme.colors.danger};

          &:first-child {
            margin-right: 4px;
          }
          &:nth-child(2) {
            margin-right: 2px;
          }
        }
      }
    }
  }
`;

export default QuoteBox;
