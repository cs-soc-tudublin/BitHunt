<script lang="ts">
	import '../app.css';
	import ModeToggle from '$lib/components/custom/ModeToggle.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex h-screen w-screen flex-col items-center justify-center">
	{@render children()}

	<ModeToggle />
</div>
