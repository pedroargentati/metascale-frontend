<script>
	import '$app.postcss';
	import { DataTable, Header, MenuItem } from '$lib/components';

	const data = [
		{ id: 1, first_name: 'Tobie', last_name: 'Vint', email: 'tvint0@fotki.com' },
		{
			id: 2,
			first_name: 'Zacharias',
			last_name: 'Cerman',
			email: 'zcerman1@sciencedirect.com',
		},
		{ id: 3, first_name: 'Gérianna', last_name: 'Bunn', email: 'gbunn2@foxnews.com' },
		{ id: 4, first_name: 'Bee', last_name: 'Saurin', email: 'bsaurin3@live.com' },
		{
			id: 5,
			first_name: 'Méyère',
			last_name: 'Granulette',
			email: 'mgranul4@yellowbook.com',
		},
		{
			id: 6,
			first_name: 'Frederich',
			last_name: 'Benley',
			email: 'fbenley5@ameblo.jp',
		},
		{
			id: 7,
			first_name: 'Becki',
			last_name: 'Criag',
			email: 'bcriag6@washingtonpost.com',
		},
		{
			id: 8,
			first_name: 'Nichols',
			last_name: 'Risom',
			email: 'nrisom7@google.com.br',
		},
		{
			id: 9,
			first_name: 'Ron',
			last_name: 'Menendes',
			email: 'rmenendes8@prnewswire.com',
		},
		{ id: 10, first_name: 'Thane', last_name: 'Gammill', email: 'tgammill9@com.com' },
		{
			id: 11,
			first_name: 'Ramonda',
			last_name: 'Yakobowitch',
			email: 'ryakobowitcha@hibu.com',
		},
	];

	const columns = [
		{
			label: 'First Name',
			key: 'first_name',
		},
		{
			label: 'Last Name',
			key: 'last_name',
		},
		{
			label: 'Email',
			key: 'email',
		},
	];
</script>

<div class=" flex flex-col h-svh w-full over-hidden">
	<Header title="Cicada" />

	<main class="flex size-full flex-auto overflow-hidden bg-base-100">
		<aside class="w-20 h-full bg-base-300">
			<ul class="menu rounded-none sie-full flex flex-col p-4 gap-4 items-center">
				<MenuItem icon="fluent:database-48-filled" link="canonical" />
				<MenuItem icon="fluent:people-48-filled" link="people" />
			</ul>
		</aside>
		<slot />
		<DataTable data={data} columns={columns} />
	</main>
</div>
