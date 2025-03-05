<script setup>
import { computed, ref } from 'vue';
import { networkOptions } from './constant';

import HelloWorld from './components/HelloWorld.vue';
import Segmented from './components/Segmented.vue';
</script>

<template>
	<Segmented default-value="Tron" :options="networkOptions" class="h-[60px] w-[220px]" />
</template>

<style scoped></style>
