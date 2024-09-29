<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { ICanonico } from '../../../../core/interfaces/canonico';
	import { CanonicoService } from '../../../../server/services/canonical';

	// Dados do formulário, com estrutura correspondente ao objeto fornecido
	let formData: ICanonico = {
		statusCanonico: 'A',
		chamadas: [],
		descricao: '',
		versao: 1,
		nome: '',
		tipoPosProcessamento: 'CUSTOM',
		topicos: [''],
		formatoChave: '',
	};

	let itemId: string | null = null;

	onMount(async () => {
		const $page = get(page);
		console.log($page.params);

		// Verificar se o parâmetro 'nomeCanonico' está presente
		if ($page.params && $page.params.nomeCanonico) {
			itemId = $page.params.nomeCanonico;

			// Buscando os dados do item a ser editado
			try {
				const canonico: ICanonico = await CanonicoService.getCanonicoById(itemId);
				if (!canonico) {
					throw new Error('Erro ao buscar dados do item');
				}
				// Preenchendo o formData com os dados do item
				formData = canonico;
			} catch (error) {
				console.error('Erro ao buscar o item:', error);
				alert(`Erro ao carregar os dados do item: ${(error as Error).message}`);
				goto('/');
			}
		} else {
			alert('Item inválido. Redirecionando para a página inicial.');
			goto('/');
		}
	});

	function handleSubmit() {
		try {
			// Validar o formato da chave
			validateFormatoChave(formData.formatoChave);

			// Lógica de envio do formulário para o backend
			console.log('Formulário de edição enviado:', formData);
			alert('Registro editado com sucesso!');

			// Redirecionar após a edição
			goto('/');
		} catch (error) {
			// Tratamento de erro de validação
			alert(`Erro ao enviar formulário: ${(error as Error).message}`);
			console.error(error);
		}
	}

	function handleCancel() {
		// Redirecionar para a página principal sem salvar
		goto('/');
	}

	// Função para validar o formato da chave usando regex
	function validateFormatoChave(formatoChave: string) {
		const regex = /^\{[a-zA-Z]+:[a-zA-Z]+\}(?:\{[a-zA-Z]+:[a-zA-Z]+\})*$/;
		if (!regex.test(formatoChave)) {
			throw new Error(
				'O campo "Formato da Chave" deve ter a estrutura correta: "{nome:parametro}" ou múltiplos "{nome:parametro}".',
			);
		}
	}

	// Função para adicionar uma nova chamada
	function addChamada() {
		const novaChamada = {
			ordem: formData.chamadas.length + 1,
			nome: '',
			parametros: [
				{
					tipoDado: 'number',
					nome: '',
					tipo: 'path',
				},
			],
			url: '',
			descricao: '',
		};

		// Atualizar o array de chamadas de forma reativa
		formData = {
			...formData,
			chamadas: [...formData.chamadas, novaChamada],
		};
	}

	function goBack(): void {
		goto('/');
	}
</script>

