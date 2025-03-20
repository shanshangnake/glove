// 链的业务分类
export enum ChainFamilyType {
	EVM = 'EVM',
	TRON = 'TRON',
	BTC = 'BTC',
}

export type NetworkType = 'testnet' | 'mainnet';

export interface Chain {
	name: string;
	fullName: string;
	logoUrl?: string;
	netType?: NetworkType;
	rpcUrl?: string;
	evmChainId?: number;
	chainFamily: ChainFamilyType;
	txHashUrl: string;
	addressUrl: string;
	network: string;
}

export type Account = { path: string; address: string; publicKey?: string; xpub?: string };
export type WalletName = 'ledger' | 'MetaMask' | 'OKX Wallet' | 'OneKey' | 'TronLink';
