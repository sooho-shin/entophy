export interface TransactionListType {
  block_number: string;
  create_date: string;
  data: string;
  from: string;
  from_type: string;
  hash: string;
  status: number;
  to: string;
  to_type: string;
  value: string;
}

export interface MoreInfoType {
  created_tx_hash: string;
  creator_address: string;
  token_name: string;
  token_symbol: string;
}

export interface TokenList {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

export type DetailDataTypes = {
  ERC20_token_list: TokenList[] | [];
  ERC20_token_transaction_list: ERC20TokenTransactionListType[];
  ERC721_token_transaction_list: ERC721TokenTransactionListType[];
  ERC1155_token_transaction_list: ERC1155TokenTransactionListType[];
  balance_human: number;
  internal_transaction_list: InternalTransactionList[];
  more_info: MoreInfoType;
  total_transaction_count: number;
  transaction_list: TransactionListType[];
  type: string;
};

export type ERC20TokenTransactionListType = {
  block_number: string;
  create_date: string;
  decimals: number;
  from: string;
  from_type: string;
  name: string;
  status: 1;
  symbol: string;
  to: string;
  to_type: string;
  token_address: string;
  token_transfer20_id: string;
  tr_hash: string;
  value: string;
};

export type ERC721TokenTransactionListType = {
  block_number: string;
  create_date: string;
  from: string;
  from_type: string;
  item_id: string;
  name: string;
  status: number | null;
  symbol: string;
  to: string;
  to_type: string;
  token_address: string;
  token_transfer721_id: string;
  tr_hash: string;
};

export type ERC1155TokenTransactionListType = {
  block_number: number;
  create_date: string;
  decimals: number | null;
  from: string;
  from_type: string;
  item_id: string;
  name: string | null;
  operator: string;
  status: number;
  symbol: string | null;
  to: string;
  to_type: string;
  token_address: string;
  token_transfer1155_id: string;
  tr_hash: string;
  value: string;
};

export type InternalTransactionList = {
  block_number: string;
  create_date: string;
  from: string;
  from_type: string;
  status: number | null;
  to: string;
  to_type: string;
  tr_hash: string;
  value: string;
};
