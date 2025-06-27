<script lang="ts">
	import * as Table from '$lib/components/shad/ui/table/index';

	let { cols, body } = $props();
</script>

<Table.Root class="w-full">
	<Table.Header>
		<Table.Row>
			{#each cols as col (col)}
				<Table.Head>{col}</Table.Head>
			{/each}
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#if body}
			{@render body()}
		{/if}
	</Table.Body>
</Table.Root>
