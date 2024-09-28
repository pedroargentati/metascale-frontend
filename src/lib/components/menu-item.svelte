<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string;
	export let link: string;
	export let label: string;
</script>

<li>
	<a class="flex gap-2 bg-transparent hover:scale-110 transition-all" href={link}>
		<Icon icon={icon} class="size-6 text-primary" />
		<span class="text-primary">{label}</span>
	</a>
</li>
