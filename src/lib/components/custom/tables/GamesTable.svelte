<script>
	import AbstractTable from '$lib/components/custom/tables/AbstractTable.svelte';
	import * as Table from '$lib/components/shad/ui/table/index';
	import * as Popover from '$lib/components/shad/ui/popover/index';
	import { Button, buttonVariants } from '$lib/components/shad/ui/button/index';
	import GameDialogue from '$lib/components/custom/dialogues/GameDialogue.svelte';
	import { Trash } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/shad/ui/input/index.js';

	let { content } = $props();

	const cols = ['Event', 'Active', 'Prizes #', 'Leaderboard', 'Actions'];
</script>

<AbstractTable {cols}>
	{#snippet body()}
		{#if content && content?.length > 0}
			{#each content as item (item)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell class={item.active ? 'text-green-500' : 'text-red-500'}
						>{item.active ? 'Yes' : 'No'}</Table.Cell
					>
					<Table.Cell>{item.prizeQty ? item.prizeQty + ' ' + item.prizes : '0'}</Table.Cell>
					<Table.Cell class={item.enableLeaderboard ? 'text-green-500' : 'text-red-500'}
						>{item.enableLeaderboard ? 'Yes' : 'No'}</Table.Cell
					>
					<Table.Cell class="flex flex-row items-center justify-between">
						<GameDialogue
							id={item.id}
							name={item.name}
							textDesc={item.description}
							organisers={item.organisers}
							prizes={item.prizes}
							prizeQty={item.prizeQty}
							activate={item.active}
							leaderboard={item.enableLeaderboard}
							buttonText="Edit"
						/>

						<Popover.Root>
							<Popover.Trigger class={buttonVariants({ variant: 'destructive' })}
								><Trash /></Popover.Trigger
							>
							<Popover.Content class="w-80">
								<div class="grid gap-4 text-center">
									<div class="space-y-2">
										<h1 class="text-xl leading-none font-black text-red-500">
											DELETE {item.name.toUpperCase()}
										</h1>
										<form class="flex flex-col" action="?/deleteGame" method="POST" use:enhance>
											<Input type="hidden" name="gameId" value={item.id} />
											<p class="text-sm text-gray-500">
												Are you sure you want to delete this game? This action cannot be undone.
											</p>
											<div class="mt-4 flex flex-row items-center justify-between">
												<Button type="submit" variant="destructive" class="w-full">Delete</Button>
											</div>
										</form>
									</div>
								</div></Popover.Content
							>
						</Popover.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		{:else}
			<Table.Row>
				<Table.Cell colspan={5} class="text-center">No games found.</Table.Cell>
			</Table.Row>
		{/if}
	{/snippet}
</AbstractTable>
