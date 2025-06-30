<script lang="ts">
	import * as Dialog from '$lib/components/shad/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/shad/ui/button/index.js';

	let { button, header, description, body, footer = null, disabled = false } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })} {disabled}>
		{@render button()}
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>
				{@render header()}
			</Dialog.Title>

			{#if description}
				<Dialog.Description>
					{@render description()}
				</Dialog.Description>
			{/if}
		</Dialog.Header>

		{#if body}
			{@render body()}
		{/if}

		{#if footer}
			<Dialog.Footer>
				{@render footer()}
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
