<script lang="ts">
	import AbstractDialogue from '$lib/components/custom/dialogues/AbstractDialogue.svelte';
	import { Pen, Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/shad/ui/button';
	import { Label } from '$lib/components/shad/ui/label';
	import { Input } from '$lib/components/shad/ui/input';
	import { enhance } from '$app/forms';
	import { Switch } from '$lib/components/shad/ui/switch';

	let {
		name = $bindable(''),
		textDesc = $bindable(''),
		organisers = $bindable(''),
		prizes = $bindable(''),
		prizeQty = $bindable(0),
		activate = $bindable(false),
		leaderboard = $bindable(false),
		buttonText = 'Create'
	}: {
		name: string;
		textDesc: string;
		organisers: string;
		prizes: string;
		prizeQty: number;
		activate: boolean;
		leaderboard: boolean;
		buttonText: string;
	} = $props();
</script>

<AbstractDialogue>
	{#snippet button()}
		{#if buttonText === 'Create'}
			<Plus />
		{:else}
			<Pen />
		{/if}
	{/snippet}

	{#snippet header()}
		{#if buttonText === 'Create'}
			Create New Game
		{:else}
			Edit Game: {name}
		{/if}
	{/snippet}

	{#snippet description()}
		{#if buttonText === 'Create'}
			Fill in the details to create a new game.
		{:else}
			Edit the details of {name}.
		{/if}
	{/snippet}

	{#snippet body()}
		<form class="flex flex-col" action="?/createGame" method="POST" use:enhance>
			<Label for="game-name" class="my-4"
				>Game Name <span class="font-bold text-red-500">*</span></Label
			>
			<Input type="text" id="game-name" name="game-name" bind:value={name} required />

			<Label for="game-description" class="my-4">Description</Label>
			<Input id="game-description" type="text" name="description" bind:value={textDesc} />

			<Label for="organisers" class="my-4"
				>Organisers <span class="font-bold text-red-500">*</span></Label
			>
			<Input type="text" name="organisers" id="organisers" bind:value={organisers} />

			<Label for="activate" class="my-4">Set Game as Active</Label>
			<Input type="hidden" id="activate" name="activate" bind:value={activate} />
			<Switch id="activate" bind:checked={activate} />

			<Label for="prizes" class="my-4">Prizes</Label>
			<Input type="text" id="prizes" name="prizes" bind:value={prizes} />

			<Label for="prize-qty" class="my-4">Prize Quantity</Label>
			<Input type="number" id="prize-qty" name="prize-qty" bind:value={prizeQty} min="1" />

			<Label for="leaderboard" class="my-4">Activate Leaderboard</Label>
			<Input type="hidden" id="leaderboard" name="activate" bind:value={leaderboard} />
			<Switch id="leaderboard" bind:checked={leaderboard} />

			<Button type="submit" class="my-4">{buttonText}</Button>
		</form>
	{/snippet}
</AbstractDialogue>
