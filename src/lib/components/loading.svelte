<script lang="ts">
	export let show: boolean = false;

	$: {
		if (show) {
			document.addEventListener('keydown', preventTabNavigation);
		} else {
			document.removeEventListener('keydown', preventTabNavigation);
		}
	}

	function preventTabNavigation(event: KeyboardEvent) {
		if (event.key === 'Tab') event.preventDefault();
	}
</script>

{#if show}
	<div class="items-center justify-center absolute z-50 flex size-full bg-base-100/45">
		<span class="loading loading-spinner loading-lg text-primary"></span>
	</div>
{/if}
