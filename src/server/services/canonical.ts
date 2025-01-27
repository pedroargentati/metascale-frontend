import { Status } from '../../core/enums/status';
import type { ICanonico } from '../../core/interfaces/canonico';
import { CoreApi } from '../api/core.api';

/**
 * Serviço responsável por realizar operações relacionadas aos objetos Canonico.
 */
export class CanonicoService {
	private static BASE_URL: string = 'http://localhost:8080/canonico';

	/**
	 * Busca todos os Canonicos.
	 *
	 * @returns {Promise<ICanonico[]>} Uma promessa que resolve com um array de objetos do tipo ICanonico.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async getAllCanonicos(): Promise<ICanonico[]> {
		return await CoreApi.get<ICanonico[]>(this.BASE_URL);
	}

	/**
	 * Busca todos os Canonicos com o status especificado.
	 *
	 * @param {Status} status - Status do Canonico a ser buscado (por exemplo, ACTIVE ou INACTIVE).
	 * @returns {Promise<ICanonico[]>} Uma promessa que resolve com um array de objetos do tipo ICanonico.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async getCanonicosByStatus(status: Status): Promise<ICanonico[]> {
		const url: string = `${this.BASE_URL}/?status_canonico=${status}`;
		return await CoreApi.get<ICanonico[]>(url);
	}

	/**
	 * Busca um Canonico específico pelo ID.
	 *
	 * @param {string} id - ID do Canonico a ser buscado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com um objeto do tipo ICanonico.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async getCanonicoById(id: string): Promise<ICanonico> {
		const url: string = `${this.BASE_URL}/${id}`;
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

	/**
	 * Atualiza um Canonico existente.
	 *
	 * @param {ICanonico} canonico - Dados do Canonico a ser atualizado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com o Canonico atualizado.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async updateCanonico(canonico: ICanonico): Promise<ICanonico> {
		const url: string = `${this.BASE_URL}/${canonico.nome}`;
		return await CoreApi.put<ICanonico>(url, canonico);
	}

	/**
	 * Atualiza parcialmente um Canonico existente.
	 *
	 * @param {ICanonico} canonico - Dados do Canonico a ser atualizado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com o Canonico atualizado.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async setCanonicoStatus(canonico: ICanonico, status: Status): Promise<ICanonico> {
		const url: string = `${this.BASE_URL}/${canonico.nome}`;
		return await CoreApi.patch<ICanonico>(url, { statusCanonico: status });
	}

	/**
	 * Ativa um Canonico.
	 *
	 * @param {ICanonico} canonico - Canonico a ser ativado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com o Canonico ativado.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async activateCanonico(canonico: ICanonico): Promise<ICanonico> {
		return await this.setCanonicoStatus(canonico, Status.ACTIVE);
	}

	/**
	 * Inativa um Canonico.
	 *
	 * @param {ICanonico} canonico - Canonico a ser inativado.
	 * @returns {Promise<ICanonico>} Uma promessa que resolve com o Canonico inativado.
	 * @throws {Error} Se houver um erro ao realizar a requisição ou se a resposta não for bem-sucedida.
	 */
	public static async inactivateCanonico(canonico: ICanonico): Promise<ICanonico> {
		return await this.setCanonicoStatus(canonico, Status.INACTIVE);
	}
}
