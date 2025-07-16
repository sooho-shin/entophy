// import React, { useEffect, useState } from 'react';
// import type { LinkProps } from 'react-router-dom';
// import { Link, useParams, useSearchParams } from 'react-router-dom';
// import styled from 'styled-components';

// import Internal from './datail/Internal';
// import Logs from './datail/Logs';
import Overview from './datail/Overview';

const Detail = () => {
  // const tabList = ['Overview', 'Internal Txns', 'Logs'];
  // const [searchParams] = useSearchParams();
  return (
    <>
      {/* <TabRow>
        {tabList.map((c, i) => {
          return (
            <li key={i}>
              <TabLink tab={c} isActive={tab === c}>
                <span>
                  {c} {c === 'Logs' ? '(3)' : undefined}
                </span>
              </TabLink>
            </li>
          );
        })}
      </TabRow> */}
      <Overview />
      {/* {(tab === 'Overview' || tab === null) && <Overview />} */}
      {/* {tab === 'Internal Txns' && <Internal />}
      {tab === 'Logs' && <Logs />} */}
    </>
  );
};
export default Detail;
