<script lang="ts">
	import { Card } from '$lib/components/shad/ui/card';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/shad/ui/input/index.js';
	import { Label } from '$lib/components/shad/ui/label';
	import Required from '$lib/components/custom/Required.svelte';
	import { Button } from '$lib/components/shad/ui/button';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>BitHunt - Login</title>
</svelte:head>

<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
	<h1 class="text-4xl font-black">Login to {data.game.name}</h1>

	<form class="flex w-full flex-col text-lg md:w-1/2" action="?/login" method="POST" use:enhance>
		<Label for="student-number" class="my-4">Student Number<Required /></Label>
		<Input type="text" name="student-number" />

		{#if !form?.login.successful}
			<h1 class="mt-4 text-red-500">{form?.login.reason}</h1>
		{/if}

		<div class="flex w-full flex-col items-start">
			<Button type="submit" class="my-4">Log in</Button>
		</div>
	</form>
</Card>
