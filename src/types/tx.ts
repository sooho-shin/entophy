export interface TxListTypes {
  hash: string;
  from: string;
  to: string;
  value: string;
  create_date: string;
  creates: string | null;
}

export interface TxDataTypes extends TxListTypes {
  timestamp: string | number;
  data: string;
  block_number: string;
  from_type: string;
  to_type: string;
  status: number;
  transaction_fee: string;
}

export interface EventLogsType {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  eventName: string;
  humanData: string | null;
  logIndex: string;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}

export interface InternalTransactionListType {
  from: string;
  to: string;
  type: string;
  value: string;
}
export interface DetailDataTypes {
  blockNumber: string;
  createDate: string;
  creates: string | null;
  data: string;
  eventLogs: { logs: EventLogsType[] };
  from: string;
  function_name: string;
  gasLimit: string | { hex: string; type: string };
  gasPrice: string | { hex: string; type: string };
  hash: string;
  internal_transaction_list: InternalTransactionListType[];
  nonce: string;
  status: number;
  to: string;
  to_address_type: string | null;
  from_address_type: string | null;
  trace_call: {
    from: string;
    gas: string;
    gasUsed: string;
    input: string;
    output: string;
    time: string;
    to: string;
    type: string;
    value: string;
  };
  transactions_id: string;
  type: number;
  value: string | { hex: string; type: string };
  token_name: string | null;
  token_symbol: string | null;
  erc20_tokens_transferred: Erc20TokensTransferredTypes[] | null;
  erc721_tokens_transferred: Erc721TokensTransferredTypes[];
  erc1155_tokens_transferred: Erc1155TokensTransferredType[];
  transactionFee: string;
  gasUsedByTransaction: string;
  gasUsedByTransactionPer: string;
}

export interface Erc1155TokensTransferredType {
  block_number: string;
  create_date: string;
  from: string;
  item_id: string;
  operator: string;
  to: string;
  token_address: string;
  token_name: string | null;
  token_symbol: string | null;
  token_transfer1155_id: string;
  tr_hash: string;
  value: string;
}
export interface Erc721TokensTransferredTypes {
  block_number: string;
  create_date: string;
  from: string;
  item_id: string;
  to: string;
  token_address: string;
  token_name: string | null;
  token_symbol: string | null;
  token_transfer721_id: string;
  tr_hash: string;
}
export interface Erc20TokensTransferredTypes {
  block_number: string;
  create_date: string;
  from: string;
  to: string;
  token_address: string;
  token_transfer20_id: string;
  tr_hash: string;
  value: string;
  token_name: string | null;
  token_symbol: string | null;
}

export interface TransferItemTypes {
  block_number: string;
  create_date: string;
  from: string;
  name: string;
  symbol: string;
  to: string;
  token_id: string;
  token_transfer20_id: string;
  tr_hash: string;
  value: string;
}

export interface TxInternalDataTypes {
  block_number: string;
  create_date: string;
  from: string;
  from_type: string;
  internal_id: string;
  status: number | null;
  to: string;
  to_type: string;
  tr_hash: string;
  type: string;
  value: string;
}

export interface TxPendingDataTypes {
  create_date: string;
  from: string;
  from_type: string;
  gas_limit: number;
  gas_price: string;
  nonce: number;
  to: string;
  to_type: string;
  tx_hash: string;
  value: string;
}
