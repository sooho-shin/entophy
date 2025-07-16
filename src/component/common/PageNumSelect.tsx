import { FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PageNumSelect: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumList = [10, 25, 50, 100];
  const [pageNum, setPageNum] = useState(pageNumList[1]);
  const [dropdownState, setDropdownState] = useState(false);
  const num = Number(searchParams.get('limit'));
  const currentParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const num = Number(searchParams.get('limit'));
    if (num) setPageNum(num);
  }, [num]);

  const handleClick = useCallback(
    (pageNum: number) => {
      if (pageNum > 0) {
        setSearchParams({ ...currentParams, page: '1', limit: pageNum.toString() });
        setPageNum(pageNum);
        setDropdownState(false);
      }
      // window.location.reload();
    },
    [pageNum, currentParams],
  );

  return (
    <Box>
      <span>show</span>
      <SelectBox dropdownState={dropdownState}>
        <button type="button" onClick={() => setDropdownState(!dropdownState)}>
          <span>{pageNum}</span>
          <img
            src="/images/icon/ico_dropdown_p.svg"
            alt="icoArrow"
            style={{ transform: `rotate(${dropdownState ? '18' : '0'}0deg)` }}
          />
        </button>
        {dropdownState && (
          <div className="option-group">
            {pageNumList.map((n, i) => {
              return (
                <button key={i} type="button" onClick={() => handleClick(n)}>
                  <span>{n}</span>
                </button>
              );
            })}
          </div>
        )}
      </SelectBox>
      <span>Records</span>
    </Box>
  );
};

interface SelectBoxProps {
  dropdownState: boolean;
}
const SelectBox = styled.div`
  position: relative;
  width: 64px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
  border-radius: 8px;
  padding: 8px;
  ${(props: SelectBoxProps) =>
    props.dropdownState &&
    css`
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    `}
  .option-group {
    width: calc(100% + 2px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    padding-top: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    background: #fff;
    border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
    border-top: none;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
    z-index: 200;
    button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 4px;
      border-radius: 4px;
      &:hover {
        background: ${({ theme }) => theme.colors.primary.primary1};
      }
      > span {
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray.gray3};
      }
    }
  }
  > button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 4px;
    > span {
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray6};
    }
    img {
      width: 16px;
    }
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  > span {
    font-size: 14px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray.gray3};
  }
`;

export default PageNumSelect;
