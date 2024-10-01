<script lang="ts">
	import '$app.postcss';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Loading, MenuItem } from '$lib/components';

	let loading: boolean = false;

	beforeNavigate((nav) => (loading = true));
	afterNavigate((nav) => (loading = false));
</script>

<Loading show={loading} />

<div class="overflow-hidden flex h-svh w-full flex-col">
	<header class="navbar bg-base-200 flex justify-between px-16 py-4">
		<div class="flex items-center gap-4">
			<img src="vivo-logo.png" alt="logo" class="h-10" />
			<h1 class="font-semibold text-lg max-sm:hidden">| Cicada</h1>
		</div>
		<ul class="flex gap-8 rounded-none">
			<MenuItem icon="fluent:database-48-regular" label="Cadastros" link="/" />
			<MenuItem icon="fluent:person-48-regular" label="Equipe" link="group" />
		</ul>
	</header>

	<main
		class="flex size-full flex-auto overflow-auto bg-gradient-to-tr from-primary via-secondary to-accent p-4"
	>
		<slot />
	</main>

	<footer class="bg-base-200 text-center py-4 mt-auto">
		<p class="text-sm">
			<span class="font-bold">© Cicada | Metascale</span> - Todos os direitos reservados - 1.0.0
		</p>
	</footer>
</div>
