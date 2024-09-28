<script>
	import '$app.postcss';
	import { MenuItem } from '$lib/components';
</script>

<div class="overflow-hidden flex h-svh w-full flex-col">
	<header class="navbar bg-base-200 flex justify-between px-16 py-4">
		<div>
			<img src="vivo-logo.png" alt="logo" class="h-10" />
			<h1 class="font-semibold text-lg">| Cicada</h1>
		</div>
		<ul class="flex gap-8 rounded-none">
			<MenuItem icon="fluent:database-48-regular" label="Cadastros" link="canonical" />
			<MenuItem icon="fluent:person-48-regular" label="Pessoas" link="people" />
		</ul>
	</header>

	<main
		class="flex size-full flex-auto overflow-hidden bg-gradient-to-tr from-primary via-secondary to-accent p-4"
	>
		<slot />
	</main>
</div>
