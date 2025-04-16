<script>
	import { onMount } from 'svelte';
	import { PTest } from '$lib'
	import {current} from '$lib/store.js';
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>


<div class="home-wrapper">
	<h1>
		welcome {$current}
	</h1>
	
	<br>
	<a href="/gift-kaan">gift-kaan</a>
	<br>
	<a href="/gift-illona">gift-illona</a>
	<br>
	<a href="/gift-illona2">gift-illona</a>
	<br>
	<a href="/gift-annelinde">gift-annelinde</a>
	<br>
	<PTest/>
</div>

<style>
	.home-wrapper{
			grid-column: 1 / -1;
			grid-row: 1 / span 1;
			display: flex;
			flex-direction: column;
			/* grid-template-columns: subgrid; */
			align-content: start;
			width: 100%;
			/* height: 100%; */
			min-height: calc(100cqh - var(--header-height));
			max-height: calc(100dvh - var(--footer-height)) ;



	}

	h1 {
		font-size: 3rem;
		color: rgba(0, 174, 255, 0.514);
		padding-bottom: 2%;
	}
	
	a {
		font-size: 2rem;
		color: green;
		text-decoration: underline;
	}

</style>