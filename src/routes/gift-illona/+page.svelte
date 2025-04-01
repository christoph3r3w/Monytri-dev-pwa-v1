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

<main>
	<section>
		<a href="/" aria-label="Go back">
			<span>&larr;</span> 
		</a>
		<h1>Select your gift amount</h1>
		<form action="/gift/send" method="post">
			<fieldset>
				<legend>Choose a preset amount</legend>
				<button type="button" value="25">&euro; 25</button>
				<button type="button" value="50">&euro; 50</button>
				<button type="button" value="100">&euro; 100</button>
				<button type="button" value="200">&euro; 200</button>
			</fieldset>
			<fieldset>
				<legend>Enter a custom amount</legend>
				<label for="customAmount">&euro;</label>
				<input type="number" id="customAmount" name="amount" min="1" placeholder="Enter amount">
			</fieldset>
			<button type="submit">Continue</button>
		</form>
	</section> 
</main>



<a href="/" style="font-size: 3rem;">go home</a>