<template>
	<div v-if="show" :class="['absolute left-0 top-0 items-center justify-center w-full h-full ', mask && 'bg-black/50']">
		<div ref="modalRef" class="relative w-full h-full flex items-center justify-center p-3 opacity-0 modal-content">
			<div class="relative z-99 w-[50%] h-[540px] flex flex-col shadow-md px-10 rounded-lg bg-white p-1 pt-3">
				<div class="relative flex justify-center items-center p-2">
					<slot name="header"></slot>
					<component :is="title" v-if="typeof title !== 'string'" />
					<span v-else>{{ title }}</span>
					<span class="absolute right-0 cursor-pointer" @click="onCancel">
						<img :src="closeIcon" />
					</span>
				</div>
				<div class="flex-1 overflow-hidden">
					<slot />
				</div>
				<slot name="footer">
					<div class="flex justify-between gap-3 mb-4">
						<Button class="flex-1" text="cancel" @click="onCancel" />
						<Button class="flex-1" text="submit" type="primary" @click="onOk" />
					</div>
				</slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch, type Component } from 'vue';

import Button from '@com/Button.vue';
import closeIcon from '@assets/icons/close.svg';

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

const modalRef = ref<HTMLElement | null>(null);

watch(
	() => show,
	async newValue => {
		if (newValue) {
			await nextTick(); // 确保 DOM 渲染后再触发动画
			modalRef.value?.classList.add('show');
		} else {
			modalRef.value?.classList.remove('show');
		}
	},
	{ immediate: true },
);
</script>
<style scoped>
/* Modal 主体 */
.modal-content {
	/* background: white; */
	transform: translateY(-20px);
	transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 进入时动画 */
.modal-content.show {
	transform: translateY(0);
	opacity: 1;
}
</style>
