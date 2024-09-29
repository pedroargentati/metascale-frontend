import toastr from 'toastr';
import type { ICanonico } from '../interfaces/canonico';
import type { ICanonicoItemList } from '../interfaces/canonico-list';

export class CanonicalUtils {
	private constructor() {}

	public static prepareCanonicals(canonicals: ICanonico[]): ICanonicoItemList[] {
		if (!canonicals || !canonicals.length) return [];

		const translatedvalues: Record<string, string> = {
			A: 'Ativo',
			I: 'Inativo',
		};

		return canonicals.map((canonical) => {
			return {
				nomeCanonico: canonical.nome,
				descricaoCanonico: canonical.descricao,
				statusCanonico: canonical.statusCanonico as 'A' | 'I',
				versaoCanonico: canonical.versao,
			};
		});
	}

	public static async generateJson(formData: ICanonico): Promise<void> {
		const jsonData = JSON.stringify(formData, null, 2);
		try {
			if (!jsonData.length) {
				return toastr.error(
					'O formulário está vazio ! Primeiro popule o formulário.',
					'Erro',
				);
			}
			await navigator.clipboard.writeText(jsonData);
			toastr.success('JSON copiado para o clipboard!', 'Sucesso');
		} catch (error) {
			toastr.error('Falha ao copiar JSON para o clipboard.', 'Erro');
			console.error(error);
		}
	}
}
