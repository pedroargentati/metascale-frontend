import { Status } from '../../core/enums/status.js';
import type { ICanonico } from '../../core/interfaces/canonico.js';
import { CanonicalUtils } from '../../core/utils/canonical-utils.js';
import { CanonicoService } from '../../server/services/canonical.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }): Promise<any> {
	const allCanonicos: ICanonico[] = await CanonicoService.getCanonicosByStatus(Status.ACTIVE);

	return {
		list: CanonicalUtils.prepareCanonicals(allCanonicos),
		columns: [
			{
				label: 'Canônico',
				key: 'nomeCanonico',
			},
			{
				label: 'Descrição',
				key: 'descricaoCanonico',
			},
			{
				label: 'Status',
				key: 'statusCanonico',
			},
			{
				label: 'Versão',
				key: 'versaoCanonico',
			},
		],
	};
}
