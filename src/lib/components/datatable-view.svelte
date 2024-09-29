<script lang="ts">
	export let handler;

	const rowsPerPage = handler.getRowsPerPage();
	const options = [5, 10, 15, 25, 50, 100];
</script>

<div>
	<select
		class="select ml-2 bg-base-200"
		bind:value={$rowsPerPage}
		on:change={() => {
			handler.setPage(1);
		}}
	>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
</div>
