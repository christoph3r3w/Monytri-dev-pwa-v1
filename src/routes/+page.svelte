<script>
	import { onMount } from 'svelte';
	import {PTest} from '$lib'
</script>

<svelte:head>
	<title>Monytri</title>	
</svelte:head>


<div>
	<PTest/>
	<br>
	<PTest/>
	<br>
	<PTest/>
</div>

<style>
	div {
		grid-column: 1/-1;
		
	}

</style>