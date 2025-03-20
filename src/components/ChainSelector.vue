<template>
	<Segmented :default-value="netTypeItem" :options="networkOptions" class="h-[60px]" :onChange="changeType" />
	<div class="overflow-y-scroll pb-2 py-1">
		<div
			v-for="i in chainList"
			v-show="netTypeItem === i.netType"
			:class="[
				'cursor-pointer flex border  items-center justify-between p-2 rounded-md ',
				chain?.name === i.name ? 'bg-primary/10  border-primary' : 'border-transparent hover:bg-black/5',
			]"
			@click="emit('selectChain', i)"
		>
			<img :src="i.logoUrl" class="w-[30px] h-[30px] rounded-[50%]" />
			{{ i.fullName }}
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { networkOptions, chainList } from '@constant';

import Segmented from './Segmented.vue';
import type { Chain, NetworkType } from '../types/chain';

const netTypeItem = ref<NetworkType>('mainnet');

const emit = defineEmits(['selectChain']);
const { chain } = defineProps<{ chain?: Chain }>();

const changeType = (v: NetworkType) => {
	netTypeItem.value = v;
};
</script>
<style scoped></style>
