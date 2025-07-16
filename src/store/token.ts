import {
  DataTypes,
  DetailDataTypes,
  Transfers20DataType,
  HolderDataType,
  Transfers721DataType,
  Transfers1155DataType,
  InvenDataType,
} from '@/types/tokens';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import tokenApi from '../api/token';
import { usePaginationStore } from './pagination';
import { ParamsType } from '../types/params';

interface TokenState {
  tokenData: DataTypes[] | null;
  detailData: DetailDataTypes | null | 'nodata';
  transfers20Data: Transfers20DataType[] | null;
  transfers721Data: Transfers721DataType[] | null;
  transfers1155Data: Transfers1155DataType[] | null;
  holderData: HolderDataType[] | null;
  invenData: InvenDataType[] | null;

  fetchTokenData: (data: ParamsType) => void;
  fetchTokenDetailData: (hash: string) => void;
  fetchTransferData: (data: ParamsType) => void;
  fetchHolderData: (data: ParamsType) => void;
  fetchInvenData: (data: ParamsType) => void;
  resetAllData: () => void;
  resetTableData: () => void;
}

const useTokenStore = create(
  devtools<TokenState>((set) => ({
    tokenData: null,
    holderData: null,
    invenData: null,
    detailData: null,
    transfers20Data: null,
    transfers721Data: null,
    transfers1155Data: null,

    fetchTokenData: async (data: ParamsType) => {
      data = { ...{ page: '1', limit: '25' }, ...data };
      const responsive = await tokenApi.token(data);
      usePaginationStore.getState().setPagingData(responsive?.data.pagination);
      set({ tokenData: responsive?.data.result });
    },

    fetchTokenDetailData: async (hash) => {
      await tokenApi
        .detail(hash)
        .then((res) => {
          if (!res?.data.result) {
            set({ detailData: 'nodata' });
            return false;
          }
          set({ detailData: res?.data.result });
        })
        .catch((err) => console.error(err));
    },

    fetchTransferData: async (data: ParamsType) => {
      data = { ...{ page: '1', limit: '25' }, ...data };
      await tokenApi
        .transfer(data)
        .then((res) => {
          if (data.type === 'erc20') {
            set({ transfers20Data: res?.data.result });
          }
          if (data.type === 'erc721') {
            set({ transfers721Data: res?.data.result });
          }
          if (data.type === 'erc1155') {
            set({ transfers1155Data: res?.data.result });
          }
          usePaginationStore.getState().setPagingData(res?.data.pagination || {});
        })
        .catch((err) => console.error(err));
    },

    fetchHolderData: async (data: ParamsType) => {
      data = { ...{ page: '1', limit: '25' }, ...data };
      const responsive = await tokenApi.holder(data);
      usePaginationStore.getState().setPagingData(responsive?.data.pagination);
      set({ holderData: responsive?.data.result });
    },

    fetchInvenData: async (data: ParamsType) => {
      data = { ...{ page: '1', limit: '25' }, ...data };
      const responsive = await tokenApi.inven(data);
      usePaginationStore.getState().setPagingData(responsive?.data.pagination);
      set({ invenData: responsive?.data.result });
    },
    resetAllData: () => {
      set({ tokenData: null });
      set({ holderData: null });
      set({ invenData: null });
      set({ detailData: null });
      set({ transfers20Data: null });
      set({ transfers721Data: null });
      set({ transfers1155Data: null });
    },

    resetTableData: () => {
      set({ holderData: null });
      set({ invenData: null });
      set({ transfers20Data: null });
      set({ transfers721Data: null });
      set({ transfers1155Data: null });
    },
  })),
);

export { useTokenStore };
