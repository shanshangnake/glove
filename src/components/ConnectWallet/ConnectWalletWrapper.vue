<template>
	<div class="flex h-full flex-col justify-center items-center p-5">
		<img :src="walletIcon" />

		<div class="mt-10" v-if="[ConnectStep.PreConnect, ConnectStep.Connecting].includes(connectStep)">
			<div :class="[connectStep === ConnectStep.Connecting ? 'animate-spin' : '']">---</div>
			{{ connectStep === ConnectStep.Connecting ? 'Loading…' : '' }}
		</div>
		<div v-if="connectStep === ConnectStep.Connected">
			<div>address</div>
		</div>
		<div v-if="connectStep === ConnectStep.ConnectFail">fail</div>
	</div>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { ChainFamilyType, type Chain, type WalletName } from '../../types/chain';
import { walletMap } from '@constant';

enum ConnectStep {
	PreConnect = 0,
	Connecting = 1,
	Connected = 2,
	ConnectFail = 3,
}

const { chain, walletName } = defineProps<{
	chain: Chain;
	walletName: WalletName;
}>();

const connectStep = ref<ConnectStep>(ConnectStep.PreConnect);
const walletIcon = computed(() => walletMap[chain.chainFamily].filter(i => i.name === walletName)[0]?.icon);
</script>
<style scoped></style>
