import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import SearchBox from './SearchBox';
import { useSearchParams } from 'react-router-dom';

type TheadListType = {
  name: string;
  tooltip?: { name: string };
  to?: boolean;
  sort?: boolean;
  order?: string | null;
  active?: boolean;
  filter?: { [key: string]: string };
  callback?: () => void;
};
interface TablePaginationProps {
  theadList: Array<TheadListType>;
  type?: string;
  verticalAlign?: string;
  children: React.ReactNode;
}

const TablePagination: FC<TablePaginationProps> = ({
  theadList,
  children,
  type,
  verticalAlign = 'middle',
}) => {
  // useEffect(() => {
  //   console.log(theadList);
  // }, [theadList]);
  const [searchParams] = useSearchParams();
  const pageLimit = Number(searchParams.get('limit'));
  return (
    <Wrapper verticalAlign={verticalAlign} pageLimit={pageLimit} className="wrapper">
      <table>
        <thead className={type === 'detail' ? 'detail' : undefined}>
          <tr>
            {theadList ? (
              theadList.map((c: TheadListType, i: number) => {
                return (
                  <Th
                    key={i}
                    className={`${c.active ? 'active' : ''} ${c.to ? 'to' : ''}`}
                    data={c}
                  ></Th>
                );
              })
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </Wrapper>
  );
};

interface ThProps {
  data: TheadListType;
  className: string;
}

const Th: FC<ThProps> = ({ data, className }) => {
  const [searchBoxState, setSearchBoxState] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  return (
    <th className={className}>
      <p>
        <span>{data.name}</span>
        {data.tooltip ? (
          <span
            style={{ position: 'relative', height: '16px' }}
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
          >
            <button className="tooltip" type="button"></button>
            {tooltip && <TooltipBox>{data.tooltip.name}</TooltipBox>}
          </span>
        ) : undefined}
        {data.sort ? (
          <SortBtn callback={data.callback} order={data.order || ''} />
        ) : undefined}
        {data.filter ? (
          <button
            className="filter"
            type="button"
            onClick={() => setSearchBoxState(!searchBoxState)}
          ></button>
        ) : undefined}
      </p>
      {data.filter && searchBoxState && (
        <CustomSearchBox
          placeholder={data.filter.placeholder}
          submitBtnText={data.filter.submitBtnText}
          callback={() => setSearchBoxState(!searchBoxState)}
        />
      )}
    </th>
  );
};

const CustomSearchBox = styled(SearchBox)`
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 10;
`;

interface SortBtnProps {
  callback?: () => void;
  order?: string;
}

const SortBtn: FC<SortBtnProps> = ({ callback, order }) => {
  return <button className={`sort ${order}`} type="button" onClick={callback}></button>;
};

interface TableProps {
  verticalAlign: string;
  pageLimit: number | null;
}

const Wrapper = styled.div<TableProps>`
  width: 100%;
  /* ${(props) => {
    if (props.pageLimit && props.pageLimit < 11) {
      return css`
        min-height: 400px;
      `;
    } else {
      return css`
        min-height: 956px;
      `;
    }
  }} */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow-x: scroll;

  /* overflow: visible; */
  /* ${({ theme }) => theme.media.etc`
   overflow-x:scroll
  `} */
  > table {
    width: 100%;
    thead {
      background-color: ${({ theme }) => theme.colors.primary.primary12};
      &.detail {
        border-bottom: 0;
        background-color: ${({ theme }) => theme.colors.primary.primary12};
      }
    }

    th,
    td {
      &.to {
        padding-left: 48px;
        img {
          &.ico-arrow-circle {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    th {
      padding: 8px 24px;
      text-align: left;
      font-size: 12px;
      line-height: 1.2;
      text-transform: capitalize;
      color: ${({ theme }) => theme.colors.gray.gray3};
      position: relative;
      &.active {
        color: ${({ theme }) => theme.colors.primary.primary6};
      }
      p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;
        position: relative;
        button.filter {
          width: 16px;
          height: 16px;
          background-image: url(/images/icon/ico_filter.svg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        button.tooltip {
          width: 16px;
          height: 16px;
          background-image: url(/images/icon/ico_tooltip.svg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
        }
        button.sort {
          width: 16px;
          height: 16px;
          background-image: url(/images/icon/ico_sort_down.svg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          &.asc {
            background-image: url(/images/icon/ico_sort_up.svg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
      }
    }

    td {
      padding: 8px 24px;
      /* ${({ theme }) => theme.media.tablet`
   padding: 8px 24px;
  `} */
      text-align: left;
      font-size: 14px;
      line-height: 1.5;
      vertical-align: ${(props) => props.verticalAlign};
      position: relative;
      > div.token-info-group {
        display: inline-flex;
        align-items: flex-start;
        justify-content: center;
        gap: 8px;
        width: 100%;
        &.flex-center {
          align-items: center;
        }
        > img {
          width: 16px;
          flex: 16px 0 0;
          /* padding-top: 2px; */
        }
        > div.token-info {
          /* width: 176px;
          flex: 175px 0 0; */
          width: 100%;
          text-align: left;
          word-break: keep-all;
          white-space: nowrap;
          &.long {
            /* width: 190px;
            flex: 190px 0 0; */
          }
          > a {
            color: ${({ theme }) => theme.colors.primary.primary6};
            word-break: keep-all;
            &.disabled {
              pointer-events: none;
              color: ${({ theme }) => theme.colors.gray.gray6};
            }
          }
          > p {
            font-weight: 400;
            font-size: 14px;
            line-height: 1.5;
            white-space: nowrap;
            color: ${({ theme }) => theme.colors.primary.primary6};
            &.sub {
              font-size: 12px;
              color: ${({ theme }) => theme.colors.gray.gray3};
              margin-top: 4px;
            }
            a {
              color: ${({ theme }) => theme.colors.primary.primary6};
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
            span {
              &.token-address {
                max-width: 93px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                text-transform: capitalize;
              }
              &.symbol {
                max-width: 50px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                text-transform: capitalize;
              }
            }
          }
          > span {
            font-weight: 400;
            font-size: 12px;
            line-height: 1.2;
            color: ${({ theme }) => theme.colors.gray.gray4};

            padding: 4px 6px;
            margin-top: 8px;
          }
        }
      }
      > p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .mg-l {
          margin-left: 4px;
        }
        img {
          width: 16px;
          margin-right: 4px;
          &.ico-danger {
          }
        }
        > a {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          &.active {
            color: ${({ theme }) => theme.colors.primary.primary6};
          }
          &.disabled {
            pointer-events: none;
            color: ${({ theme }) => theme.colors.gray.gray6};
          }
        }
        span {
          display: inline-block;
          white-space: nowrap;
          color: ${({ theme }) => theme.colors.gray.gray6};
          a {
            text-decoration: none;
            color: inherit;
          }
          &.pale {
            color: #7857d3;
          }
          &.active {
            color: ${({ theme }) => theme.colors.primary.primary6};
          }
          &.sub {
            color: ${({ theme }) => theme.colors.gray.gray3};
          }
          &.blk {
            color: ${({ theme }) => theme.colors.primary.primary10};
          }
          &.deep {
            color: ${({ theme }) => theme.colors.gray.gray4};
          }
          &.small {
            font-size: 12px;
          }
          &.sq {
            padding: 4.5px 6px;
            border-radius: 4px;
            background: ${({ theme }) => theme.colors.gray.gray8};
          }

          &.address {
            max-width: 130px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &.method {
            max-width: 123px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-transform: capitalize;
          }
          &.amount {
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &.percent {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.gray.gray3};
            display: inline-block;
            margin-left: 4px;
          }
          &.margin {
            margin-left: 4px;
          }
          &.variance {
            padding: 4px;
            border-radius: 4px;
            font-weight: 400;
            font-size: 12px;
            line-height: 1.2;
            display: flex;
            align-items: center;
            justify-content: center;
            &.down {
              background: #fff0ed;
              color: ${({ theme }) => theme.colors.danger};
              &::before {
                content: '';
                width: 16px;
                height: 16px;
                display: block;
                background-image: url(/images/icon/ico_dropdown_r.svg);
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
              }
            }
          }
          &.status {
            width: 51px;
            height: 24px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 9px;
            gap: 8px;
            font-size: 12px;
            line-height: 1.2;
            &.success {
              background-color: #f0fff1;
              color: #0aaa23;
              &::before {
                content: '';
                width: 4px;
                height: 4px;
                display: block;
                border-radius: 100%;
                background-color: ${({ theme }) => theme.colors.active};
              }
            }
            &.fail {
              background-color: #fff0ed;
              color: ${({ theme }) => theme.colors.danger};
              &::before {
                content: '';
                width: 6px;
                height: 6px;
                display: block;
                border-radius: 100%;
                background-color: ${({ theme }) => theme.colors.danger};
              }
            }
          }
        }
      }

      > .progress-bar {
        width: 168px;
        height: 2px;
        background: ${({ theme }) => theme.colors.explorer.gray1};
        border-radius: 2px;
        margin-top: 4px;
        > div {
          height: 100%;
          background: ${({ theme }) => theme.colors.primary.primary6};
          border-radius: 2px;
        }
      }
    }
  }
`;
const TooltipBox = styled.span`
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 10;
  color: #fff;
  padding: 8px 12px;
  width: 200px;
  background: ${({ theme }) => theme.colors.gray.gray3};
  border-radius: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
`;
export default TablePagination;
