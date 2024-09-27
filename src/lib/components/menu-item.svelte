<script lang="ts">
	import Icon from '@iconify/svelte';
	
	export let icon: string;
	export let link: string;
</script>

<li>
	<a class="btn p-0 bg-transparent" href={link}>
		<Icon
			icon={icon}
			class="size-12 text-base-content hover:text-primary"
		/>
	</a>
</li>