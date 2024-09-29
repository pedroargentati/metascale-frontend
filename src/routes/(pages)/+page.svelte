<script lang="ts">
	import { goto } from '$app/navigation';
	import { DataTable } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full p-4 bg-base-200 rounded-lg shadow-md">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-2xl font-semibold">Canônicos</h2>
		<!-- Botão de Incluir -->
		<button class="btn btn-primary btn-lg" on:click={() => goto('/canonical-new')}>
			+ Incluir
		</button>
	</div>
	<!-- Tabela -->
	<DataTable data={data.list} columns={data.columns} />
</div>
