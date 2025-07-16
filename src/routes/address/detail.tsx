import Wrapper from '@/component/common/Wrapper';
import ErrorComponent from '@/component/error/ErrorComponent';
import { useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Detail from '../../component/address/Detail';
import InfoBox from '../../component/address/InfoBox';
import ButtonQR from '../../component/common/ButtonQR';
import TitleRow from '../../component/common/TitleRow';
import { useAddressStore } from '../../store/address';

const AccountsDetail = () => {
  const { detailData, fetchAddressDetailData, resetAddressDetailData } = useAddressStore(
    (state) => state,
  );
  const { address } = useParams<'address'>();

  useEffect(() => {
    // useAddressStore.setState(detailData, []);
    resetAddressDetailData();

    if (address) fetchAddressDetailData(address);
  }, [address]);
  if (detailData === 'nodata') return <ErrorComponent />;
  return (
    <Wrapper>
      <TitleRow>
        <>
          <h1 style={{ textTransform: 'capitalize' }}>{detailData?.type}</h1>
          <p>{address}</p>
          <CopyToClipboard text={address ? address : ''}>
            <CopyButton />
          </CopyToClipboard>
          <ButtonQR address={address} />
        </>
      </TitleRow>
      <div className="row-box">
        <WhiteBox>
          <InfoBox />
        </WhiteBox>

        {detailData && detailData.type === 'contract' && (
          <WhiteBox>
            <InfoBox contract={true} />
          </WhiteBox>
        )}
      </div>
      <Detail />
    </Wrapper>
  );
};

const CopyButton = styled.button`
  width: 26px;
  height: 26px;
  background-image: url(/images/icon/ico_copy_p.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  margin-left: 4px;
`;

// const Wrapper = styled.div`
//   padding: 40px 24px 60px 24px;

//   > .row {
//     display: flex;
//     align-items: stretch;
//     justify-content: space-between;
//     gap: 24px;
//     ${({ theme }) => theme.media.tablet`
//     flex-direction:column;
//     gap:16px;
//   `}
//     >div {
//       ${({ theme }) => theme.media.tablet`
//     margin-top:0px
//   `}
//     }
//   }
// `;

const WhiteBox = styled.div`
  width: 100%;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.gray.white};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  ${({ theme }) => theme.media.tablet`
      padding:1rem;
      margin-top: 1rem;
    `}
`;

export default AccountsDetail;
