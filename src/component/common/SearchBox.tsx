import { FC } from 'react';
import styled from 'styled-components';

interface SearchBoxProps {
  callback: () => void;
  className?: never;
  placeholder: string;
  submitBtnText: string;
}

const SearchBox: FC<SearchBoxProps> = ({
  callback,
  className,
  placeholder,
  submitBtnText,
}) => {
  return (
    <Box className={className}>
      <div className="fixed">
        <div className="input-box">
          <img src="/images/icon/ico_search.svg" alt="icoSearch" />
          <input type="text" name="address" placeholder={placeholder} />
        </div>
        <div className="btn-row">
          <button type="submit">{submitBtnText}</button>
          <button type="button" onClick={() => callback()}>
            cancel
          </button>
        </div>
      </div>
    </Box>
  );
};

const Box = styled.form`
  > .fixed {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    position: fixed;
    background: ${({ theme }) => theme.colors.gray.white};
    box-shadow: 0px 1px 12px rgba(28, 13, 44, 0.15);
    border-radius: 8px;
    padding: 8px;
  }
  .btn-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    > button {
      flex: 1;
      height: 40px;

      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      line-height: 1.2;

      &:first-child {
        background: ${({ theme }) => theme.colors.primary.primary6};
        color: #fff;
      }
      &:last-child {
        color: ${({ theme }) => theme.colors.gray.gray3};
      }
    }
  }

  .input-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 12px;
    background: #fff;
    border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
    border-radius: 8px;
    > img {
      width: 16px;
    }
    input {
      flex: 1;
      font-size: 12px;
      line-height: 1.2;
      &::placeholder {
        font-size: 12px;
        line-height: 1.2;
        color: ${({ theme }) => theme.colors.gray.gray3};
      }
    }
  }
`;

export default SearchBox;
