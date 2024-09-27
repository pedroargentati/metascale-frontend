<script lang="ts">
	export let handler;
	const rowCount = handler.getRowCount();
</script>

<div class="text-sm">
	{#if $rowCount.total > 0}
		<b>{$rowCount.start}</b> - <b>{$rowCount.end}</b> / <b>{$rowCount.total}</b>
	{:else}
		<p class="text-center">Nenhum registro encontrado...</p>
	{/if}
</div>
