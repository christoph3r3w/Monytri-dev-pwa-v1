<script>
	import { onMount } from 'svelte';
	import { PTest } from '$lib'
	import {current} from '$lib/store.js';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>


<div class="home-wrapper">
	<h1>
		{$current}
	</h1>
	
	<br>
	<div class="button-conatiner">
		<button onclick={goto("/gift")}>send a gift</button>
		<button onclick={goto("/request")} disabled>request a gift</button>
	</div>
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
		min-height: calc(120cqh - var(--header-height));
		max-height: calc(120dvh - var(--footer-height)) ;
		padding-bottom: calc(var(--header-height) + env(safe-area-inset-bottom));

	}

	h1 {
		font-size: 3rem;
		color: rgba(0, 174, 255, 0.514);
		padding-bottom: 2%;
	}

	.button-conatiner{
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 2rem;
		width: 100%;
		height: fit-content;
	}
	
	:is(a,button) {
		font-size: 2rem;
		color: green;
		border: solid 2px ;
		border-radius: 8px;
		padding: 1rem 2rem;
		/* text-decoration: underline; */

		&:is(:hover,:focus-within,:active) {
			background-color: var(--primary-purple-400);
			color: white;
		}
	}

</style>