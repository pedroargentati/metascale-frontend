<script lang="ts">
	import { DataTable } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DataTable data={data.list} columns={data.columns} />
