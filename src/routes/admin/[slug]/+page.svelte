<script lang="ts">
	import type { PageProps } from './$types';
	import { Card } from '$lib/components/shad/ui/card';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/shad/ui/button';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Admin - Receive Prize</title>
</svelte:head>

<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
	{#if data.meta.notFound}
		<h1 class="mb-4 text-3xl font-bold">404 - Not Found</h1>
		<p>The prize code you provided does not exist.</p>
	{:else if data.receivedPrize}
		<h1 class="mb-4 text-3xl font-bold">Prize Already Redeemed</h1>
		<p>This player has already received their prize.</p>
	{:else if !data.won}
		<h1 class="mb-4 text-3xl font-bold">Not won</h1>
		<p>This player has not completed the treasure hunt yet.</p>
	{:else}
		<h1 class="mb-4 text-3xl font-bold">{data.player.name} has won!</h1>
		<p>Give them their prize and mark them as received here!</p>
		<form
			method="POST"
			action="?/received"
			use:enhance
			class="mt-4 flex w-full flex-col items-center"
		>
			<input type="hidden" name="id" value={data.player.id} />
			<Button type="submit">Mark as Received</Button>
		</form>
	{/if}
</Card>
