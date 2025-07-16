import React, { FC, useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { PC } from './MediaQuery';

const SearchBoxHome: FC<{ main?: boolean }> = ({ main }) => {
  const [filterOpenState, setFilterOpenState] = useState(false);
  const [currentFilterState, setCurrentFilterState] = useState<number>(0);
  // const [searchParams] = useSearchParams();
  // const currentParams = Object.fromEntries([...searchParams]);
  const location = useLocation();
  const [filterList] = useState<Array<string>>([
    'All Filters',
    'Block',
    'Txn Hash',
    'Address',
  ]);
  const [placeholder, setPlaceholder] = useState<string>(
    'Search by Block / Txn Hash / Address',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentFilterState(0);
    setFilterOpenState(false);
  }, [location.pathname]);

  const selectFilter = useCallback(
    (i: number) => {
      setCurrentFilterState(i);
      setFilterOpenState(false);
    },
    [filterList],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputRef.current) return false;

      let value = inputRef.current.value;
      if (!value) return false;
      // 한글 이면 막음
      if (!/^[A-Za-z0-9+]*$/.test(value)) {
        navigate(`/searchError`);
        return false;
      }
      // 40자리이거나 64자리이고 숫자만 있는거 아니면 0x추가
      if (!/^[0-9]*$/.test(value) && value.length === 40) {
        value = '0x' + value;
      }
      if (!/^[0-9]*$/.test(value) && value.length === 64) {
        value = '0x' + value;
      }

      let url = '';
      // filter all 일때
      if (currentFilterState === 0) {
        if (/^[0-9]*$/.test(value)) {
          url = '/blocks/';
        } else if (value.length === 40 || value.length === 42) {
          url = '/address/';
        } else if (value.length === 64 || value.length === 66) {
          url = '/tx/';
        }
      }
      // Filter block 일떄
      if (currentFilterState === 1) {
        // 한글안됨
        if (!/^[0-9]*$/.test(value)) {
          navigate(`/searchError`);
          return false;
        }
        url = '/blocks/';
      }
      // Filter tx 일떄
      if (currentFilterState === 2) {
        if (/^[0-9]*$/.test(value) || value.length !== 66) {
          navigate(`/searchError`);
          return false;
        }
        url = '/tx/';
      }
      // Filter address 일떄
      if (currentFilterState === 3) {
        if (/^[0-9]*$/.test(value) || value.length !== 42) {
          navigate(`/searchError`);
          return false;
        }
        url = '/address/';
      }

      // // 숫자가 아니고 길이가 42 66이 아니면 안됨
      // if (!/^[0-9]*$/.test(value) && !(value.length === 42 || value.length === 66)) {
      //   navigate(`/searchError`);
      //   return false;
      // }

      if (url) {
        inputRef.current.value = '';
        navigate(`${url}${value}`);
      } else {
        navigate(`/searchError`);
        return false;
      }
    },
    [inputRef, currentFilterState],
  );

  return (
    <Wrapper main={main}>
      {main && <h5>TESTNET DeadCat (ENTROPY) Explorer</h5>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <PC>
          <FilterButton
            type="button"
            onClick={() => setFilterOpenState(!filterOpenState)}
            main={main}
          >
            <span>{filterList[currentFilterState]}</span>
            <img src="/images/icon/ico_dropdown_p.svg" alt="icoArrow" />
          </FilterButton>
        </PC>
        <input type="text" placeholder={placeholder} ref={inputRef} />
        <button type="submit" className="submit-btn" />
        <PC>
          {filterOpenState && (
            <FilterBox>
              <ul>
                {filterList.map((c, i) => {
                  return (
                    <li
                      key={i}
                      className={i === currentFilterState ? 'active' : undefined}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          selectFilter(i);
                          switch (i) {
                            case 0:
                              setPlaceholder('Search by Block / Txn Hash / Address');
                              break;
                            case 1:
                              setPlaceholder('Search by Block');
                              break;
                            case 2:
                              setPlaceholder('Search by Txn Hash');
                              break;
                            case 3:
                              setPlaceholder('Search by Address');
                              break;
                            default:
                              setPlaceholder('Search by Block / Txn Hash / Address');
                          }
                        }}
                      >
                        {c}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </FilterBox>
          )}
        </PC>
      </form>
    </Wrapper>
  );
};

const FilterBox = styled.div`
  padding: 16px 8px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid ${({ theme }) => theme.colors.primary.primary6};
  box-sizing: border-box;
  border-radius: 8px;
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 120px;
      height: 29px;
      padding-left: 16px;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 400;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        background: ${({ theme }) => theme.colors.primary.primary1};
        border-radius: 4px;
      }
      button {
        color: ${({ theme }) => theme.colors.gray.gray3};
        width: 100%;
        text-align: left;
      }
      &.active {
        button {
          color: ${({ theme }) => theme.colors.gray.gray6};
        }
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.primary1};
      }
    }
  }
`;

const FilterButton = styled.button<{ main: boolean | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  > span {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray4};
    ${(props) =>
      !props.main &&
      css`
        color: ${({ theme }) => theme.colors.primary.primary11};
      `}
  }
`;

const Wrapper = styled.div<{ main: boolean | undefined }>`
  width: 100%;
  max-width: 690px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  ${(props) =>
    props.main &&
    css`
      max-width: 100%;
    `}

  ${({ theme }) => theme.media.tablet`
    gap: 8px;
  `}

  h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray5};
  }
  form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 40px;
    width: 100%;
    height: 100%;
    padding: 0 24px;
    gap: 16px;
    position: relative;

    ${({ theme }) => theme.media.tablet`
      padding: 0 16px;
    `}

    ${(props) =>
      props.main &&
      css`
        max-width: 100%;
        background-color: #fff;
        border: 1px solid ${({ theme }) => theme.colors.gray.gray7};
        box-sizing: border-box;
        border-radius: 40px;
        height: 56px;

        ${({ theme }) => theme.media.tablet`
          padding: 0 16px;
          height:40px;
        `}
      `}
    > input {
      flex: 1;
      color: #fff;
      /* ${({ theme }) => theme.media.tablet`
        font-size: 12px;
      `} */
      ${(props) =>
        props.main &&
        css`
          color: #000;
        `}

      &::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray2};
        ${(props) =>
          !props.main &&
          css`
            color: ${({ theme }) => theme.colors.gray.gray4};
          `}
        ${({ theme }) => theme.media.tablet`
              font-size: 12px;
        `}
      }
    }
    .submit-btn {
      width: 24px;
      height: 24px;
      background-image: url(/images/icon/ico_search_h.svg);
      background-size: cover;
      background-position: center;
    }
  }
`;

export default SearchBoxHome;
