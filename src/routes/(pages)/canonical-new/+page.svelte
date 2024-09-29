<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ICanonico } from '../../../core/interfaces/canonico';

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

	function handleSubmit() {
		try {
			// Validar o formato da chave
			validateFormatoChave(formData.formatoChave);

			// Lógica de envio do formulário para o backend
			console.log('Formulário enviado:', formData);
			alert('Registro incluído com sucesso!');

			// Redirecionar após a inclusão
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
</script>

<div class="min-h-screen w-full flex items-start justify-center p-8 bg-base-200 overflow-auto">
	<div class="w-full max-w-5xl bg-white shadow-xl rounded-lg p-10 mt-8">
		<h2 class="text-3xl font-bold mb-8 text-center">Incluir Novo Canônico</h2>
		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<!-- Campo Nome -->
			<div class="form-control">
				<label class="label" for="nome">
					<span class="label-text font-semibold">Nome</span>
				</label>
				<input
					type="text"
					id="nome"
					class="input input-bordered w-full"
					bind:value={formData.nome}
					placeholder="Digite o nome"
					required
				/>
			</div>

			<!-- Campo Descrição -->
			<div class="form-control">
				<label class="label" for="descricao">
					<span class="label-text font-semibold">Descrição</span>
				</label>
				<textarea
					id="descricao"
					class="textarea textarea-bordered w-full"
					bind:value={formData.descricao}
					placeholder="Digite uma descrição"
					required
				></textarea>
			</div>

			<!-- Campo Tipo de Pós-Processamento -->
			<div class="form-control">
				<label class="label" for="tipoPosProcessamento">
					<span class="label-text font-semibold">Tipo de Pós-Processamento</span>
				</label>
				<select
					id="tipoPosProcessamento"
					class="select select-bordered w-full"
					bind:value={formData.tipoPosProcessamento}
				>
					<option value="CUSTOM">CUSTOM</option>
					<option value="DEFAULT">DEFAULT</option>
				</select>
			</div>

			<!-- Campo Versão -->
			<div class="form-control">
				<label class="label" for="versao">
					<span class="label-text font-semibold">Versão</span>
				</label>
				<input
					type="number"
					id="versao"
					readonly
					class="input input-bordered w-full"
					bind:value={formData.versao}
					placeholder="Digite a versão"
					required
				/>
			</div>

			<!-- Campo Chaves de Chamadas -->
			<div class="form-control">
				<label class="label" for="formatoChave">
					<span class="label-text font-semibold">Formato da Chave</span>
				</label>
				<input
					type="text"
					id="formatoChave"
					class="input input-bordered w-full"
					bind:value={formData.formatoChave}
					placeholder="Digite o formato da chave (ex: &#123;getCustomer:id&#125;)"
					required
				/>
			</div>

			<!-- Campo Chamadas -->
			{#each formData.chamadas as chamada, index}
				<div class="form-control border border-gray-300 rounded-lg p-6 mb-6">
					<h3 class="text-xl font-bold mb-4">Chamada {index + 1}</h3>

					<label class="label" for="ordem-{index}">
						<span class="label-text font-semibold">Ordem</span>
					</label>
					<input
						type="number"
						id="ordem-{index}"
						class="input input-bordered w-full"
						bind:value={chamada.ordem}
						required
					/>

					<label class="label" for="nomeChamada-{index}">
						<span class="label-text font-semibold">Nome da Chamada</span>
					</label>
					<input
						type="text"
						id="nomeChamada-{index}"
						class="input input-bordered w-full"
						bind:value={chamada.nome}
						placeholder="Digite o nome da chamada"
						required
					/>

					<label class="label" for="url-{index}">
						<span class="label-text font-semibold">URL</span>
					</label>
					<input
						type="text"
						id="url-{index}"
						class="input input-bordered w-full"
						bind:value={chamada.url}
						placeholder="Digite a URL"
						required
					/>

					<label class="label" for="descricaoChamada-{index}">
						<span class="label-text font-semibold">Descrição da Chamada</span>
					</label>
					<textarea
						id="descricaoChamada-{index}"
						class="textarea textarea-bordered w-full"
						bind:value={chamada.descricao}
						placeholder="Digite a descrição da chamada"
						required
					></textarea>
				</div>
			{/each}

			<!-- Botão para adicionar uma nova chamada -->
			<div class="flex justify-end">
				<button type="button" class="btn btn-outline btn-secondary" on:click={addChamada}
					>Adicionar Chamada</button
				>
			</div>

			<!-- Botões de Ação -->
			<div class="flex gap-6 mt-8">
				<button type="submit" class="btn btn-primary w-1/2">Salvar</button>
				<button type="button" class="btn btn-secondary w-1/2" on:click={handleCancel}
					>Cancelar</button
				>
			</div>
		</form>
	</div>
</div>