<div class="min-h-screen w-full flex items-start justify-center p-8 overflow-auto">
	<div class="w-full max-w-5xl bg-white shadow-xl rounded-lg p-10 mt-8">
		<!-- Formulário de Edição -->
		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<!-- Botão de Voltar -->
			<button
				on:click={goBack}
				type="button"
				class="btn btn-outline btn-secondary flex items-center gap-2 mb-6"
			>
				<Icon icon="mdi:arrow-left" inline={true} />
				<span>Voltar</span>
			</button>

			<!-- Título do Formulário -->
			<h2 class="text-3xl font-bold mb-8 text-center text-black">Editar Canônico</h2>

			<!-- Campo Nome -->
			<div class="form-control">
				<label class="label" for="nome">
					<span class="label-text font-semibold text-black">Nome</span>
				</label>
				<input
					type="text"
					id="nome"
					class="input text-black input-bordered w-full"
					bind:value={formData.nome}
					placeholder="Digite o nome"
					required
				/>
			</div>

			<!-- Campo Descrição -->
			<div class="form-control">
				<label class="label" for="descricao">
					<span class="label-text font-semibold text-black">Descrição</span>
				</label>
				<textarea
					id="descricao"
					class="textarea text-black textarea-bordered w-full"
					bind:value={formData.descricao}
					placeholder="Digite uma descrição"
					required
				></textarea>
			</div>

			<!-- Campo Tipo de Pós-Processamento -->
			<div class="form-control">
				<label class="label" for="tipoPosProcessamento">
					<span class="label-text font-semibold text-black"
						>Tipo de Pós-Processamento</span
					>
				</label>
				<select
					id="tipoPosProcessamento"
					class="select select-bordered w-full text-black"
					bind:value={formData.tipoPosProcessamento}
				>
					<option value="CUSTOM">CUSTOM</option>
					<option value="DEFAULT">DEFAULT</option>
				</select>
			</div>

			<!-- Campo Versão -->
			<div class="form-control">
				<label class="label" for="versao">
					<span class="label-text font-semibold text-black">Versão</span>
				</label>
				<input
					type="number"
					id="versao"
					readonly
					class="input input-bordered w-full text-black"
					bind:value={formData.versao}
					placeholder="Digite a versão"
					required
				/>
			</div>

			<!-- Campo Chaves de Chamadas -->
			<div class="form-control">
				<label class="label" for="formatoChave">
					<span class="label-text font-semibold text-black">Formato da Chave</span>
				</label>
				<input
					type="text"
					id="formatoChave"
					class="input input-bordered w-full text-black"
					bind:value={formData.formatoChave}
					placeholder="Digite o formato da chave (ex: &#123;getCustomer:id&#125;)"
					required
				/>
			</div>

			<!-- Campo Chamadas -->
			{#each formData.chamadas as chamada, index}
				<div class="form-control border border-gray-300 rounded-lg p-6 mb-6">
					<h3 class="text-xl font-bold mb-4 text-black">Chamada {index + 1}</h3>

					<label class="label" for="ordem-{index}">
						<span class="label-text font-semibold text-black">Ordem</span>
					</label>
					<input
						type="number"
						id="ordem-{index}"
						class="input input-bordered w-full text-black"
						bind:value={chamada.ordem}
						required
					/>

					<label class="label" for="nomeChamada-{index}">
						<span class="label-text font-semibold text-black">Nome da Chamada</span>
					</label>
					<input
						type="text"
						id="nomeChamada-{index}"
						class="input input-bordered w-full text-black"
						bind:value={chamada.nome}
						placeholder="Digite o nome da chamada"
						required
					/>

					<label class="label" for="url-{index}">
						<span class="label-text font-semibold text-black">URL</span>
					</label>
					<input
						type="text"
						id="url-{index}"
						class="input input-bordered w-full text-black"
						bind:value={chamada.url}
						placeholder="Digite a URL"
						required
					/>

					<label class="label" for="descricaoChamada-{index}">
						<span class="label-text font-semibold text-black">Descrição da Chamada</span
						>
					</label>
					<textarea
						id="descricaoChamada-{index}"
						class="textarea textarea-bordered w-full text-black"
						bind:value={chamada.descricao}
						placeholder="Digite a descrição da chamada"
						required
					></textarea>
				</div>
			{/each}

			<!-- Botão para adicionar uma nova chamada -->
			<div class="flex justify-end">
				<button type="button" class="btn btn-outline btn- text-black" on:click={addChamada}>
					Adicionar Chamada
				</button>
			</div>

			<!-- Botões de Ação -->
			<div class="flex gap-6 mt-8">
				<button type="submit" class="btn btn-primary w-1/2">Salvar</button>
				<button type="button" class="btn btn-secondary w-1/2" on:click={handleCancel}>
					Cancelar
				</button>
			</div>
		</form>
	</div>
</div>
