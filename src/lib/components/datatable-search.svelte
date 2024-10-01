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

<input
	class="input bg-white border border-base-300 text-base-content w-full grow"
	type="search"
	placeholder="Pesquisar"
	bind:value={value}
/>
