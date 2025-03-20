import { ethers, type TypedDataDomain, type TypedDataField, type UnsignedTransaction } from 'ethers';

import type { Account, NetworkType } from '../types/chain';

export type ProviderItem = {
	info: {
		uuid: string;
		name: string;
		icon: string;
		rdns: string;
	};
	provider: any;
};

export enum EvmPluginWalletType {
	MetaMask = 'io.metamask',
	OkxWallet = 'com.okex.wallet',
}

export interface EvmChainOption {
	name: string;
	fullName?: string;
	netType: NetworkType;
	rpc: string;
	evmChainId: number;
	walletName: EvmPluginWalletType;
}

export type EIP712Domain = TypedDataDomain;
export type EIP712Types = Record<string, Array<TypedDataField>>;
export type EIP712Message =
	| {
			data: string;
			destination: string;
			nonce: string | number;
			value: string;
	  }
	| {
			to: string;
			value: number;
			data: string;
			operation: number;
			nonce: number;
	  };

export type EIP712TypedData = {
	domain: EIP712Domain;
	types: EIP712Types;
	message: EIP712Message;
	primaryType?: string;
};

export type SignedEthTxData = { hash: string; signature: string };

export const getPluginProvides = async (intervalTimeout = 1000): Promise<ProviderItem[]> => {
	return new Promise(resolve => {
		const providers = new Map<string, ProviderItem>();
		let timeoutId: any;

		const resetTimeout = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				window.removeEventListener('eip6963:announceProvider', handleProvider);
				resolve(Array.from(providers.values()));
			}, intervalTimeout);
		};

		const handleProvider = (event: any) => {
			if (event.detail?.info?.uuid) {
				providers.set(event.detail.info.uuid, event.detail);
				// 事件触发后重置超时计时器
				resetTimeout();
			}
		};
		window.addEventListener('eip6963:announceProvider', handleProvider); // 添加事件监听器
		window.dispatchEvent(new Event('eip6963:requestProvider')); // 触发请求钱包扩展提供 Provider 数据
		resetTimeout(); // 设置初始超时计时器
	});
};

export class EvmPluginWallet {
	ethereum: any;
	provider: any;
	chainOption: EvmChainOption;

	constructor(chainOption: EvmChainOption, provider: any) {
		this.chainOption = chainOption;
		this.ethereum = provider;
	}

	public async init(): Promise<void> {
		await this.check(false);
		this.provider = new ethers.providers.Web3Provider(this.ethereum);
	}

	public async check(initialized = true): Promise<boolean> {
		if (!this.ethereum || (initialized && !this.provider)) throw { code: 'walletUnavailable' };

		if (
			(this.chainOption.walletName === EvmPluginWalletType.MetaMask || this.ethereum._metamask?.isUnlocked) &&
			!(await this.ethereum._metamask?.isUnlocked())
		)
			throw { code: 'walletLocked' };

		const { evmChainId, fullName: chainName, name: symbol, rpc } = this.chainOption;
		const chainId = `0x${Number(evmChainId).toString(16)}`;
		// 验证当前链是否正确。不正确则切换、不存在则请求增加链。
		if (this.chainOption.evmChainId !== Number(this.ethereum.chainId)) {
			// 尝试切换链
			try {
				await this.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] });
			} catch (e: any) {
				// 链不存在，请求增加链
				if (e.code === 4902) {
					const params = [
						{ chainId, chainName, rpcUrls: [rpc], nativeCurrency: { name: symbol, symbol, decimals: 18 } },
					];
					await this.ethereum.request({ method: 'wallet_addEthereumChain', params });
				} else {
					throw e;
				}
			}
		}
		// 可用
		return true;
	}

	/** 获取账户信息 */
	public async getAccount(): Promise<Account> {
		if (!(await this.check())) throw new Error('check error');
		const [address]: [string] = await this.provider.send('eth_requestAccounts', []);
		return { address } as Account;
	}

	/** 消息签名 */
	public async signMessage(msg: string): Promise<string> {
		await this.check();
		const signer = (await this.provider.getSigner()) as ethers.VoidSigner;
		return signer.signMessage(msg);
	}

	/** EIP-712 交易签名 */
	public async signTransaction({ domain, types, message }: EIP712TypedData): Promise<string> {
		await this.check();
		const signer = (await this.provider.getSigner()) as ethers.VoidSigner;
		const signature = await signer._signTypedData(domain, types, message);
		return signature;
	}

	/** 单签交易签名 */
	public async signSingleTransaction(transaction: UnsignedTransaction): Promise<string> {
		const signer = (await this.provider.getSigner()) as ethers.VoidSigner;
		const signature = await signer.signTransaction(transaction as any);
		return signature;
	}

	/** 签名并广播交易 */
	public async broadcastTransaction(txData: UnsignedTransaction): Promise<SignedEthTxData> {
		await this.check();
		const signer = await this.provider.getSigner();
		const result = await signer.sendTransaction(txData);
		return result;
	}
}
