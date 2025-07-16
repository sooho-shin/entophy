import { usePaginationStore } from '@/store/pagination';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Pagination: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const page = Number(searchParams.get('page'));
  const currentParams = Object.fromEntries([...searchParams]);
  // const location = useLocation();
  const { totalPage } = usePaginationStore((state) => state);

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [page]);

  const handleClick = useCallback(
    (page: number) => {
      if (page > 0) {
        setSearchParams({ ...currentParams, page: page.toString() });
        setCurrentPage(page);
      }
      // window.location.reload();
    },
    [currentPage, currentParams],
  );

  return (
    <PagingBox>
      <GotoFirstBtn
        className={currentPage === 1 ? 'disabled' : undefined}
        onClick={() => handleClick(1)}
      />
      <GotoLeftBtn
        className={currentPage === 1 ? 'disabled' : undefined}
        onClick={() => handleClick(currentPage - 1)}
      />
      <div className="page-info">
        <span>{currentPage}</span>
        <span>/</span>
        <span>{totalPage || 1}</span>
      </div>
      <GotoRightBtn
        className={currentPage === totalPage || totalPage === 0 ? 'disabled' : undefined}
        onClick={() => {
          if (currentPage === totalPage || totalPage === 0) return false;
          handleClick(currentPage + 1);
        }}
      />
      <GotoLastBtn
        className={currentPage === totalPage || totalPage === 0 ? 'disabled' : undefined}
        onClick={() => handleClick(totalPage || 1)}
      />
    </PagingBox>
  );
};

const GotoFirstBtn = styled.button`
  background-image: url('/images/icon/ico_chevron_first.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const GotoLeftBtn = styled.button`
  background-image: url('/images/icon/ico_chevron_left.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const GotoRightBtn = styled.button`
  background-image: url('/images/icon/ico_chevron_right.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const GotoLastBtn = styled.button`
  background-image: url('/images/icon/ico_chevron_last.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PagingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  button {
    width: 24px;
    height: 24px;
    &.disabled {
      opacity: 0.4;
      cursor: initial;
    }
  }
  .page-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    span {
      font-size: 14px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray.gray3};
      &:first-child {
        color: ${({ theme }) => theme.colors.gray.gray6};
      }
    }
  }
`;

export default Pagination;
