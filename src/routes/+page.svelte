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
		{$current}
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
			grid-column: 1/-1;
			grid-row: main;
			display: flex;
			flex-direction: column;
			/* grid-template-columns: subgrid; */
			align-content: start;
			width: 100%;
			height: 100%;

	}

	h1 {
		font-size: 3rem;
		color: rgba(0, 174, 255, 0.463);
		padding-bottom: 2%;
	}
	
	a {
		font-size: 2rem;
		color: green;
		text-decoration: underline;
	}

</style>