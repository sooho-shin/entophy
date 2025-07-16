import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';

const ButtonQR: FC<{ address: string | undefined }> = ({ address }) => {
  const [modalState, setModalState] = useState(false);
  return (
    <>
      <Button onClick={() => setModalState(true)}></Button>
      {modalState && (
        <Modal>
          <div className="content">
            <div className="top">
              <span>QR code and address</span>
              <button className="close" onClick={() => setModalState(false)}></button>
            </div>
            <div className="qrcode-container">
              <QRCodeSVG value={address ? address : ''} width={215} height={215} />
              <p>{address ? address : ''}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const Button = styled.button`
  width: 26px;
  height: 26px;
  background-image: url(/images/icon/ico_qr.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  margin-left: 0px;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  .content {
    width: 100%;
    max-width: 400px;
    background: ${({ theme }) => theme.colors.gray.white};
    border-radius: 8px;
    > .top {
      width: 100%;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      > span {
        font-weight: 600;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
      > button.close {
        width: 16px;
        height: 16px;
        background-image: url(/images/icon/ico_close.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .qrcode-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0 40px 0;
      > p {
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray3};
        word-break: break-all;
        padding: 0 16px;
      }
    }
  }
`;
export default ButtonQR;
