<script>
	import {current} from '$lib/store.js';
</script>
<svelte:head>
	<title>stock overview</title>
</svelte:head>
<h1>
	{$current}
</h1>

<a href="/" style="font-size: 3rem;">go home</a>