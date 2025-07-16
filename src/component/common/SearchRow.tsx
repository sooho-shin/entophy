import React, { FC, ChangeEvent, useRef } from 'react';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';

interface SearchRowProps {
  placeholder: string;
  width?: number;
  inputName?: string;
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchRow: FC<SearchRowProps> = ({
  placeholder,
  width = 456,
  onchange,
  inputName = 'search',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      width={width}
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputRef.current?.value) {
          const params = currentParams;
          delete params[inputName];
          navigate({
            pathname: location.pathname,
            search: createSearchParams(params).toString(),
          });
          return false;
        } else {
          navigate({
            pathname: location.pathname,
            search: createSearchParams({
              ...currentParams,
              [inputName]: inputRef.current?.value.trim(),
            }).toString(),
          });
        }
      }}
    >
      <button type="submit">
        <img src="/images/icon/ico_search.svg" alt="icoSearch" />
      </button>
      <input
        type="text"
        ref={inputRef}
        name={inputName}
        placeholder={placeholder}
        onChange={onchange}
      />
    </Box>
  );
};

const Box = styled.form<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
  border-radius: 8px;
  margin-bottom: 16px;
  img {
    width: 16px;
  }
  input {
    flex: 1;
    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray3};
    }
  }
  ${({ theme }) => theme.media.tablet`
   width:100%
    
  `}
`;
export default SearchRow;
