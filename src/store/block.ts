import create from 'zustand';
import { BlockDataTypes, BlockDetailDataTypes } from '@/types/blocks.js';
import blockApi from '../api/block.js';
import { usePaginationStore } from './pagination.js';

interface BlockState {
  data: BlockDataTypes[] | null;
  detailData: BlockDetailDataTypes | null | 'nodata';
  fetchBlockData: (data: object) => void;
  fetchBlockDetailData: (txid: string) => void;
  resetAllData: () => void;
}

const useBlockStore = create<BlockState>((set) => ({
  data: null,

  detailData: null,

  fetchBlockData: async (data: object) => {
    data = { ...{ page: '1', limit: '25' }, ...data };
    const response = await blockApi.block(data);
    usePaginationStore.getState().setPagingData(response?.data.pagination);
    set({ data: response?.data.result });
  },

  fetchBlockDetailData: async (block: string) => {
    const response = await blockApi.detail(block);
    if (!response?.data.result[0]) {
      await set({ detailData: 'nodata' });
      return false;
    }
    set({ detailData: response?.data.result[0] });
  },

  resetAllData: () => {
    set({ data: null });
    set({ detailData: null });
  },
}));

export { useBlockStore };
