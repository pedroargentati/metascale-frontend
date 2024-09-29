import toastr from 'toastr';
import type { ICanonico } from '../interfaces/canonico';

export class CanonicalUtils {
	private constructor() {}

	public static prepareCanonicals(canonicals: ICanonico[]): Partial<ICanonico>[] {
		if (!canonicals || !canonicals.length) return [];

		const translatedvalues: Record<string, string> = {
			A: 'Ativo',
			I: 'Inativo',
		};

		return canonicals.map((canonical) => {
			return {
				nomeCanonico: canonical.nome,
				descricaoCanonico: canonical.descricao,
				statusCanonico: translatedvalues[canonical.statusCanonico],
				versaoCanonico: canonical.versao,
			};
		});
	}

	public static async generateJson(formData: ICanonico): Promise<void> {
		const jsonData = JSON.stringify(formData, null, 2);
		try {
			await navigator.clipboard.writeText(jsonData);
			toastr.success('JSON copiado para o clipboard!', 'Sucesso');
		} catch (error) {
			toastr.error('Falha ao copiar JSON para o clipboard.', 'Erro');
			console.error(error);
		}
	}
}
