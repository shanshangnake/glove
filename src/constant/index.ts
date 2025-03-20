import { type Chain, ChainFamilyType, type NetworkType } from '../types/chain';

import btcPng from '@assets/icons/btc.png';
import ethPng from '@assets/icons/eth.png';
import tronPng from '@assets/icons/tron.png';
import btcTestPng from '@assets/icons/btcTest.png';
import ethTestPng from '@assets/icons/ethTest.png';
import tronTestPng from '@assets/icons/tronTest.png';
import bnbTestPng from '@assets/icons/bnbTest.png';
import ledger from '@assets/icons/ledger.svg';
import tronLink from '@assets/icons/tronlink.png';
import metamask from '@assets/icons/metamask.svg';
import ok from '@assets/icons/ok.svg';
import oneKey from '@assets/icons/oneKey.svg';

export const walletMap = {
	[ChainFamilyType.BTC]: [
		{
			name: 'ledger',
			icon: ledger,
		},
	],
	[ChainFamilyType.EVM]: [
		{
			name: 'MetaMask',
			icon: metamask,
		},
		{
			name: 'OKX Wallet',
			icon: ok,
		},
		{
			name: 'OneKey',
			icon: oneKey,
		},
	],
	[ChainFamilyType.TRON]: [
		{
			name: 'TronLink',
			icon: tronLink,
		},
	],
};

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

export const chainList: Chain[] = [
	{
		addressUrl: 'https://www.blockchain.com/explorer/addresses/btc/',
		chainFamily: ChainFamilyType.BTC,
		fullName: 'Bitcoin',
		logoUrl: btcPng,
		name: 'BTC',
		netType: 'mainnet',
		network: 'Bitcoin',
		rpcUrl: 'https://node-rpc.nexvault.xyz/btc_sign/',
		txHashUrl: 'https://www.blockchain.com/explorer/transactions/btc/',
	},
	{
		addressUrl: 'https://etherscan.io/address/',
		chainFamily: ChainFamilyType.EVM,
		evmChainId: 1,
		fullName: 'Ethereum',
		logoUrl: ethPng,
		name: 'ETH',
		netType: 'mainnet',
		network: 'Ethereum',
		rpcUrl: 'https://node-rpc.nexvault.xyz/eth_sign/',
		txHashUrl: 'https://etherscan.io/tx/',
	},
	{
		addressUrl: 'https://tronscan.org/#/address/',
		chainFamily: ChainFamilyType.TRON,
		fullName: 'Tron',
		logoUrl: tronPng,
		name: 'TRX',
		netType: 'mainnet',
		network: 'Tron',
		rpcUrl: 'https://node-rpc.nexvault.xyz/trx_sign/',
		txHashUrl: 'https://tronscan.org/#/transaction/',
	},
	{
		addressUrl: 'https://blockstream.info/testnet/address/',
		chainFamily: ChainFamilyType.BTC,
		fullName: 'Bitcoin Testnet',
		logoUrl: btcTestPng,
		name: 'BTC',
		netType: 'testnet',
		network: 'Bitcoin',
		rpcUrl: 'https://node-rpc.nexvault.xyz/btc_test_sign/',
		txHashUrl: 'https://blockstream.info/testnet/tx/',
	},
	{
		addressUrl: 'https://goerli.etherscan.io/address/',
		chainFamily: ChainFamilyType.EVM,
		evmChainId: 5,
		fullName: 'Ethereum Goerli Testnet',
		logoUrl: ethTestPng,
		name: 'ETH',
		netType: 'testnet',
		network: 'Ethereum',
		rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/KdmLXOfgmIWGjqh7AN7kHoLY2CWetHQI',
		txHashUrl: 'https://goerli.etherscan.io/tx/',
	},
	{
		addressUrl: 'https://shasta.tronscan.org/#/address/',
		chainFamily: ChainFamilyType.TRON,
		fullName: 'Tron Shasta Testnet',
		logoUrl: tronTestPng,
		name: 'TRX',
		netType: 'testnet',
		network: 'Tron',
		rpcUrl: 'https://api.shasta.trongrid.io',
		txHashUrl: 'https://shasta.tronscan.org/#/transaction/',
	},
	{
		addressUrl: 'https://sepolia.etherscan.io/address/',
		chainFamily: ChainFamilyType.EVM,
		evmChainId: 11155111,
		fullName: 'Ethereum Sepolia Testnet',

		logoUrl: ethTestPng,
		name: 'ETH',
		netType: 'testnet',
		network: 'Ethereum',
		rpcUrl: 'https://node-rpc.nexvault.xyz/sepolia_sign/',
		txHashUrl: 'https://sepolia.etherscan.io/tx/',
	},
	{
		addressUrl: 'https://testnet.bscscan.com/address/',
		chainFamily: ChainFamilyType.EVM,
		evmChainId: 97,
		fullName: 'Binance Smart Chain Testnet',
		logoUrl: bnbTestPng,
		name: 'BNB',
		netType: 'testnet',
		network: 'Binance Smart Chain',
		rpcUrl: 'https://node-rpc.nexvault.xyz/bsc_test_sign/',
		txHashUrl: 'https://testnet.bscscan.com/tx/',
	},
];
