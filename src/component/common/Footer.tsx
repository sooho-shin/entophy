import { FC } from 'react';
import styled from 'styled-components';

const Footer: FC = () => {
  return (
    <Wrapper>
      <img src="/images/img_logo_f.svg" alt="imgLogo" />
      <div>
        <div className="link-row">
          {/* <a href="https://www.naver.com/" target="_blank" rel="noreferrer">
            <img src="/images/icon/ico_matamask.svg" alt="icoMetamask" />
            <span>ADD NETWORK</span>
          </a>
          <span></span>
          <a href="https://www.naver.com/" target="_blank" rel="noreferrer">
            <img src="/images/icon/ico_move.svg" alt="icoMove" />
            <span>NETWORK STATUS</span>
          </a>
          <span></span> */}
          <a href="mailto:sooho.shin@monoverse.io">
            <img src="/images/icon/ico_mail.svg" alt="icoMail" />
            <span>CONTACT</span>
          </a>
        </div>
        <p>TESTNET DeadCat (ENTROPY) Explorer © 2022</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.explorer.gray2};
  padding: 24px 48px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
  left: 0;
  bottom: 0;
  ${({ theme }) => theme.media.tablet`
     padding:1rem 1rem 20px
  `}
  > img {
    width: 128px;

    ${({ theme }) => theme.media.tablet`
      width:86px;
  `}
  }

  > div {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    ${({ theme }) => theme.media.tablet`
    gap: 24px;
  `}

    .link-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      ${({ theme }) => theme.media.tablet`
    flex-direction:column;
      align-items: flex-end;
      gap: 16px;
  `}
      > span {
        width: 2px;
        height: 2px;
        background: ${({ theme }) => theme.colors.gray.gray3};
        ${({ theme }) => theme.media.tablet`
    display:none;
  `}
      }
      > a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
        > img {
          width: 16px;
        }
        > span {
          font-size: 12px;
          line-height: 1.2;
          color: ${({ theme }) => theme.colors.gray.gray3};
          text-decoration: none;
        }
      }
    }

    > p {
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray3};
    }
  }
`;

export default Footer;
