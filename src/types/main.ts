import { BlockListTypes } from './blocks';
import { TxListTypes } from './tx';

export interface RecentListTypes {
  block_number: string;
  gas_used: string;
  miner: string;
  timestamp: number;
  transaction_count: number;
  create_date: string;
  creates: string | null;
  from: string;
  hash: string;
  to: string;
  value: string;
  block_reward: string;
  dataType: string;
}

export interface TransactionCountHistoryTypes {
  [key: string]: number;
}

export interface MainDataTypes {
  blockGenerateAverageTime: number;
  recentBlockList: BlockListTypes[] | undefined;
  recentTransactionList: TxListTypes[];
  totalBlockCount: number;
  totalTransactionCount: string;
  transactionCountHistory: TransactionCountHistoryTypes[];
}
