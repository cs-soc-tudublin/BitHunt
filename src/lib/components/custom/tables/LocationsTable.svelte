<script>
	import AbstractTable from '$lib/components/custom/tables/AbstractTable.svelte';
	import * as Table from '$lib/components/shad/ui/table/index';
	import * as Popover from '$lib/components/shad/ui/popover/index';
	import { Button, buttonVariants } from '$lib/components/shad/ui/button/index';
	import { Input } from '$lib/components/shad/ui/input/index.js';
	import { Trash, QrCodeIcon } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import QrCode from 'svelte-qrcode';
	import LocationsDialogue from '$lib/components/custom/dialogues/LocationsDialogue.svelte';

	let { content, games } = $props();

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
					<Table.Cell class={item.gameId === null ? 'text-neutral-500' : 'text-primary'}
						>{item.gameId !== null
							? games.find(({ id }) => id === item.gameId).name
							: 'No games bound'}</Table.Cell
					>
					<Table.Cell class="flex flex-row items-center justify-between">
						<LocationsDialogue
							id={item.id}
							name={item.name}
							hint={item.hint}
							activate={item.active}
							game={games}
							disabled={false}
							buttonText="Edit"
						/>

						<Popover.Root>
							<Popover.Trigger class={buttonVariants({ variant: 'outline' })}
								><QrCodeIcon /></Popover.Trigger
							>
							<Popover.Content class="w-80">
								<div class="grid gap-4 text-center">
									<div class="space-y-2">
										<h1 class="text-xl leading-none font-black">
											{item.name} QR Code
										</h1>
										<div class="flex items-center justify-center">
											<QrCode value={item.qrCode} class="h-fit w-fit" />
										</div>
									</div>
								</div></Popover.Content
							>
						</Popover.Root>

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
										<form class="flex flex-col" action="?/deleteLocation" method="POST" use:enhance>
											<Input type="hidden" name="id" value={item.id} />
											<p class="text-sm text-gray-500">
												Are you sure you want to delete this location? This action cannot be undone.
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
				<Table.Cell colspan={6} class="text-center">No locations found.</Table.Cell>
			</Table.Row>
		{/if}
	{/snippet}
</AbstractTable>
