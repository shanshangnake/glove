<template>
	<div class="flex flex-wrap justify-between gap-2">
		<div
			v-for="{ name, icon } in Object.values(walletMap[chainFamily])"
			:class="[
				'flex w-[48%] border  rounded-md p-3 gap-3 hover:border-primary cursor-pointer',
				walletName === name ? 'border-primary' : 'border-black/20',
			]"
			@click="emit('selectWallet', name)"
		>
			<img :src="icon" class="w-[38px] h-[38px] rounded-[50%]" />
			<div>
				<p>
					{{ name }}
				</p>
				<p class="text-left text-black/30">
					{{ pluginProvide.findIndex(i => i.info?.name === name) !== -1 ? '安装' : '未安装' }}
				</p>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { getPluginProvides, type ProviderItem } from '../libs/evmPluginWallet';
import { ChainFamilyType, type WalletName } from '../types/chain';
import { walletMap } from '@constant';

const { chainFamily = ChainFamilyType.EVM, walletName } = defineProps<{
	chainFamily?: ChainFamilyType;
	walletName?: WalletName;
}>();

let pluginProvide = reactive<ProviderItem[]>([]);
const emit = defineEmits(['selectWallet']);

onMounted(async () => {
	pluginProvide = await getPluginProvides();
});
</script>
<style scoped></style>
