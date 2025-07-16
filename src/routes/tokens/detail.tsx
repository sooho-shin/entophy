import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import logo from '/images/token/ico_binance.svg';
import filter from '/images/icon/ico_filter.svg';
import TitleRow from '@/component/common/TitleRow';
import SearchRow from '@/component/common/SearchRow';
import { TabMenu } from '@/component/tokens/detail/TabMenu';
import {
  WhiteBox,
  WhiteBoxRow,
  WhiteBoxWrapper,
} from '@/component/tokens/detail/WhiteBox';
import { TitleBox } from '@/component/tokens/detail/TitleBox';
import { Table } from '@/component/tokens/detail/Table';
import { useTokenStore } from '@/store/token';
import Wrapper from '@/component/common/Wrapper';
import SkeletonComponent from '@/component/common/Skeleton';
import bignumberUtil from '@/utils/bignumber';
import ErrorComponent from '@/component/error/ErrorComponent';

type ContentType = {
  title: string;
  value: string;
};

const TokensDetail = () => {
  const { hash } = useParams();

  const { detailData, fetchTokenDetailData, resetAllData } = useTokenStore(
    (state) => state,
  );
  useEffect(() => {
    resetAllData();
    if (hash) {
      fetchTokenDetailData(hash);
    }
  }, [hash]);

  const data = [
    {
      overview: [
        {
          title: 'Total Supply',
          value:
            detailData && typeof detailData === 'object'
              ? bignumberUtil.formatNumber(detailData.total_supply)
              : null,
        },
        {
          title: 'Holders',
          value:
            detailData && typeof detailData === 'object'
              ? `${bignumberUtil.formatNumber(
                  detailData.holder_count.toString(),
                )} addresses`
              : null,
        },
        {
          title: 'Transfers',
          value:
            detailData &&
            typeof detailData === 'object' &&
            bignumberUtil.formatNumber(detailData.transfer_count.toString()),
        },
      ],
    },
    {
      summary: [
        {
          title: 'Contract',
          value: detailData && typeof detailData === 'object' && detailData.address,
          path:
            detailData && typeof detailData === 'object'
              ? `/address/${detailData.address}`
              : null,
        },
        {
          title: 'Decimals',
          value:
            detailData && typeof detailData === 'object'
              ? detailData.decimals || 'Not Decimals'
              : null,
        },
      ],
    },
  ];

  if (detailData === 'nodata') return <ErrorComponent />;

  return (
    <Wrapper>
      <TitleRow align>
        <>
          <img src={logo} alt="" />
          <h1>Token Details</h1>
          {detailData ? (
            <p>{detailData.name}</p>
          ) : (
            <SkeletonComponent width="100px" height="27px" />
          )}
        </>
      </TitleRow>
      <BadgeRow>
        {/* <Badge text="Stablecoin" />
        <Badge text="Binance-Peg" />  */}
      </BadgeRow>
      <WhiteBoxRow>
        <WhiteBox content={data[0]['overview'] as ContentType[]}>
          <TitleBox title="Overview" badge={[`${detailData?.symbol}`]} />
        </WhiteBox>
        <WhiteBox content={data[1]['summary'] as ContentType[]}>
          <TitleBox title="Profile Summary" menu />
        </WhiteBox>
      </WhiteBoxRow>
      <div className="box">
        <WhiteBoxWrapper pad={false}>
          <SearchBox>
            <p>
              <i />
              Filter by search word
            </p>
            <SearchRow
              placeholder="Search by Txn Hash / Address"
              width={296}
              inputName="address"
            />
          </SearchBox>
          <Content>
            <TabMenu load={detailData ? false : true} />
            <Table />
            {/* {(tabParam === 'Transfers' || !tabParam) && (
              <Table thead="Transfers" type={type} />
            )}
            {tabParam && tabParam !== 'Transfers' && <Table thead={tabParam} />} */}
          </Content>
        </WhiteBoxWrapper>
      </div>
    </Wrapper>
  );
};

const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0 24px 0;
  ${({ theme }) => theme.media.tablet`
    display:none
  `}
`;
const SearchBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray1};
  padding: 0 1.5rem 0.5rem 1.5rem;
  ${({ theme }) => theme.media.tablet`
    padding: 0 1rem;
    
  `}
  p {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    i {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url(${filter}) center no-repeat;
      background-size: cover;
      margin-right: 4px;
    }
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${({ theme }) => theme.colors.gray.gray5};
  }
`;

const Content = styled.div`
  padding: 0 1.5rem;
  ${({ theme }) => theme.media.tablet`
    padding: 0 1rem;
  `}
`;

export default TokensDetail;
