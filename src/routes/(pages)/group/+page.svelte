<script lang="ts">
	import breno from '$lib/assets/group/breno.png';
	import gabriel from '$lib/assets/group/gabriel.png';
	import pedro from '$lib/assets/group/pedro.png';
	import rafael from '$lib/assets/group/rafael.png';
	import { onDestroy } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const carouselPhotos: string[] = [breno, gabriel, rafael, pedro];

	let i = 0;
	function next() {
		i = (i + 1) % carouselPhotos.length;
	}

	const timer = setInterval(next, 3000);
	onDestroy(() => {
		clearInterval(timer);
	});

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 500),
		easing: quintOut,
	});

	$: src = carouselPhotos[i];
</script>

<div class="bg-base-100 size-full rounded-box">
	<div
		class="flex flex-col justify-center items-center rounded-2xl w-full bg-secondary-100/30 py-4 pt-8 my-8"
	>
		<h2 class="text-center text-4xl">Nosso time</h2>
		<h3 class="text-center mb-5">Aos <em>SEUS</em> serviços</h3>

		<div class="carousel-container rounded-3xl bg-white m-6 p-3 text-center">
			{#key src}
				<img
					in:receive={{ key: src }}
					out:send={{ key: src }}
					src={src}
					alt="Carrossel com os integrantes do grupo"
					class="carousel-image"
				/>
			{/key}
		</div>
	</div>
</div>

<style>
	.carousel-container {
		position: relative;
		width: 24rem; /* Ajuste de acordo com o tamanho da imagem */
		height: 24rem;
		overflow: hidden;
	}

	.carousel-image {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 1s ease-in-out;
	}
</style>
