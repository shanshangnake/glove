<script setup lang="ts">
import { ref } from 'vue';
import type { Chain, WalletName } from './types/chain';

import Button from '@com/Button.vue';
import Modal from '@com/Modal.vue';
import ChainSelector from '@com/ChainSelector.vue';
import WalletSelector from '@com/WalletSelector.vue';
import ConnectWalletWrapper from '@com/ConnectWallet/ConnectWalletWrapper.vue';

enum ModalWalletStep {
	SelectChain = 0,
	SelectWallet = 1,
	ConnectWallet = 2,
}

const show = ref(false);
const chain = ref<Chain>();
const modalWalletStep = ref<ModalWalletStep>(ModalWalletStep.SelectChain);
const selectedWallet = ref<WalletName>();

const selectChain = (c: Chain) => {
	chain.value = c;
};

const selectWallet = (w: WalletName) => {
	console.log('selectWallet', w);
	selectedWallet.value = w;
};

const connectWallet = () => {
	show.value = !show.value;
};

const modalCancel = () => {
	chain.value = undefined;
	show.value = false;
};

const backStep = () => {
	if (modalWalletStep.value === ModalWalletStep.SelectChain) {
		modalCancel();
		return;
	}
	modalWalletStep.value -= 1;
};

const nextStep = () => {
	modalWalletStep.value += 1;
};
</script>

<template>
	<Button text="connect wallet" class="w-[300px]" :onClick="connectWallet" />
	<Modal :show="show" :onCancel="modalCancel">
		<KeepAlive>
			<ChainSelector
				v-if="modalWalletStep === ModalWalletStep.SelectChain"
				:chain="chain"
				@select-chain="selectChain"
			/>
			<WalletSelector
				v-else-if="modalWalletStep === ModalWalletStep.SelectWallet"
				:chainFamily="chain?.chainFamily"
				@selectWallet="selectWallet"
				:walletName="selectedWallet"
			/>
			<ConnectWalletWrapper
				v-else="modalWalletStep === ModalWalletStep.ConnectWallet"
				:chain="chain!"
				:walletName="selectedWallet!"
			/>
		</KeepAlive>
		<template #footer>
			<div
				class="flex justify-between gap-3 mb-4"
				v-if="[ModalWalletStep.SelectChain, ModalWalletStep.SelectWallet].includes(modalWalletStep)"
			>
				<Button class="flex-1" text="返回" @click="backStep" />
				<Button class="flex-1" text="下一步" type="primary" @click="nextStep" />
			</div>
		</template>
	</Modal>
</template>

<style scoped></style>
