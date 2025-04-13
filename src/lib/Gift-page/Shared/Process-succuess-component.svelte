<script>
	// revisit this to see if props are really needed
	// let {formData, button} = $props()
	import {onMount} from 'svelte';
	import {fade} from 'svelte/transition';

	let formData = $state({
		currentDate: '',
		date: new Date(),
	});

	onMount(() => {
		formData.currentDate = formData.date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric',hour12: true });
	});

</script>
<section class="step-container">
	<section class="step-header"  transition:fade>
		<div class="button-container">
			<!-- revisit this to see if a back button is really needed -->
			<!-- {@render button('back')} -->
		</div>
		<div class="step-header-text">
			<h2>Gift Purchase Complete!</h2>
			<p>{formData.currentDate}</p>
		</div>
	</section>
	
	<section class="success-message"  transition:fade>
		<img src="./gift-page-assets/Becoming-Rich-10--Streamline-Brooklyn (Traced).png" alt="becoming rich ">
		<p>If you need to view any information about any of your transactions, head over to your transaction history.</p>
		<a href="/">Back to Homepage</a>
		<a href="/gift">Send another one</a>
	</section>
</section>

<style>
	.step-container {
		grid-column: 1/-1 !important;
		grid-row: 1/-1 !important;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100% ;
		gap: 0;
	}
	
	.step-header {
		position: relative;
		flex: 1 1 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		margin-bottom: 0;
		gap: 24px;
		/* outline: solid green ; */
	}
	
	.step-header-text{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
		/* outline: solid red; */
	}
	
	.step-header h2{
		font-size: 2.5rem;
	}
	
	.step-header p{
		flex: 1 1 100%;
		text-align: center;
		/* outline: solid blue; */
	}
	
	.button-container {
		position: absolute;
		top: 0;
		left: 0;
		width: fit-content;
		display: flex;
		flex-direction: unset;
		align-items: start;
		justify-content: space-between;
		padding:0;
	}
	
	.success-message {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 1 80%;	
		width: 100%;
		gap: 24px;
		padding-top: 3rem;
		/* justify-content: space-around; */
		/* outline: solid rgb(23, 50, 226); */
	}
	
	.success-message > * {
		/* outline: solid pink; */
	}
	
	.success-message img {
		width: fit-content;
		object-position: center;
		object-fit: cover;
		height: auto;
	}
	
	.success-message p {
		text-align: center;
		font-size: 1.2rem;
		max-width: 50%;
	}
	
	.success-message a {
		text-decoration: none;
		text-align: center;
		font-size: 1rem;
		width: 20%;	
		padding: 1rem 2rem;
		border-radius: 5px;
		border: solid var(--primary-green-500) 2px;
		
		&:nth-of-type(1) {
			background-color: var(--primary-green-500);
			color: var(--white);
		}
		
		&:nth-of-type(2) {
			color: var(--primary-green-500);
		}
	}


</style>
