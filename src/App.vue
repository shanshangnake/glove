<script setup lang="ts">
import Button from '@com/Button.vue';
import Modal from '@com/Modal.vue';
import { ref } from 'vue';

const show = ref(false);

const connectWallet = () => {
	show.value = true;
};

const modalCancel = () => {
	show.value = false;
};
</script>

<template>
	<Button text="connect wallet" class="w-[300px]" :onclick="connectWallet" />
	<Modal :show="show" :onCancel="modalCancel" />
</template>

<style scoped></style>
