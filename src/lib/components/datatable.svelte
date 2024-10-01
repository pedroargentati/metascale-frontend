<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import {
		DataTableCount,
		DataTablePagination,
		DataTableRefresh,
		DataTableSearch,
		DataTableSort,
		DataTableView,
	} from '$lib/components';
	import { DataHandler } from '@vincjo/datatables';
	import toastr from 'toastr';
	import type { ICanonico } from '../../core/interfaces/canonico';
	import type { ICanonicoItemList } from '../../core/interfaces/canonico-list';
	import { CanonicoService } from '../../server/services/canonical';

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

	async function confirmDelete() {
		try {
			console.log('Inativar item:', selectedRow);

			// Inativar o item
			await CanonicoService.inactivateCanonico({
				nome: selectedRow?.nomeCanonico,
			} as ICanonico);

			await invalidateAll();
			toastr.success(`Canônico ${selectedRow?.nomeCanonico} inativado com sucesso !`);
			showModal = false; // Fechar o modal
		} catch (error) {
			console.error('Erro ao inativar o item:', error);
			toastr.error('Erro ao inativar o item. Tente novamente mais tarde.');
		}
	}

	function cancelDelete() {
		showModal = false; // Fechar o modal sem realizar nenhuma ação
		toastr.info('Operação cancelada.');
	}
</script>

<div class="z-0 w-full space-y-4 overflow-x-auto p-4">
	<!-- Header -->
	<header class="flex justify-between gap-2">
		<DataTableSearch handler={handler} />
		<DataTableView handler={handler} />
		<DataTableRefresh />
	</header>

	<!-- Table -->
	<table class="table w-full table-auto bg-primary">
		<thead>
			<tr>
				{#each columns as column}
					<DataTableSort handler={handler} orderBy={column.key} label={column.label} />
				{/each}
				<th class="text-white">Ações</th>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr
					class="bg-base-200 even:bg-base-300 hover:scale-100 hover:cursor-pointer hover:outline-1 hover:outline hover:outline-primary"
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
				<button class="btn" on:click={cancelDelete}>Cancelar</button>
				<button class="btn btn-error" on:click={confirmDelete}>Inativar</button>
			</div>
		</div>
	</div>
{/if}
