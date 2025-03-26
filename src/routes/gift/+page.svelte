<script>
	import {current} from '$lib/store.js';

let explain = `
	1. make function in +page.js that takes in all the section from the backend.
	2. it should be a series of form that cronologicly swap when the previos one is valid
	3. when the user makes a selection and it is valid they can continue to the next form until there is none 
	4. lasty comes the payment
	5. the user can also go back to the previous form
	6. if the payment and forms are valid they can "confirm" submit and recieve a completion screen 
`
</script>
<svelte:head>
	<title>{$current}</title>	
</svelte:head>


<a href="/" style="font-size: 3rem;">go home</a>


<style>
	
</style>