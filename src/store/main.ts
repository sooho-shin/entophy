import { MainDataTypes, TransactionCountHistoryTypes } from '@/types/main.js';
import create from 'zustand';
import { Client } from '@stomp/stompjs';
import mainApi from '../api/main.js';
import { BlockListTypes } from '@/types/blocks';
import { TxListTypes } from '@/types/tx';
interface MainState {
  // data: MainDataTypes | null;
  generatedTime: number | null;
  totalBlocks: number | null;
  totalTransactions: string | null;
  blockList: BlockListTypes[] | null;
  transactionList: TxListTypes[] | null;
  transactionHistory: TransactionCountHistoryTypes[] | null;
  client: Client | null;
  stompConnect: () => void;
  fetchMainList: () => void;
  deactivate: () => void;
}

const useMainStore = create<MainState>((set, get) => ({
  // data: null,
  generatedTime: null,
  totalBlocks: null,
  totalTransactions: null,
  blockList: null,
  transactionList: null,
  transactionHistory: null,
  client: null,
  fetchMainList: async () => {
    get().stompConnect();
    const response = await mainApi.main().then((res) => res?.data.result[0]);

    set({
      generatedTime: response?.blockGenerateAverageTime,
      totalBlocks: response?.totalBlockCount,
      blockList: response?.recentBlockList,
      totalTransactions: response?.totalTransactionCount,
      transactionList: response?.recentTransactionList,
      transactionHistory: response?.transactionCountHistory,
    });
  },
  stompConnect: () => {
    const client = new Client({
      brokerURL: import.meta.env.VITE_BROKER_URL,
      connectHeaders: {
        login: import.meta.env.VITE_CONNECT_LOGIN,
        passcode: import.meta.env.VITE_CONNECT_PASSCODE,
      },
      // debug: function (str) {
      //   if (import.meta.env.MODE === 'development') {
      //     console.log(str);
      //   }
      // },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function () {
      set({ client });
      client.subscribe('/topic/main', (message) => {
        const result = JSON.parse(message.body) as MainDataTypes;

        set((state) => {
          state.blockList?.unshift(...(result.recentBlockList as BlockListTypes[]));
          state.transactionList?.unshift(
            ...(result.recentTransactionList as TxListTypes[]),
          );
          return {
            generatedTime: result?.blockGenerateAverageTime,
            totalBlocks: result?.totalBlockCount,
            blockList: state.blockList?.splice(0, 20),
            totalTransactions: result?.totalTransactionCount,
            transactionList: state.transactionList?.splice(0, 20),
          };
        });
      });
    };

    client.onDisconnect = function () {
      if (import.meta.env.MODE === 'development') {
        console.log('disconnected');
      }
    };

    client.onStompError = function (frame) {
      if (import.meta.env.MODE === 'development') {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      }
    };

    client.activate();
  },

  deactivate: () => {
    get().client?.deactivate();
    console.log('deactivated');
  },
}));

export { useMainStore };
