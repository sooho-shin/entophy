import { DetailDataTypes } from '@/types/address.js';
import create from 'zustand';

import addressApi from '../api/address.js';

interface AddressState {
  detailData: DetailDataTypes | null | 'nodata';
  fetchAddressDetailData: (address: string) => void;
  resetAddressDetailData: () => void;
}

const useAddressStore = create<AddressState>((set) => ({
  detailData: null,

  fetchAddressDetailData: async (address: string) => {
    const response = await addressApi.detail(address);
    if (!response?.data.result[0]) {
      set({ detailData: 'nodata' });
      return false;
    }
    set({ detailData: response?.data.result[0] });
  },

  resetAddressDetailData: () => {
    set({ detailData: null });
  },
}));

export { useAddressStore };
