import { ReactNode } from 'react';
import create from 'zustand';

// interface keyable {
//   [key: string]: string;
// }
interface MainState {
  limit: number;
  offset: number;
  page: number;
  totalCount: number;
  totalPage: number;
  realTotalCount: number;
  setPagingData: (data: any) => void;
  resetPagingData: () => void;
}

const usePaginationStore = create<MainState>((set) => ({
  limit: 0,
  offset: 0,
  page: 0,
  totalCount: 0,
  totalPage: 0,
  realTotalCount: 0,

  setPagingData: (data) => {
    set({ totalPage: data.totalPage ? data.totalPage : 0 });
    set({ totalCount: data.totalCount ? data.totalCount : 0 });
    set({ limit: data.limit ? data.limit : 0 });
    set({ page: data.page ? data.page : 0 });
    set({ offset: data.offset ? data.offset : 0 });
    set({ realTotalCount: data.realTotalCount ? data.realTotalCount : 0 });
  },

  resetPagingData: () => {
    set({ limit: 0, offset: 0, page: 0, totalCount: 0, totalPage: 0, realTotalCount: 0 });
  },
}));

export { usePaginationStore };
