<script>
	import { onMount } from 'svelte';
	import { PTest } from '$lib'
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>


<div class="home-wrapper">
	<PTest/>
	<br>
	<PTest/>
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


/* .home-wrapper *{
		grid-column: 1/-1;
		grid-row: auto;
		display: grid;
		grid-template-columns: subgrid;
		align-content: start;
		width: 100%;
		height: 100%;
		background-color: blue;
	} */
</style>