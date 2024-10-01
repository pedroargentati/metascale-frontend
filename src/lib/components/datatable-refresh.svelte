<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Icon from '@iconify/svelte';
</script>

<button
	type="button"
	class="btn flex items-center hover:btn-primary"
	on:click={async () => await invalidateAll()}
>
	<Icon icon="ic:sharp-refresh" class="size-5" />
</button>
