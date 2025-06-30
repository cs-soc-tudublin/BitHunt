<script lang="ts">
	import type { PageProps } from './$types';
	import { Input } from '$lib/components/shad/ui/input';
	import { Button } from '$lib/components/shad/ui/button';
	import { enhance } from '$app/forms';
	import { Card } from '$lib/components/shad/ui/card';
	import { ChevronRight } from '@lucide/svelte';
	import * as Tabs from '$lib/components/shad/ui/tabs/index';
	import GameDialogue from '$lib/components/custom/dialogues/GameDialogue.svelte';
	import LocationsDialogue from '$lib/components/custom/dialogues/LocationsDialogue.svelte';
	import GamesTable from '$lib/components/custom/tables/GamesTable.svelte';
	import LocationsTable from '$lib/components/custom/tables/LocationsTable.svelte';
	import * as Tooltip from '$lib/components/shad/ui/tooltip/index.js';

	let { data, form }: PageProps = $props();

	let tab = $state('games');
	let locationCreationDisabled = $derived(data?.games?.length === 0);
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
	<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
		<Tabs.Root bind:value={tab} class="flex w-full flex-col items-center justify-center">
			<div class="flex w-auto flex-row items-center justify-between lg:w-max">
				<Tabs.List class="w-auto lg:w-max">
					<Tabs.Trigger value="games">Games</Tabs.Trigger>
					<Tabs.Trigger value="locations">Locations</Tabs.Trigger>
				</Tabs.List>

				<div class="ml-4 w-auto">
					{#if tab === 'games'}
						<GameDialogue />
					{:else if tab === 'locations'}
						<Tooltip.Provider delayDuration={0} disabled={!locationCreationDisabled}>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<LocationsDialogue game={data?.games} />
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p class="text-pretty">
										Locations cannot be created without any games.
										<br />
										Create a game first.
									</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					{/if}
				</div>
			</div>
			<Tabs.Content value="games" class="w-full">
				<GamesTable content={data?.games} />
			</Tabs.Content>
			<Tabs.Content value="locations" class="w-full">
				<LocationsTable content={data?.locations} games={data?.games} />
			</Tabs.Content>
		</Tabs.Root>
	</Card>
{/if}
