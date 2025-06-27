<script lang="ts">
	import type { PageProps } from './$types';
	import { Input } from '$lib/components/shad/ui/input';
	import { Button } from '$lib/components/shad/ui/button';
	import { enhance } from '$app/forms';
	import { Card } from '$lib/components/shad/ui/card';
	import { ChevronRight, Plus } from '@lucide/svelte';
	import * as Tabs from '$lib/components/shad/ui/tabs/index';
	import * as Table from '$lib/components/shad/ui/table/index';
	import { ScrollArea } from '$lib/components/shad/ui/scroll-area/index';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>BitHunt - Admin</title>
</svelte:head>

{#if !data.loggedIn}
	<div class="flex h-screen w-screen flex-col items-center justify-center p-6 text-center">
		<Card class="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
			<div class="flex flex-col items-center justify-center">
				<h1 class="text-4xl font-black md:text-6xl">Admin Login</h1>
			</div>

			<form
				class="flex w-full flex-row items-center justify-center text-lg md:w-1/2"
				action="?/login"
				method="POST"
				use:enhance
			>
				<Input
					type="password"
					name="password"
					placeholder="Enter admin password"
					class="rounded-tr-none rounded-br-none"
				/>

				<Button type="submit" variant="default" class="rounded-tl-none rounded-bl-none">
					<ChevronRight />
				</Button>
			</form>

			{#if !form?.attemptSuccessful}
				<h1 class="mt-4 text-red-500">Invalid password, please try again.</h1>
			{/if}
		</Card>
	</div>
{:else}
	<Card class="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
		<Tabs.Root value="games" class="flex flex-col items-center justify-center">
			<div class="flex w-full flex-row items-center justify-between">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="games">Games</Tabs.Trigger>
					<Tabs.Trigger value="organisers">Organisers</Tabs.Trigger>
					<Tabs.Trigger value="locations">Locations</Tabs.Trigger>
				</Tabs.List>

				<div class="ml-4 w-auto">
					<Button variant="outline" class="aspect-square h-auto w-9" href="?/create-game">
						<Plus />
					</Button>
				</div>
			</div>
			<Tabs.Content value="games" class="w-full">
				<ScrollArea orientation="both" class="w-full rounded-md border whitespace-nowrap">
					<Table.Root class="md:w-[400px] xl:w-[600px] 2xl:w-[800px]">
						<Table.Header>
							<Table.Row>
								<Table.Head>Event</Table.Head>
								<Table.Head>Active</Table.Head>
								<Table.Head>Prizes #</Table.Head>
								<Table.Head>Leaderboard</Table.Head>
								<Table.Head>Actions</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#if data.games && data.games?.length > 0}
								{#each data?.games as game (game)}
									<Table.Row>
										<Table.Cell>{game.name}</Table.Cell>
										<Table.Cell class={game.active ? 'text-green-500' : 'text-red-500'}
											>{game.active}</Table.Cell
										>
										<Table.Cell>{game.prizeQty ? game.prizeQty : '0'}</Table.Cell>
										<Table.Cell>
											<Button variant="default">Edit</Button>
											<Button variant="destructive">Delete</Button>
										</Table.Cell>
									</Table.Row>
								{/each}
							{:else}
								<Table.Row>
									<Table.Cell colspan={5} class="text-center">No games found.</Table.Cell>
								</Table.Row>
							{/if}
						</Table.Body>
					</Table.Root>
				</ScrollArea>
			</Tabs.Content>
			<Tabs.Content value="organisers">Change your password here.</Tabs.Content>
			<Tabs.Content value="locations">Change your locations here.</Tabs.Content>
		</Tabs.Root>
	</Card>
{/if}
