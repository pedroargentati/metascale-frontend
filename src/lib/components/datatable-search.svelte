<script lang="ts">
	export let handler;
	let value: string = '';

	$: {
		if (value.trim() === '') {
			handler.search('');
		} else {
			handler.search(value);
		}
	}
</script>

<input class="input bg-base-200" type="search" placeholder="Pesquisar" bind:value={value} />
