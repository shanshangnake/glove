import { type Chain, ChainFamilyType, type NetworkType } from '../types/chain';

export const networkOptions: { label: string; value: NetworkType }[] = [
	{
		label: 'Mainnet',
		value: 'mainnet',
	},
	{
		label: 'Testnet',
		value: 'testnet',
	},
];
