<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import toastr from 'toastr';
	import type { ICanonico } from '../../../../core/interfaces/canonico';
	import { CanonicalUtils } from './../../../../core/utils/canonical-utils';
	import { CanonicoService } from './../../../../server/services/canonical';

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
				toastr.error(
					`Erro ao carregar os dados do item: ${(error as Error).message}`,
					'Erro',
				);
				goto('/');
			}
		} else {
			toastr.error('Item inválido. Redirecionando para a página inicial.', 'Erro');
			goto('/');
		}
	});

	async function handleSubmit() {
		try {
			// Validar o formato da chave
			validateFormatoChave(formData.formatoChave);

			await CanonicoService.updateCanonico(formData);

			// Lógica de envio do formulário para o backend
			console.log('Formulário de edição enviado:', formData);
			toastr.success('Registro editado com sucesso!', 'Sucesso');

			// Redirecionar após a edição
			goto('/');
		} catch (error) {
			// Tratamento de erro de validação
			toastr.error(`Erro ao enviar formulário: ${(error as Error).message}`, 'Erro');
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

		formData = {
			...formData,
			chamadas: [...formData.chamadas, novaChamada],
		};
		toastr.success('Nova chamada adicionada.', 'Sucesso');
	}

	// Função para remover uma chamada
	function removeChamada(chamadaIndex: number) {
		console.log('removendo chamada', chamadaIndex);
		formData.chamadas = formData.chamadas.filter((_, index) => index !== chamadaIndex);
		toastr.info('Chamada removida.', 'Info');
	}

	// Função para adicionar um novo parâmetro a uma chamada
	function addParametro(chamadaIndex: number) {
		const chamada = formData.chamadas[chamadaIndex];
		chamada.parametros = [
			...chamada.parametros,
			{ tipoDado: 'string', nome: '', tipo: 'query' },
		];

		formData.chamadas = [
			...formData.chamadas.slice(0, chamadaIndex),
			chamada,
			...formData.chamadas.slice(chamadaIndex + 1),
		];
		toastr.success('Novo parâmetro adicionado.', 'Sucesso');
	}

	// Função para remover um parâmetro
	function removeParametro(chamadaIndex: number, parametroIndex: number) {
		console.log('removendo parametro', chamadaIndex, parametroIndex);
		const chamada = formData.chamadas[chamadaIndex];
		chamada.parametros = chamada.parametros.filter((_, index) => index !== parametroIndex);

		formData.chamadas = [
			...formData.chamadas.slice(0, chamadaIndex),
			chamada,
			...formData.chamadas.slice(chamadaIndex + 1),
		];
		toastr.info('Parâmetro removido.', 'Info');
	}

	// Função para adicionar um novo tópico
	function addTopico() {
		formData.topicos = [...formData.topicos, ''];
		toastr.success('Novo tópico adicionado.', 'Sucesso');
	}

	// Função para remover um tópico
	function removeTopico(topicoIndex: number) {
		formData.topicos = formData.topicos.filter((_, index) => index !== topicoIndex);
		toastr.info('Tópico removido.', 'Info');
	}

	function goBack(): void {
		goto('/');
	}

	// Função para gerar o JSON do formulário
	async function generateJson() {
		await CanonicalUtils.generateJson(formData);
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
					required
				/>
			</div>
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

			<!-- Campo Tópicos -->
			{#each formData.topicos as topico, topicoIndex}
				<div class="form-control mb-4 relative">
					<label class="label" for="topico-{topicoIndex}">
						<span class="label-text font-semibold text-black"
							>Tópico {topicoIndex + 1}</span
						>
					</label>
					<input
						type="text"
						id="topico-{topicoIndex}"
						class="input input-bordered w-full text-black"
						bind:value={formData.topicos[topicoIndex]}
						placeholder="Digite o tópico"
						required
					/>
					<button
						on:click={() => removeTopico(topicoIndex)}
						type="button"
						class="absolute top-2 right-2"
					>
						<Icon icon="mdi:close" class="cursor-pointer text-red-600" />
					</button>
				</div>
			{/each}

			<!-- Botão para adicionar um novo tópico -->
			<div class="flex justify-end mb-6">
				<button type="button" class="btn btn-outline btn-info" on:click={addTopico}>
					Adicionar Tópico
				</button>
			</div>

			<!-- Campo Chamadas -->
			{#each formData.chamadas as chamada, chamadaIndex}
				<div class="form-control border border-gray-300 rounded-lg p-6 mb-6 relative">
					<h3 class="text-xl font-bold mb-4 text-black">Chamada {chamadaIndex + 1}</h3>
					<button on:click={() => removeChamada(chamadaIndex)} type="button">
						<Icon
							icon="mdi:close"
							class="cursor-pointer text-red-600 absolute top-2 right-2"
						/>
					</button>

					<label class="label" for="ordem-{chamadaIndex}">
						<span class="label-text font-semibold text-black">Ordem</span>
					</label>
					<input
						type="number"
						id="ordem-{chamadaIndex}"
						class="input input-bordered w-full text-black"
						bind:value={chamada.ordem}
						required
					/>

					<label class="label" for="nomeChamada-{chamadaIndex}">
						<span class="label-text font-semibold text-black">Nome da Chamada</span>
					</label>
					<input
						type="text"
						id="nomeChamada-{chamadaIndex}"
						class="input input-bordered w-full text-black"
						bind:value={chamada.nome}
						placeholder="Digite o nome da chamada"
						required
					/>

					<label class="label" for="url-{chamadaIndex}">
						<span class="label-text font-semibold text-black">URL</span>
					</label>
					<input
						type="text"
						id="url-{chamadaIndex}"
						class="input input-bordered w-full text-black"
						bind:value={chamada.url}
						placeholder="Digite a URL"
						required
					/>

					<label class="label" for="descricaoChamada-{chamadaIndex}">
						<span class="label-text font-semibold text-black">Descrição da Chamada</span
						>
					</label>
					<textarea
						id="descricaoChamada-{chamadaIndex}"
						class="textarea textarea-bordered w-full text-black"
						bind:value={chamada.descricao}
						placeholder="Digite a descrição da chamada"
						required
					></textarea>

					<!-- Campo Parâmetros -->
					{#each chamada.parametros as parametro, parametroIndex}
						<div
							class="form-control border border-gray-200 rounded-lg p-4 mb-4 relative mt-4"
						>
							<h4 class="text-lg font-bold mb-2 text-black">
								Parâmetro {parametroIndex + 1}
							</h4>
							<button
								on:click={() => removeParametro(chamadaIndex, parametroIndex)}
								type="button"
							>
								<Icon
									icon="mdi:close"
									class="cursor-pointer text-red-600 absolute top-2 right-2"
								/>
							</button>
							<label
								class="label"
								for="nomeParametro-{chamadaIndex}-{parametroIndex}"
							>
								<span class="label-text font-semibold text-black"
									>Nome do Parâmetro</span
								>
							</label>
							<input
								type="text"
								id="nomeParametro-{chamadaIndex}-{parametroIndex}"
								class="input input-bordered w-full text-black"
								bind:value={parametro.nome}
								placeholder="Digite o nome do parâmetro"
								required
							/>

							<label class="label" for="tipoDado-{chamadaIndex}-{parametroIndex}">
								<span class="label-text font-semibold text-black">Tipo de Dado</span
								>
							</label>
							<select
								id="tipoDado-{chamadaIndex}-{parametroIndex}"
								class="select select-bordered w-full text-black"
								bind:value={parametro.tipoDado}
								required
							>
								<option value="string">string</option>
								<option value="number">number</option>
								<option value="boolean">boolean</option>
							</select>

							<label
								class="label"
								for="tipoParametro-{chamadaIndex}-{parametroIndex}"
							>
								<span class="label-text font-semibold text-black"
									>Tipo de Parâmetro</span
								>
							</label>
							<select
								id="tipoParametro-{chamadaIndex}-{parametroIndex}"
								class="select select-bordered w-full text-black"
								bind:value={parametro.tipo}
								required
							>
								<option value="query">query</option>
								<option value="path">path</option>
								<option value="body">body</option>
							</select>
						</div>
					{/each}

					<!-- Botão para adicionar um novo parâmetro -->
					<div class="flex justify-end">
						<button
							type="button"
							class="btn btn-outline btn- text-black"
							on:click={() => addParametro(chamadaIndex)}
						>
							Adicionar Parâmetro
						</button>
					</div>
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

			<!-- Botão para gerar JSON -->
			<div class="flex justify-center mt-8 mb-8">
				<button type="button" class="btn btn-outline btn-info" on:click={generateJson}>
					Gerar JSON do Formulário
				</button>
			</div>
		</form>
	</div>
</div>
