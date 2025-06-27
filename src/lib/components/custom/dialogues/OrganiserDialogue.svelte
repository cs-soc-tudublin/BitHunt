<script lang="ts">
	import AbstractDialogue from '$lib/components/custom/dialogues/AbstractDialogue.svelte';
	import { Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/shad/ui/button';
	import { Label } from '$lib/components/shad/ui/label';
	import { Input } from '$lib/components/shad/ui/input';
	import { enhance } from '$app/forms';
</script>

<AbstractDialogue>
	{#snippet button()}
		<Plus />
	{/snippet}

	{#snippet header()}
		Create Organiser
	{/snippet}

	{#snippet description()}
		Fill in the details to create a new organiser.
	{/snippet}

	{#snippet body()}
		<form class="flex flex-col" action="?/create-organiser" method="POST" use:enhance>
			<Label for="game-name">Game Name</Label>
			<Input type="text" id="game-name" name="name" required />

			<Label for="game-description" class="mt-4">Description</Label>
			<Input id="game-description" type="text" name="description" required />
		</form>
	{/snippet}

	{#snippet footer()}
		<Button type="submit">Create</Button>
	{/snippet}
</AbstractDialogue>
