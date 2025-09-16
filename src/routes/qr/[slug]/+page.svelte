<script lang="ts">
	import { Card } from '$lib/components/shad/ui/card';
	import { Home, MessageCircleQuestion } from '@lucide/svelte';
	import { Button } from '$lib/components/shad/ui/button';

	let { data } = $props();
</script>

<svelte:head>
	<title>BitHunt - QR Code</title>
</svelte:head>

<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
	{#if data.location.found}
		<h1 class="text-4xl font-black">{data.location.name} found!</h1>
		<div class="flex w-full flex-row flex-wrap items-center justify-around gap-2">
			<Button
				onclick={() => (window.location.href = '/hint/' + data.player?.studentId)}
				variant="default"
			>
				<MessageCircleQuestion class="mr-2" />
				Get your new hint
			</Button>

			<Button onclick={() => (window.location.href = '/')} variant="secondary">
				<Home class="mr-2" />
				Go home
			</Button>
		</div>
	{:else}
		<h1 class="text-4xl font-black">QR Code Error</h1>
		<p>
			{data.location.reason}
		</p>

		<div class="flex w-full flex-row flex-wrap items-center justify-around gap-2">
			<Button
				onclick={() => (window.location.href = '/hint/' + data.player?.studentId)}
				variant="default"
			>
				<MessageCircleQuestion class="mr-2" />
				Get your current hint
			</Button>

			<Button onclick={() => (window.location.href = '/')} variant="secondary">
				<Home class="mr-2" />
				Go home
			</Button>
		</div>
	{/if}
</Card>
