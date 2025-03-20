<template>
	<div class="p-1.5 px-2 rounded-lg bg-[#f0f0f0]">
		<div class="relative flex item-center gap-1 h-full w-full">
			<div
				class="absolute rounded-lg h-full flex item-center bg-white transition duration-300 ease shadow-item"
				:style="itemClass"
			></div>
			<div
				v-for="({ value, label }, index) in options"
				:key="value"
				:class="[
					'cursor-pointer w-full z-1 flex items-center justify-center font-medium',
					index !== activeIndex && 'hover:bg-black/8 hover:rounded-lg opacity-50',
				]"
				:ref="el => setTabRef(el, index)"
				@click="onChangeHandle(value, index)"
			>
				{{ label }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed, nextTick, onMounted, ref } from 'vue';

const { options, defaultValue, onChange } = defineProps<{
	options: { label: string; value: T }[];
	defaultValue?: T;
	onChange?: (value: T) => void;
}>();
const activeIndex = ref(0);
const itemRefs = ref<HTMLElement[]>([]);

const itemClass = computed(() => {
	const activeTab = itemRefs.value[activeIndex.value];

	return activeTab
		? {
				width: `${activeTab.offsetWidth}px`,
				transform: `translateX(${activeTab.offsetLeft}px)`,
		  }
		: {};
});

const setTabRef = (el: HTMLElement, index: number) => {
	if (el) {
		itemRefs.value[index] = el;
	}
};

const onChangeHandle = (v: T, index: number) => {
	activeIndex.value = index;
	onChange?.(v);
};

onMounted(async () => {
	// console.log('itemRefs', itemRefs);
	// const defaultValueIndex = options.findIndex(i => i.value === defaultValue);
	// activeIndex.value = defaultValueIndex !== -1 ? defaultValueIndex : 0;
});
</script>

<style lang="css" scoped></style>
