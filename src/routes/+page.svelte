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
	}

</style>