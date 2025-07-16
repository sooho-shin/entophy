export interface DataTypes {
  address: string;
  holder_count: number;
  id: number;
  token_name: string | null;
  token_symbol: string | null;
  transfer_count: number;
  transfer_count_24: number;
  transfer_count_48: number;
}

export interface DetailDataTypes {
  token_id: number;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  create_date: string;
  type: string;
  transfer_count: number;
  holder_count: number;
  total_supply: string;
}

export interface Transfers20DataType {
  from_type: string;
  to_type: string;
  block_number: string;
  create_date: string;
  from: string;
  name: string;
  symbol: string;
  to: string;
  token_address: string;
  token_transfer20_id: string;
  tr_hash: string;
  value: string;
  function_name: string;
}

export interface Transfers721DataType {
  block_number: string;
  create_date: string;
  decimals: string | null;
  from: string;
  from_type: string;
  function_name: string;
  item_id: string;
  name: string;
  symbol: string;
  to: string;
  to_type: string;
  token_address: string;
  token_transfer721_id: string;
  tr_hash: string;
}

export interface Transfers1155DataType {
  block_number: string;
  create_date: string;
  decimals: string | null;
  from: string;
  from_type: string;
  function_name: string;
  item_id: string;
  name: string | null;
  operator: string;
  symbol: string | null;
  to: string;
  to_type: string;
  token_address: string;
  token_transfer1155_id: string;
  tr_hash: string;
  value: string;
}

export interface HolderDataType {
  address: string;
  balance: string;
  block_number: string;
  name: string;
  symbol: string;
  token_address: string;
  token_holder20_id: string;
  update_date: string;
  address_type: string;
}

export interface InvenDataType {
  address: string;
  balance: string;
  block_number: string;
  id: string;
  token_address: string;
  token_inven1155_id: string;
  update_date: string;
  address_type: string;
}
