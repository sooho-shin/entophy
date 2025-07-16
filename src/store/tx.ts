import {
  TxDataTypes,
  DetailDataTypes,
  TxInternalDataTypes,
  TxPendingDataTypes,
} from '@/types/tx';
import create from 'zustand';

import txApi from '../api/tx.js';
import { usePaginationStore } from './pagination.js';
import { ParamsType } from '../types/params';

// interface keyable {
//   [key: string]: number | string | { [key: string]: never }[] | undefined;
// }

interface TxState {
  txData: TxDataTypes[] | null;
  detailData: DetailDataTypes | null | 'nodata';
  txInternalData: TxInternalDataTypes[] | null;
  txPendingData: TxPendingDataTypes[] | null;
  fetchTxData: (data: ParamsType) => void;
  fetchTxInternalData: (data: ParamsType) => void;
  fetchTxPendingData: (data: ParamsType) => void;
  fetchTxDetailData: (txid: string) => void;
  resetAllData: () => void;
}

const useTxStore = create<TxState>((set) => ({
  txData: null,
  detailData: null,
  txInternalData: null,
  txPendingData: null,

  fetchTxData: async (data: ParamsType) => {
    data = { ...{ page: '1', limit: '25' }, ...data };
    const response = await txApi.tx(data);
    usePaginationStore.getState().setPagingData(response?.data.pagination);
    set({ txData: response?.data.result });
  },

  fetchTxInternalData: async (data: ParamsType) => {
    data = { ...{ page: '1', limit: '25' }, ...data };
    const response = await txApi.txInternal(data);
    set({ txInternalData: response?.data.result });
    usePaginationStore.getState().setPagingData(response?.data.pagination);
  },

  fetchTxPendingData: async (data: ParamsType) => {
    data = { ...{ page: '1', limit: '25' }, ...data };
    const response = await txApi.txPending(data);
    set({ txPendingData: response?.data.result });
  },

  fetchTxDetailData: async (txid: string) => {
    const response = await txApi.detail(txid);
    if (!response?.data.result[0]) {
      set({ detailData: 'nodata' });
      return false;
    }
    set({ detailData: response?.data.result[0] });
  },

  resetAllData: () => {
    set({ txData: null });
    set({ detailData: null });
    set({ txInternalData: null });
    set({ txPendingData: null });
  },
}));

export { useTxStore };
