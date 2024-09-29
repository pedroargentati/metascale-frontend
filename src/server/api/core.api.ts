export class CoreApi {
	private constructor() {}

	/**
	 * Método genérico para realizar uma requisição GET.
	 *
	 * @param {string} url - URL da API que será chamada.
	 * @param {Record<string, string>} [headers] - Cabeçalhos adicionais para a requisição.
	 * @returns {Promise<T>} Uma promessa que resolve com a resposta no formato genérico especificado.
	 * @throws {Error} Se a requisição falhar ou se a resposta não for bem-sucedida.
	 */
	public static async get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
		try {
			const response: Response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
			});

			if (!response.ok) {
				throw new Error(
					`Erro na resposta da API: ${response.status} - ${response.statusText}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error(`Erro ao fazer GET para a URL ${url}:`, error);
			throw new Error('Erro ao realizar a requisição GET.');
		}
	}

	/**
	 * Método genérico para realizar uma requisição POST.
	 *
	 * @param {string} url - URL da API que será chamada.
	 * @param {unknown} body - O corpo da requisição que será enviado.
	 * @param {Record<string, string>} [headers] - Cabeçalhos adicionais para a requisição.
	 * @returns {Promise<T>} Uma promessa que resolve com a resposta no formato genérico especificado.
	 * @throws {Error} Se a requisição falhar ou se a resposta não for bem-sucedida.
	 */
	public static async post<T>(
		url: string,
		body: unknown,
		headers: Record<string, string> = {},
	): Promise<T> {
		try {
			const response: Response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(
					`Erro na resposta da API: ${response.status} - ${response.statusText}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error(`Erro ao fazer POST para a URL ${url}:`, error);
			throw new Error('Erro ao realizar a requisição POST.');
		}
	}

	/**
	 * Método genérico para realizar uma requisição PUT.
	 *
	 * @param {string} url - URL da API que será chamada.
	 * @param {unknown} body - O corpo da requisição que será enviado.
	 * @param {Record<string, string>} [headers] - Cabeçalhos adicionais para a requisição.
	 * @returns {Promise<T>} Uma promessa que resolve com a resposta no formato genérico especificado.
	 * @throws {Error} Se a requisição falhar ou se a resposta não for bem-sucedida.
	 */
	public static async put<T>(
		url: string,
		body: unknown,
		headers: Record<string, string> = {},
	): Promise<T> {
		try {
			const response: Response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(
					`Erro na resposta da API: ${response.status} - ${response.statusText}`,
				);
			}

			return await response.json();
		} catch (error) {
			console.error(`Erro ao fazer PUT para a URL ${url}:`, error);
			throw new Error('Erro ao realizar a requisição PUT.');
		}
	}
}
