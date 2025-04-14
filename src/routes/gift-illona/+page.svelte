<script>
	import { current } from '$lib/store.js';

	let explain = `
		1. make function in +page.js that takes in all the section from the backend.
		2. it should be a series of form that cronologicly swap when the previos one is valid
		3. when the user makes a selection and it is valid they can continue to the next form until there is none 
		4. lasty comes the payment
		5. the user can also go back to the previous form
		6. if the payment and forms are valid they can "confirm" submit and recieve a completion screen 
	`;
</script>

<svelte:head>
	<title>{$current}</title>	
</svelte:head>

<main class="transfer-wizard">
	<section class="left-step">
		<a href="/" aria-label="Go back">
			<span>&larr;</span> 
		</a>
		<h1>Select your gift amount</h1>
	</section>

	<section class="right-step">
		<form action="/gift/send" method="post">
			<fieldset>
				<div class="button-container">
					<button type="button" value="25">&euro; 25</button>
					<button type="button" value="50">&euro; 50</button>
					<button type="button" value="100">&euro; 100</button>
					<button type="button" value="200">&euro; 200</button>
				</div>
			</fieldset>
      <fieldset class="custom-amount-fieldset">				
        <legend> Or enter a custom amount</legend>
				<input type="number" id="customAmount" name="amount" min="1" placeholder="&euro;">
			</fieldset>
			<button type="submit" class="continue-btn">Continue</button>
		</form>
	</section>
</main>

<style> 

.transfer-wizard {
  margin: 2rem;
  position: relative;
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: grid;
  grid-template-columns: 
    subgrid 
    [left-start] repeat(6,[mid-left]) [left-end right-start] repeat(6,[mid-right]) [right-end];
  width: 100%;

  container-type: normal;
  container-name: transfer-wizard;

  @container style(--mobile: 1) {
    max-height: calc(100dvh - var(--footer-height)) !important;
    grid-template-rows: auto;
  }
}

.left-step {
  position: relative;
  grid-column: left;
  display: flex;
  gap: 3rem;
  height: 100%;
  width: 100%;

  @container style(--mobile: 1) {
    height: fit-content;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 12px;
    max-width: 15ch;
  }
}

.right-step {
  position: relative;
  grid-column: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  height: 100%;
  width: 100%;

  @container style(--mobile: 1) {
    max-height: fit-content;
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

fieldset {
  margin-top: 1.2rem;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 45rem;
  gap: 1.2rem;
}

.button-container button {
  height: 7rem;
  width: 16rem;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  border-radius: 8px;
  background-color: var(--primary-darkgreen-200);
  color: var(--primary-darkgreen-550);
  font-weight: 600;
  cursor: pointer; 
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.button-container button:hover,
.button-container button:focus {
  background-color: var(--primary-darkgreen-550);
  color: white;
  outline: none;
}
.custom-amount-fieldset {
  margin-top: 2rem;
}

.custom-amount-fieldset input[type="number"] {
  font-size: 1.6rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  height: 3rem;
  width: 100%;
  max-width: 400px;
}

.continue-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #717171;
  color: white;
  border: none;
  border-radius: 8px;
  width: fit-content;
  padding: 1rem 3rem;
  font-size: 2rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.continue-btn:hover {
  background-color: #5c5c5c;
}

a {
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

</style>