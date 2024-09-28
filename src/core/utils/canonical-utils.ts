import type { ICanonico } from '../interfaces/canonico';

export class CanonicalUtils {
	private constructor() {}

	public static prepareCanonicals(canonicals: ICanonico[]): Partial<ICanonico>[] {
		if (!canonicals || !canonicals.length) return [];

		return canonicals.map((canonical) => {
			return {
				nomeCanonico: canonical.nome,
				descricaoCanonico: canonical.descricao,
				statusCanonico: canonical.statusCanonico,
				versaoCanonico: canonical.versao,
			};
		});
	}
}
