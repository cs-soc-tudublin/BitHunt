<script lang="ts">
	import type { PageProps } from './$types';
	import Card from '$lib/components/shad/ui/card/card.svelte';
	import { pluralise } from '$lib';
	import { Button } from '$lib/components/shad/ui/button';
	import { User, UserPlus, Trophy, MessageCircleQuestion, LogOut } from '@lucide/svelte';

	let { data }: PageProps = $props();

	const motivationTips = ['Keep going', 'Nearly there', 'Nice work', 'You got this'];
	let motivationText = $state('Use your hint to find the first code');

	if (data.player !== null && data.player?.scanned !== undefined && data.player?.scanned > 0) {
		motivationText = motivationTips[Math.floor(Math.random() * motivationTips.length)];
	}
</script>

<svelte:head>
	<title>BitHunt</title>
</svelte:head>

<div class="absolute bottom-0 left-0 m-5 font-mono text-sm text-neutral-500">v2.02</div>

<div class="w-full p-2 md:w-1/2 md:p-0">
	<Card class="m-4 flex flex-col items-center justify-center text-center">
		{#if data.game === null}
			<h1 class="text-2xl font-black md:text-4xl">NO ACTIVE game</h1>

			<p class="text-neutral-500 italic">
				If you believe this to be a mistake, please contact an organiser.
			</p>
		{:else}
			<h1 class="text-2xl font-black md:text-4xl">
				{data.game.name}
			</h1>

			<h2 class="text-lg md:text-2xl">
				<span class="font-bold">Hosted by:</span>
				{data.game.organisers}
			</h2>

			{#if data.game.description !== ''}
				<p class="text-neutral-500 italic">
					{data.game.description}
				</p>
			{/if}

			{#if data.game.prizes !== null && data.game?.prizeQty && data.game?.prizeQty > 0}
				<p>
					Be in for a chance to win one of {data.game.prizeQty}
					{pluralise(data.game.prizes)}
				</p>
			{/if}

			{#if !data.login.successful}
				<div class="flex flex-row flex-wrap items-center justify-center gap-2">
					<Button
						onclick={() => (window.location.href = '/login/' + data.game?.id)}
						variant="default"
					>
						<User class="mr-2" />
						Login
					</Button>

					<Button
						onclick={() => (window.location.href = '/register/' + data.game?.id)}
						variant="secondary"
					>
						<UserPlus class="mr-2" />
						Register
					</Button>

					{#if data.game.enableLeaderboard}
						<Button
							onclick={() => (window.location.href = '/leaderboard/' + data.game?.id)}
							variant="outline"
						>
							<Trophy class="mr-2" />
							Leaderboard
						</Button>
					{/if}
				</div>
			{:else}
				<div class="flex flex-col flex-wrap items-center justify-center gap-2">
					<h1 class="text-xl font-bold">Hi {data.player?.name}!</h1>

					{#if data.player.completed && data.player.prizeGiven}
						<p>You've been given your prize. You can now log out. Congrats!</p>
					{:else if data.player.completed}
						<p>You've completed the treasure hunt. Go back to get your prize!</p>
					{:else}
						<p>You have scanned {data.player?.scanned} codes so far. {motivationText}!</p>
					{/if}

					<div class="flex w-full flex-row flex-wrap items-center justify-around gap-2">
						{#if !data.player.completed && !data.player.prizeGiven}
							<Button
								onclick={() => (window.location.href = '/hint/' + data.player?.studentId)}
								variant="default"
							>
								<MessageCircleQuestion class="mr-2" />
								Current Hint
							</Button>
						{/if}

						<Button
							onclick={() => (window.location.href = '/logout/' + data.player?.studentId)}
							variant="secondary"
						>
							<LogOut class="mr-2" />
							Log out
						</Button>
					</div>
				</div>
			{/if}
		{/if}
	</Card>
</div>
