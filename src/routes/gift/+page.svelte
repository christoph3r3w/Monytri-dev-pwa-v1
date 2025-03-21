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

<h1>
	{$current}
</h1>
<p>
	{explain}
</p>
<br>
<a href="/gift-kaan">gift-kaan</a>
<br>
<a href="/gift-illona">gift-illona</a>
<br>
<a href="/gift-illona2">gift-illona</a>
<br>
<a href="/gift-annelinde">gift-annelinde</a>
<br>
<a href="/" style="font-size: 3rem;">go home</a>


<style>
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