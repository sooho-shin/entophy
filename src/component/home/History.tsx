import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import styled from 'styled-components';

import { useMainStore } from '../../store/main';
import SkeletonComponent from '../common/Skeleton';

const History: FC = () => {
  const { transactionHistory } = useMainStore((state) => state);
  const [chartData, setChartData] = useState<{ name: string; pv: string }[]>([]);
  const [maxData, setMaxData] = useState<number>(0);
  const [minData, setMinData] = useState<number>(0);

  useEffect(() => {
    const list = transactionHistory;
    const cList = [];
    let maxData = 0;
    let minData = 0;
    if (list) {
      for (const i of list) {
        const date = dayjs(Object.entries(i)[0][0]).format('dddd, MMMM D, YYYY');
        const value = Object.entries(i)[0][1];
        if (maxData < value) {
          maxData = value;
        }
        if (minData === 0 || minData > value) {
          minData = value;
        }
        cList.unshift({ name: date, pv: value.toString() });
      }
    }
    setMinData(minData);
    setMaxData(maxData);
    setChartData(cList);
  }, [transactionHistory]);

  return (
    <Wrapper>
      <h5>Transaction History (14 days)</h5>
      {transactionHistory ? (
        <div className="chart-box">
          <div className="content">
            {/* <div ref={amountRef} className="amount">
            <span>2M</span>
            <span>1M</span>
          </div> */}
            <ResponsiveContainer width={'100%'} height={60}>
              <LineChart data={chartData}>
                <YAxis domain={[minData, maxData + 100]} hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="pv"
                  isAnimationActive={false}
                  stroke="#538C9A"
                  strokeWidth={1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div
            className="date"
            // style={{
            //   paddingLeft: amountWidth,
            // }}
          >
            <span>{dayjs().add(-14, 'd').format('MMM D')}</span>
            <span>{dayjs().add(-8, 'd').format('MMM D')}</span>
            <span>{dayjs().add(-1, 'd').format('MMM D')}</span>
          </div>
        </div>
      ) : (
        <SkeletonComponent height="100%" />
      )}
    </Wrapper>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipBox>
        <p>{payload[0].payload.name}</p>
        <p>{`Transactions : ${payload[0].value}`}</p>
      </TooltipBox>
    );
  }

  return null;
};

const TooltipBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary.primary2};
  border-radius: 8px;
  background-color: #fff;
  padding: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 2px;
  > p {
    &:first-child {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
      font-weight: 400;
    }
    &:last-child {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray6};
      font-weight: 400;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 25%;
  ${({ theme }) => theme.media.tablet`
    width:100%;
    padding: 16px;
    ${'background: ' + theme.colors.gray.white};;
    border-radius: 16px;
    gap:0;
  `}

  .chart-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    .recharts-wrapper {
      cursor: cursor !important;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      ${({ theme }) => theme.media.tablet`
        gap:12px;
      `}
      .amount {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 12px;
        span {
          font-size: 12px;
          line-height: 1.2;
          color: ${({ theme }) => theme.colors.gray.gray3};
        }
      }
    }
    .date {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        font-size: 12px;
        line-height: 1.2;
        color: ${({ theme }) => theme.colors.gray.gray3};
      }
    }
  }

  > h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray5};
    width: 100%;
    ${({ theme }) => theme.media.tablet`
      margin-bottom:8px;
  `}
  }
`;

export default History;
