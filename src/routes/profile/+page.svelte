<script>
	import {current} from '$lib/store.js';
</script>
<svelte:head>
	<title>profile</title>
</svelte:head>
<h1>
	{$current}
</h1>

<img src="generic.png" alt="generic." width="200">

<a href="/" style="font-size: 3rem;">go home</a>