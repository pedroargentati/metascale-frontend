<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		DataTableCount,
		DataTablePagination,
		DataTableSearch,
		DataTableSort,
		DataTableView,
	} from '$lib/components';
	import { DataHandler } from '@vincjo/datatables';

	export let data: any[] = [];
	export let rowsPerPage: number = 5;
	export let columns: { label: string; key: string }[] = [];

	const handler = new DataHandler(data, { rowsPerPage });

	$: rows = handler.getRows();

	function handleSelect(e: any, row: any) {
		console.log('e, row: ', e, row);
	}

	function handleEdit(row: any) {
		// Redireciona para a página de edição com o ID do item
		goto(`/canonical/edit/${row.id}`);
	}

	function handleDelete(row: any) {
		// Aqui deve ser implementada a lógica de exclusão
		console.log('Excluir item:', row);
		alert(`Excluir item: ${row.id}`);
	}
</script>

<div class="z-0 w-full space-y-4 overflow-x-auto p-4">
	<!-- Header -->
	<header class="flex justify-between">
		<DataTableSearch handler={handler} />
		<DataTableView handler={handler} />
	</header>
	<!-- Table -->
	<table class="table w-full table-auto bg-primary">
		<thead>
			<tr>
				{#each columns as column}
					<DataTableSort handler={handler} orderBy={column.key} label={column.label} />
				{/each}
				<th>Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr
					class="bg-base-200 even:bg-base-300 hover:text-primary transition-all hover:scale-[1.01] hover:cursor-pointer"
					on:click={(event) => handleSelect(event, row)}
					tabindex={1}
				>
					{#each columns as column}
						<td>
							{row[column.key]}
						</td>
					{/each}
					<td class="flex items-center gap-2">
						<!-- Botão de editar -->
						<button class="btn btn-xs btn-warning" on:click={() => handleEdit(row)}>
							Editar
						</button>
						<!-- Botão de excluir -->
						<button class="btn btn-xs btn-error" on:click={() => handleDelete(row)}>
							Excluir
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex items-center justify-between">
		<DataTableCount handler={handler} />
		<DataTablePagination handler={handler} />
	</footer>
</div>
