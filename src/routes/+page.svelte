<script lang="ts">
	import type { PageProps } from './$types';
	import Card from '$lib/components/shad/ui/card/card.svelte';
	import { pluralise } from '$lib';
	import { Button } from '$lib/components/shad/ui/button';
	import { User, UserPlus, Trophy } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<div class="w-full p-2 md:w-1/2 md:p-0">
	<Card class="m-4 flex flex-col items-center justify-center text-center">
		{#if data.games.length === 0}
			<h1 class="text-2xl font-black md:text-4xl">NO ACTIVE GAMES</h1>

			<p class="text-neutral-500 italic">
				If you believe this to be a mistake, please contact an organiser.
			</p>
		{:else if data.games.length === 1}
			<h1 class="text-2xl font-black md:text-4xl">
				{data.games[0].name}
			</h1>

			<h2 class="text-lg md:text-2xl">
				<span class="font-bold">Hosted by:</span>
				{data.games[0].organisers}
			</h2>

			{#if data.games[0].description !== ''}
				<p class="text-neutral-500 italic">
					{data.games[0].description}
				</p>
			{/if}

			{#if data.games[0].prizes.length > 0}
				<p>
					Be in for a chance to win {data.games[0].prizeQty}
					{pluralise(data.games[0].prizes)}
				</p>
			{/if}

			<div class="flex flex-row flex-wrap items-center justify-center gap-2">
				<Button
					onclick={() => (window.location.href = '/login/' + data.games[0].id)}
					variant="default"
				>
					<User class="mr-2" />
					Login
				</Button>

				<Button
					onclick={() => (window.location.href = '/register/' + data.games[0].id)}
					variant="secondary"
				>
					<UserPlus class="mr-2" />
					Register
				</Button>

				{#if data.games[0].enableLeaderboard}
					<Button
						onclick={() => (window.location.href = '/leaderboard/' + data.games[0].id)}
						variant="outline"
					>
						<Trophy class="mr-2" />
						Leaderboard
					</Button>
				{/if}
			</div>
		{/if}
	</Card>
</div>
