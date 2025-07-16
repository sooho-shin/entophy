import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  text?: string;
}

const Checkbox: FC<CheckboxProps> = ({ state, setState, text }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Box>
      <input
        type="checkbox"
        id="check"
        ref={ref}
        onChange={() => {
          if (ref.current) {
            setState(ref.current.checked);
          }
        }}
      />
      <label htmlFor="check">
        <div className={`checkbox ${state ? 'active' : ''}`}></div>
        <span>{text}</span>
      </label>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  .checkbox {
    width: 14px;
    height: 14px;
    border: 1px solid #7857d3;
    &.active {
      background-color: #7857d3;
      background-image: url(/images/icon/ico_check_w.svg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 8px;
    }
  }

  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    > span {
      font-weight: 400;
      font-size: 12px;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray.gray6};
    }
  }
`;

export default Checkbox;
