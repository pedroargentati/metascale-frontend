<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import toastr from 'toastr';
	import { CanonicalUtils } from '../../../core/utils/canonical-utils';
	import type { ICanonico } from './../../../core/interfaces/canonico';

	const formData: ICanonico = {
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
			validateFormatoChave(formData.formatoChave);
			console.log('Formulário de inclusão enviado:', formData);
			toastr.success('Registro incluído com sucesso!', 'Sucesso');
			goto('/');
		} catch (error) {
			toastr.error(`Erro ao enviar formulário: ${(error as Error).message}`, 'Erro');
			console.error(error);
		}
	}

	function handleCancel() {
		goto('/');
	}

	function validateFormatoChave(formatoChave: string) {
		const regex = /^\{[a-zA-Z]+:[a-zA-Z]+\}(?:\{[a-zA-Z]+:[a-zA-Z]+\})*$/;
		if (!regex.test(formatoChave)) {
			throw new Error('O campo "Formato da Chave" deve ter a estrutura correta.');
		}
	}

	function addChamada() {
		formData.chamadas = [
			...formData.chamadas,
			{
				ordem: formData.chamadas.length + 1,
				nome: '',
				parametros: [{ tipoDado: 'number', nome: '', tipo: 'path' }],
				url: '',
				descricao: '',
			},
		];
		toastr.success('Nova chamada adicionada.', 'Sucesso');
	}

	function removeChamada(chamadaIndex: number) {
		formData.chamadas = formData.chamadas.filter((_, index) => index !== chamadaIndex);
		toastr.info('Chamada removida.', 'Info');
	}

	function addParametro(chamadaIndex: number) {
		const chamada = formData.chamadas[chamadaIndex];
		chamada.parametros = [
			...chamada.parametros,
			{ tipoDado: 'string', nome: '', tipo: 'query' },
		];

		// Atualizar o formData com as mudanças da chamada específica
		formData.chamadas = [
			...formData.chamadas.slice(0, chamadaIndex),
			chamada,
			...formData.chamadas.slice(chamadaIndex + 1),
		];
		toastr.success('Novo parâmetro adicionado.', 'Sucesso');
	}

	function removeParametro(chamadaIndex: number, parametroIndex: number) {
		console.log('removendo parametro', chamadaIndex, parametroIndex);
		const chamada = formData.chamadas[chamadaIndex];
		chamada.parametros = chamada.parametros.filter((_, index) => index !== parametroIndex);

		// Atualizar o formData com as mudanças da chamada específica
		formData.chamadas = [
			...formData.chamadas.slice(0, chamadaIndex),
			chamada,
			...formData.chamadas.slice(chamadaIndex + 1),
		];
		toastr.info('Parâmetro removido.', 'Info');
	}

	function goBack(): void {
		goto('/');
	}

	async function generateJson() {
		await CanonicalUtils.generateJson(formData);
	}
</script>

<div class="min-h-screen w-full flex items-start justify-center p-8 overflow-auto">
	<div class="w-full max-w-5xl bg-white shadow-xl rounded-lg p-10 mt-8">
		<!-- Formulário de inclusão -->
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
			<h2 class="text-3xl font-bold mb-8 text-center text-black">Incluir Novo Canônico</h2>

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
			{#each formData.chamadas as chamada, chamadaIndex}
				<div class="form-control border border-gray-300 rounded-lg p-6 mb-6 relative">
					<!-- Ícone de exclusão da chamada -->
					<button on:click={() => removeChamada(chamadaIndex)}>
						<Icon
							icon="mdi:close"
							class="cursor-pointer text-red-600 absolute top-2 right-2"
						/>
					</button>

					<h3 class="text-xl font-bold mb-4 text-black">
						Chamada {chamadaIndex + 1}
					</h3>

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
							class="form-control border border-gray-200 rounded-lg p-4 mb-4 relative"
						>
							<!-- Ícone de exclusão do parâmetro -->
							<button on:click={() => removeParametro(chamadaIndex, parametroIndex)}>
								<Icon
									icon="mdi:close"
									class="cursor-pointer text-red-600 absolute top-2 right-2"
								/>
							</button>

							<h4 class="text-lg font-bold mb-2 text-black">
								Parâmetro {parametroIndex + 1}
							</h4>

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
