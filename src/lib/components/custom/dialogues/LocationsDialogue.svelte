<script lang="ts">
	import AbstractDialogue from '$lib/components/custom/dialogues/AbstractDialogue.svelte';
	import { Plus, Pen } from '@lucide/svelte';
	import { Button } from '$lib/components/shad/ui/button';
	import { Label } from '$lib/components/shad/ui/label';
	import { Input } from '$lib/components/shad/ui/input';
	import { enhance } from '$app/forms';
	import * as Select from '$lib/components/shad/ui/select/index.js';
	import * as Tooltip from '$lib/components/shad/ui/tooltip/index.js';
	import { Switch } from '$lib/components/shad/ui/switch';
	import Required from '$lib/components/custom/Required.svelte';

	let {
		id = $bindable(0),
		name = $bindable(''),
		hint = $bindable(''),
		activate = $bindable(true),
		game = $bindable([]),
		selected = $bindable(''),
		disabled = $bindable(false),
		buttonText = $bindable('Create')
	}: {
		id?: number;
		name?: string;
		hint?: string;
		activate?: boolean;
		game?: Array<{ id: number; name: string }>;
		selected?: string;
		disabled?: boolean;
		buttonText?: 'Create' | 'Edit';
	} = $props();

	let selectTrigger = $derived(
		selected !== ''
			? game.find(({ id }) => id.toString() === selected.toString())?.name
			: 'Select Games'
	);

	let overallDisable = $derived(buttonText === 'Create' ? game.length === 0 || disabled : false);
	let buttonDisabled = $derived(
		buttonText === 'Create' ? game.length === 0 || disabled : game.length === 0
	);
</script>

<AbstractDialogue disabled={overallDisable}>
	{#snippet button()}
		{#if buttonText === 'Create'}
			<Plus />
		{:else}
			<Pen />
		{/if}
	{/snippet}

	{#snippet header()}
		Create Location
	{/snippet}

	{#snippet description()}
		Fill in the details to create a new location.
	{/snippet}

	{#snippet body()}
		<form
			class="flex w-full flex-col"
			action="?/{buttonText.toLowerCase()}Location"
			method="POST"
			use:enhance
		>
			<Input type="hidden" name="id" value={id} />

			<Label for="location-name" class="my-4">Location Name <Required /></Label>
			<Input type="text" id="location-name" name="location-name" required bind:value={name} />

			<Label for="hint" class="my-4">Hint <Required /></Label>
			<Input id="hint" type="text" name="hint" required bind:value={hint} />

			<Label for="activate" class="my-4">Active</Label>
			<Switch id="activate" name="activate" bind:checked={activate} />

			<Label for="game" class="my-4">Games <Required /></Label>
			<Input type="hidden" id="game" name="game" value={selected} />
			<Select.Root type="single" bind:value={selected} disabled={overallDisable}>
				<Select.Trigger class="w-fit min-w-[180px]">{selectTrigger}</Select.Trigger>
				<Select.Content>
					{#each game as game (game)}
						<Select.Item value={game.id.toString()}>{game.name}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			<div class="flex w-full flex-col items-end">
				<Tooltip.Provider delayDuration={0} disabled={!buttonDisabled}>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Button type="submit" class="ml-auto" disabled={buttonDisabled}>{buttonText}</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p class="text-pretty">
								To {buttonText.toLowerCase()} a location, you must select at least one game.
								<br />
								Please select a game from the list.
							</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</form>
	{/snippet}
</AbstractDialogue>
