import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
// const Layout = lazy(() => import('./component/common/Layout'));
// const NotFoundPage = lazy(() => import('./routes/error/404'));
// // const Accounts = lazy(() => import('./routes/address'));
// // const Contracts = lazy(() => import('./routes/address/contracts'));
// const AccountsDetail = lazy(() => import('./routes/address/detail'));
// const Blocks = lazy(() => import('./routes/blocks'));
// const BlocksDetail = lazy(() => import('./routes/blocks/detail'));
// const Home = lazy(() => import('./routes/home'));
// // const MarketCap = lazy(() => import('./routes/tokens/marketcap'));
// const TokensDetail = lazy(() => import('./routes/tokens/detail'));
// const Transfer20 = lazy(() => import('./routes/tokens/transfer20'));
// const Transfer721 = lazy(() => import('./routes/tokens/transfer721'));
// const Transfer1155 = lazy(() => import('./routes/tokens/transfer1155'));
// const Rank20 = lazy(() => import('./routes/tokens/rank20'));
// const Txns = lazy(() => import('./routes/tx'));
// const TransactionDetail = lazy(() => import('./routes/tx/detail'));
// const Internal = lazy(() => import('./routes/tx/internal'));
// const Pending = lazy(() => import('./routes/tx/pending'));
// const Rank721 = lazy(() => import('./routes/tokens/rank721'));
// const Rank1155 = lazy(() => import('./routes/tokens/rank1155'));
// const ErrorSearch = lazy(() => import('./routes/error/search'));
// const ErrorTraffic = lazy(() => import('./routes/error/traffic'));

import GlobalStyle from './styles/global';
import theme from './styles/theme';
import { ThemeProvider } from './styles/themed-components';
import Faucet from './routes/faucet';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import Layout from './component/common/Layout';
import AccountsDetail from './routes/address/detail';
import Blocks from './routes/blocks';
import BlocksDetail from './routes/blocks/detail';
import NotFoundPage from './routes/error/404';
import ErrorSearch from './routes/error/search';
import ErrorTraffic from './routes/error/traffic';
import Home from './routes/home';
import TokensDetail from './routes/tokens/detail';
import Rank1155 from './routes/tokens/rank1155';
import Rank20 from './routes/tokens/rank20';
import Rank721 from './routes/tokens/rank721';
import Transfer1155 from './routes/tokens/transfer1155';
import Transfer20 from './routes/tokens/transfer20';
import Transfer721 from './routes/tokens/transfer721';
import Txns from './routes/tx';
import TransactionDetail from './routes/tx/detail';
import Internal from './routes/tx/internal';
import Pending from './routes/tx/pending';
Sentry.init({
  dsn: 'https://7d5087c3f3d243628d2f3ad9a54877d4@o1337621.ingest.sentry.io/6607617',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="searchError" element={<ErrorSearch />} />
                <Route path="trafficError" element={<ErrorTraffic />} />
              </Route>

              <Route path="/tx" element={<Layout />}>
                <Route index element={<Navigate to="txns" replace />} />
                <Route path="txns" element={<Txns />} />
                <Route path=":txid" element={<TransactionDetail />} />
                <Route path="internal" element={<Internal />} />
                <Route path="pending" element={<Pending />} />
              </Route>

              <Route path="/blocks" element={<Layout />}>
                <Route index element={<Blocks />} />
                <Route path=":block" element={<BlocksDetail />} />
              </Route>

              {/* <Route path="/validators" element={<Layout />}>
            <Route index element={<LeaderBoard />} />
            <Route path="setinfo" element={<SetInfo />} />
          </Route> */}

              <Route path="/address" element={<Layout />}>
                {/* <Route index element={<Accounts />} />
              <Route path="contracts" element={<Contracts />} /> */}
                <Route path=":address" element={<AccountsDetail />} />
              </Route>

              <Route path="/tokens" element={<Layout />}>
                <Route index element={<Navigate to="rank20" replace />} />
                <Route path="rank20" element={<Rank20 />} />
                <Route path=":type/:hash" element={<TokensDetail />} />
                <Route path="transfers20" element={<Transfer20 />} />
                <Route path="transfers721" element={<Transfer721 />} />
                <Route path="transfers1155" element={<Transfer1155 />} />
                <Route path="rank721" element={<Rank721 />} />
                <Route path="rank1155" element={<Rank1155 />} />
              </Route>

              <Route path="/faucet" element={<Faucet />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
