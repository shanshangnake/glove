<template>
	<div v-show="show" class="absolute justify-center w-full h-full left-0 top-0">
		<div class="relative w-full h-full flex items-center justify-center">
			<div v-show="mask" class="absolute w-full h-full bg-black/45" :onclick="onCancel"></div>
			<div class="relative z-99 w-[50%] h-[540px] flex flex-col shadow-md px-10 rounded-lg bg-white">
				<div class="relative flex justify-center items-center p-2">
					<!-- <component :is="title" v-if="typeof title !== 'string'" />
				<span v-else>{{ title }}</span>
				<span class="absolute right-0">icon</span> -->
				</div>

				<div class="flex-1 overflow-hidden">
					<Segmented :default-value="netType" :options="networkOptions" class="h-[60px]" :onChange="changeType" />
					<!-- <div class="overflow-y-scroll">
						<div class="h-[600px]">content</div>
					</div> -->
					<div class="overflow-y-scroll pb-2 py-1">
						<div
							v-for="{ name, fullName, logoUrl, netType } in chainList"
							v-show="netTypeItem === netType"
							class="cursor-pointer flex items-center justify-between p-2 hover:bg-black/5 rounded-md"
						>
							<img :src="logoUrl" class="w-[30px] h-[30px] rounded-[50%]" />
							{{ fullName }}
						</div>
					</div>
				</div>
				<div class="flex justify-between gap-3 mb-4">
					<Button class="flex-1" text="cancel" :onclick="onCancel" />
					<Button class="flex-1" text="submit" type="primary" :onclick="onOk" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, type Component } from 'vue';
import { networkOptions, chainList } from '@constant';

import Button from '@com/Button.vue';
import Segmented from './Segmented.vue';
import type { NetworkType } from '../types/chain';

const netTypeItem = ref<NetworkType>('mainnet');
const changeType = (v: NetworkType) => {
	netTypeItem.value = v;
};

const {
	mask = true,
	show,
	onCancel,
} = defineProps<{
	show: boolean;
	onOk?: () => void;
	onCancel?: () => void;
	title?: string | Component;
	mask?: boolean;
}>();
</script>
<style lang=""></style>
