import { Status } from '../../core/enums/status';
import type { ICanonico } from '../../core/interfaces/canonico';
import { CoreApi } from '../api/core.api';

/**
 * Serviço responsável por realizar operações relacionadas aos objetos Canonico.
 */
export class CanonicoService {
	private static BASE_URL: string = 'http://localhost:8080/canonico';

	/**
	 * Busca todos os Canonicos com o status especificado.
	 *
	 * @param {Status} status - Status do Canonico a ser buscado (por exemplo, ACTIVE ou INACTIVE).
	 * @returns {Promise<ICanonico[]>} Uma promessa que resolve com um array de objetos do tipo ICanonico.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async getCanonicosByStatus(status: Status): Promise<ICanonico[]> {
		const url = `${this.BASE_URL}/?status_canonico=${status}`;
		return await CoreApi.get<ICanonico[]>(url);
	}

	/**
	 * Busca um Canonico específico pelo ID.
	 *
	 * @param {number} id - ID do Canonico a ser buscado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com um objeto do tipo ICanonico.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async getCanonicoById(id: number): Promise<ICanonico> {
		const url = `${this.BASE_URL}/${id}`;
		return await CoreApi.get<ICanonico>(url);
	}

	/**
	 * Cria um novo Canonico.
	 *
	 * @param {ICanonico} canonico - Dados do Canonico a ser criado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com o Canonico criado.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async createCanonico(canonico: ICanonico): Promise<ICanonico> {
		return await CoreApi.post<ICanonico>(this.BASE_URL, canonico);
	}
}
