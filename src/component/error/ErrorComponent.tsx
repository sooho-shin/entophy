import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

interface ErrorComponentProps {
  children?: React.ReactNode | null;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <WrapperError>
      {children || (
        <div className="content">
          <h1>No search results</h1>
          <p className="search-info">
            Sorry, your search did not match any results.
            <br />
            Please check your spelling and try again.
          </p>
          <div className="serch-arg">
            <div className="row">
              <span>Address</span>
              <span>42 characters (0x~)</span>
            </div>
            <div className="row">
              <span>txn hash</span>
              <span>66 characters (0x~)</span>
            </div>
            <div className="row">
              <span>block</span>
              <span>Decimal (00000000)</span>
            </div>
          </div>
          <p>
            or Do you want go to the <Link to={'/'}>home</Link> and{' '}
            <button type="button" onClick={() => navigate(-1)}>
              back
            </button>
            ?
          </p>
          <img
            className="img-search"
            src="/images/img_bg_search.svg"
            alt="search error"
          />
        </div>
      )}
    </WrapperError>
  );
};

const WrapperError = styled.div`
  width: 100%;
  padding: 146px 87px;
  height: 800px;
  @media (max-width: 900px) {
    padding: 20px;
    padding-bottom: 60px;
    height: auto;
  }
  > .content {
    width: 100%;
    height: 100%;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    h4 {
      font-weight: 600;
      font-size: 20px;
      line-height: 1.5;
      color: #312952;
      margin-bottom: 16px;
    }
    h1 {
      font-weight: 800;
      font-size: 32px;
      line-height: 1.5;
      color: #312952;
      margin-bottom: 16px;
    }
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      color: #312952;
      text-shadow: 1px 1px 2px #eff0f4;
      a,
      button {
        color: ${({ theme }) => theme.colors.primary.primary5};
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
      }
      &.search-info {
        margin-bottom: 24px;
      }
    }
    img {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: -1;
      @media (max-width: 900px) {
        position: relative;
        margin-top: 24px;
        width: 90%;
        max-width: 400px;
      }
      /* &.img-404 {
        width: 520px;
      } */
    }
    .serch-arg {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      margin-bottom: 48px;

      .row {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          &:first-child {
            width: 190px;
            font-weight: 600;
            font-size: 16px;
            line-height: 1.5;
            color: #312952;
            @media (max-width: 900px) {
              width: 100px;
            }
          }
          &:last-child {
            font-weight: 400;
            font-size: 16px;
            line-height: 1.5;
            color: #312952;
          }
        }
      }
    }
  }
`;
export default ErrorComponent;
