<script lang="ts">
	import { Card } from '$lib/components/shad/ui/card';
	import QrCode from 'svelte-qrcode';

	let { data } = $props();
</script>

<svelte:head>
	<title>You Won!</title>
</svelte:head>

<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
	{#if data.won}
		<h1 class="mb-4 text-3xl font-bold">Congratulations! You won!</h1>
		<p>Show this code to one of the organisers to receive your prize!</p>
		<QrCode value={data.link} class="h-fit w-fit" />
	{:else}{/if}
</Card>
