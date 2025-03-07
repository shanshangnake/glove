<template>
	<div :click="{ onClick }" :class="[' rounded-md p-2.5 cursor-pointer', typeClass]">
		{{ text }}
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const { text, onClick, type } = defineProps<{
	text: String;
	onClick?: () => void;
	type?: 'primary' | 'default';
}>();

const typeClass = computed(() => {
	if (type === 'primary') {
		return 'bg-primary';
	}

	return 'bg-[#ccc]';
});
</script>
<style lang=""></style>
