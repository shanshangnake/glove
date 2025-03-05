// 链的业务分类
export enum ChainFamilyType {
	EVM = 'EVM',
	TRON = 'TRON',
	BTC = 'BTC',
}

export type NetworkType = 'testnet' | 'mainnet';

export interface Chain {
	name: string;
	full_name: string;
	logo_url?: string;
	net_type?: NetworkType;
	rpc_url?: string;
	evm_chain_id?: number;
	chain_family: ChainFamilyType;
	tx_hash_url: string;
	address_url: string;
	network: string;
}
