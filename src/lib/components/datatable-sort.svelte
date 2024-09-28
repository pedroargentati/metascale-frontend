<script lang="ts">
	import Icon from '@iconify/svelte';

	export let handler;
	export let orderBy: string;
	export let label: string;
	$: sorted = handler.getSort();
</script>

<th class="cursor-pointer text-primary-content" on:click={() => handler.sort(orderBy)}>
	<div class="flex h-full items-center justify-start gap-x-2">
		{label}
		{#if $sorted.identifier === orderBy}
			{#if $sorted.direction === 'asc'}
				<Icon icon="mdi:menu-down" />
			{:else if $sorted.direction === 'desc'}
				<Icon icon="mdi:menu-up" />
			{/if}
		{:else}
			<Icon icon="mdi:menu-swap" />
		{/if}
	</div>
</th>
