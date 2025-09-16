<script lang="ts">
	import { Card } from '$lib/components/shad/ui/card';

	let { data } = $props();
</script>

<svelte:head>
	<title>BitHunt - Hint</title>
</svelte:head>

<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
	{#if data.meta.locationExists}
		<h1 class="text-4xl font-black">{data.location?.hint}</h1>
		<p class="font-light italic">When you find the QR Code, scan it with your phone camera!</p>
	{:else}
		<h1 class="text-4xl font-black">
			Location cannot be found. Please talk to the organisers to try fix this.
		</h1>
	{/if}
</Card>
