<script lang="ts">
	export let handler;

	let rowsPerPage = handler.getRowsPerPage();
	let options = [5, 10, 15, 25, 50, 100];
</script>

<div>
	Mostrar
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
