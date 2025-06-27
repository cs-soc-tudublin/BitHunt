<script>
	import AbstractTable from '$lib/components/custom/tables/AbstractTable.svelte';
	import * as Table from '$lib/components/shad/ui/table/index';
	import { Button } from '$lib/components/shad/ui/button/index.js';

	let { content } = $props();

	const cols = ['Name', 'Hint', 'Active', 'Game', 'Actions'];
</script>

<AbstractTable {cols}>
	{#snippet body()}
		{#if content && content?.length > 0}
			{#each content as item (item)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.hint}</Table.Cell>
					<Table.Cell class={item.active ? 'text-green-500' : 'text-red-500'}
						>{item.active ? 'Yes' : 'No'}</Table.Cell
					>
					<Table.Cell>{item.game}</Table.Cell>
					<Table.Cell>
						<Button variant="default">Edit</Button>
						<Button variant="destructive">Delete</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		{:else}
			<Table.Row>
				<Table.Cell colspan={6} class="text-center">No locations found.</Table.Cell>
			</Table.Row>
		{/if}
	{/snippet}
</AbstractTable>
