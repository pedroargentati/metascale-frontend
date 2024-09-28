<script lang="ts">
	export let handler;

	const pageNumber = handler.getPageNumber();
	const pageCount = handler.getPageCount();
	const pages = handler.getPages({ ellipsis: true });
</script>

<!-- Desktop buttons -->
<section class="join bg-base-300">
	<button
		disabled={$pageNumber === 1}
		on:click={() => handler.setPage('previous')}
		class="btn btn-sm join-item bg-base-200"
	>
		{'🞀'}
	</button>

	{#each $pages as page}
		<button
			class:bg-secondary={$pageNumber === page}
			on:click={() => handler.setPage(page)}
			class="btn btn-sm join-item bg-base-200/50"
		>
			{page}
		</button>
	{/each}
	<button
		disabled={$pageNumber === $pageCount}
		on:click={() => handler.setPage('next')}
		class="btn btn-sm join-item bg-base-200">{'🞂'}</button
	>
</section>
