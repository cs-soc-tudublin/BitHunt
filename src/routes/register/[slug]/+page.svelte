<script lang="ts">
	import { Card } from '$lib/components/shad/ui/card';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/shad/ui/input/index.js';
	import { Label } from '$lib/components/shad/ui/label';
	import Required from '$lib/components/custom/Required.svelte';
	import { Button } from '$lib/components/shad/ui/button';
	import { Checkbox } from '$lib/components/shad/ui/checkbox';

	let { data, form } = $props();

	let privacyAgreed = $state(false);
</script>

<svelte:head>
	<title>BitHunt - Register</title>
</svelte:head>

<Card class="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
	<h1 class="text-4xl font-black">Compete in {data.game.name}</h1>

	<form class="flex w-full flex-col text-lg md:w-1/2" action="?/register" method="POST" use:enhance>
		<Label for="student-number" class="my-4">Student Number<Required /></Label>
		<Input type="text" name="student-number" required />

		<Label for="name" class="my-4">Name<Required /></Label>
		<Input type="text" name="name" required />

		<div class="my-4 flex flex-row items-center justify-around">
			<Label>I agree to the Privacy Policy<Required /></Label>
			<Checkbox id="policy" bind:checked={privacyAgreed} class="ml-2 h-6 w-6" required />
		</div>

		<div class="flex w-full flex-col items-start">
			<Button type="submit" disabled={!privacyAgreed} class="my-4">Create Account</Button>
		</div>

		{#if !form?.registration.successful}
			<h1 class="mt-4 text-red-500">{form?.registration.reason}</h1>
		{/if}
	</form>
</Card>
