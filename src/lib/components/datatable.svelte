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
	import toastr from 'toastr';
	import type { ICanonicoItemList } from '../../core/interfaces/canonico-list';

	export let data: any[] = [];
	export let rowsPerPage: number = 5;
	export let columns: { label: string; key: string }[] = [];

	const handler = new DataHandler(data, { rowsPerPage });

	$: rows = handler.getRows();

	let showModal = false;
	let selectedRow: ICanonicoItemList | null = null;

	function handleSelect(e: any, row: any) {
		console.log('e, row: ', e, row);
	}

	// Funções para ações de Editar e Excluir
	function handleEdit(row: any) {
		console.log(row);
		goto(`/canonical-new/${row.nomeCanonico}`);
	}

	function handleInactivate(row: any) {
		selectedRow = row;
		showModal = true; // Abrir o modal de confirmação
	}

	function confirmDelete() {
		console.log('Inativar item:', selectedRow);
		toastr.success(`Canônico ${selectedRow?.nomeCanonico} inativado com sucesso !`);
		showModal = false; // Fechar o modal
	}

	function cancelDelete() {
		showModal = false; // Fechar o modal sem realizar nenhuma ação
		toastr.info('Operação cancelada.');
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
						<!-- Adicionando ações de Editar e Excluir -->
						<button
							class="btn btn-xs btn-warning"
							on:click={(e) => {
								e.stopPropagation();
								handleEdit(row);
							}}
						>
							Editar
						</button>
						<button
							class="btn btn-xs btn-error"
							on:click={(e) => {
								e.stopPropagation();
								handleInactivate(row);
							}}
						>
							Inativar
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

<!-- Modal de Confirmação -->
{#if showModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-96">
			<h2 class="text-xl font-bold mb-4">Confirmação de Inativação</h2>
			<p class="mb-6">
				Você realmente deseja inativar este item? Isso poderá impactar os loads futuros e
				pode afetar o comportamento do sistema.
			</p>
			<div class="flex justify-end gap-4">
				<button class="btn btn-secondary" on:click={cancelDelete}>Cancelar</button>
				<button class="btn btn-error" on:click={confirmDelete}>Inativar</button>
			</div>
		</div>
	</div>
{/if}
