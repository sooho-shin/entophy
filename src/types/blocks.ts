export interface BlockListTypes {
  block_number: string;
  miner: string;
  miner_name: string | null;
  gas_used: string;
  transaction_count: number;
  timestamp: number;
  block_reward: string;
}

export interface BlockDataTypes extends BlockListTypes {
  hash: string;
  parent_hash: string;
  nonce: string;
  difficulty: number;
  gas_limit: string;
  extra_data: string;
}

export interface BlockDetailDataTypes extends BlockListTypes {
  difficulty: number;
  extra_data: string;
  gas_limit: string;
  hash: string;
  internal_transaction_count: number;
  is_last_block: false;
  nonce: string;
  parent_hash: string;
  burn: string;
}
