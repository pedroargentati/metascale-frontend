<script lang="ts">
	import breno from '$lib/assets/group/breno.png';
	import felipe from '$lib/assets/group/felipe.png';
	import gabriel from '$lib/assets/group/gabriel.png';
	import pedro from '$lib/assets/group/pedro.png';
	import rafael from '$lib/assets/group/rafael.png';

	// Definindo os dados do time
	const teamMembers: { name: string; role: string; image: string }[] = [
		{ name: 'Breno', role: 'Analista de Dados', image: breno },
		{ name: 'Gabriel', role: 'Arquiteto e Desenvolvedor Full-Stack', image: gabriel },
		{ name: 'Felipe', role: 'Analista de Dados', image: felipe },
		{ name: 'Rafael', role: 'Analista de Dados', image: rafael },
		{ name: 'Pedro', role: 'Desenvolvedor Full-Stack', image: pedro },
	];
</script>

<div class="bg-base-100 size-full rounded-box">
	<div
		class="flex flex-col justify-center items-center rounded-2xl w-full bg-secondary-100/30 py-4 pt-8 my-8"
	>
		<h2 class="text-center text-4xl">Nosso time</h2>
		<h3 class="text-center mb-5">Aos <em>SEUS</em> serviços</h3>

		<!-- Container dos membros do time -->
		<div class="team-container flex flex-wrap justify-center gap-8 p-6">
			{#each teamMembers as member}
				<div class="team-member flex flex-col items-center">
					<img
						src={member.image}
						alt={`Foto de ${member.name}`}
						class="member-image rounded-full border border-gray-300"
					/>
					<p class="mt-3 font-bold">{member.name}</p>
					<p class="text-gray-500">{member.role}</p>
				</div>
			{/each}
		</div>

		<!-- Frase de efeito -->
		<p class="text-center mt-8 text-lg italic">
			"Nós somos os desenvolvedores da solução Metascale do grupo Cicada, comprometidos com
			inovação e excelência."
		</p>
	</div>
</div>

<style>
	.team-container {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem; /* Espaçamento entre os membros */
		justify-content: center;
	}

	.team-member {
		width: 12rem; /* Ajuste conforme necessário */
		text-align: center;
	}

	.member-image {
		width: 10rem; /* Ajuste conforme necessário */
		height: 10rem;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.member-image:hover {
		transform: scale(1.05);
	}
</style>
