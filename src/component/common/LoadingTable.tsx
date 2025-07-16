import React from 'react';
import styled, { css } from 'styled-components';
import SkeletonComponent from './Skeleton';
import { useSearchParams } from 'react-router-dom';

const LoadingTable: React.FC<{ type?: string }> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const pageLimit = Number(searchParams.get('limit'));

  return (
    <Wrapper pageLimit={pageLimit} type={type}>
      <Table>
        <thead>
          <tr>
            <th>
              <SkeletonComponent />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <SkeletonComponent />
            </td>
          </tr>
          <tr style={{ opacity: 0.9 }}>
            <td>
              <SkeletonComponent height="18px" />
            </td>
          </tr>
          <tr style={{ opacity: 0.8 }}>
            <td>
              <SkeletonComponent height="18px" />
            </td>
          </tr>
          <tr style={{ opacity: 0.7 }}>
            <td>
              <SkeletonComponent height="18px" />
            </td>
          </tr>
          <tr style={{ opacity: 0.6 }}>
            <td>
              <SkeletonComponent height="18px" />
            </td>
          </tr>
          <tr style={{ opacity: 0.5 }}>
            <td>
              <SkeletonComponent height="18px" />
            </td>
          </tr>
          <tr style={{ opacity: 0.4 }}>
            <td>
              <SkeletonComponent height="18px" />
            </td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};
interface TableProps {
  pageLimit: number | null;
  type: string | undefined;
}

const Wrapper = styled.div<TableProps>`
  width: 100%;
  ${(props) => {
    if (props.pageLimit && props.pageLimit < 11) {
      return css`
        min-height: 400px;
      `;
    } else {
      return css`
        min-height: 956px;
      `;
    }
  }}
  ${(props) =>
    props.type === 'short' &&
    css`
      min-height: 300px;
    `}
`;

const Table = styled.table`
  /* background-color: #c6c6c6; */
  width: 100%;
  thead {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray1};
    &.detail {
      border-bottom: 0;
      background-color: ${({ theme }) => theme.colors.primary.primary1};
    }
  }
  th {
    padding: 8px 0px;
    width: 100%;
  }

  td {
    padding: 8px 0px;
  }
`;
export default LoadingTable;
