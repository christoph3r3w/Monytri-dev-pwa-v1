<script>
	import { fade } from 'svelte/transition';
	let { formData, validatePayment, button } = $props();
</script>

<section class="step-container" transition:fade>
	<section class="step-header">
		{@render button('back')}
		<h2>Select a payment method</h2>
	</section>
	<section class="payment-input-container">
		{#if formData.recipient.linkedCard !== null }
		<label for='paymentMethod1'>
			<input type="radio" id='paymentMethod1' name="paymentMethod" value="paymentMethod1"
			onclick={() =>{
			formData.PaymentMethod = formData.recipient.linkedCard;
			validatePayment
			}} >
			Linked Credit/Debit Card
		</label>
		{/if}
		<label for='paymentMethod2'>
			<input type="radio" id='paymentMethod2' name="paymentMethod" value="paymentMethod2"
			onclick={() =>{
			formData.PaymentMethod = 'iDEAL';
			validatePayment
			}} >
			iDEAL 
		</label>
		<label for='paymentMethod3'>
			<input type="radio" id='paymentMethod3' name="paymentMethod" value="paymentMethod3" 
			onclick={() =>{
			formData.PaymentMethod = 'EFT';
			validatePayment
			}} >
			EFT Payment
		</label>
	</section>

	<article class="review-summary">
		<h3>Please confirm your payment</h3>
		
		<p class="review-item">
			<span class="review-label">Recipient:</span>
			<span class="review-value">{formData.recipient.name}</span>
		</p>
			
		<p class="review-item">
			<span class="review-label">Gift Amount:</span>
			<span class="review-value">{formData.amount}</span>
		</p>
			
		<p class="review-item">
			<span class="review-label">Card Design:</span>
			<span class="review-value">{formData.cardDesign}</span>
		</p>
			
		{#if formData.message}
		<p class="review-item">
			<span class="review-label">Message:</span>
			<span class="review-value">{formData.message}</span>
		</p>
		{/if}

		{#if formData.Purpose}
			<p class="review-item">
				<span class="review-label">Occasion:</span>
				<span class="review-value">{formData.Purpose}</span>
			</p>
		{/if}

	</article>
		
	<div class="button-container">
		{@render button('submit')}
	</div>
</section>

<style>
	.payment-input-container{
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 3%;
		margin-bottom: 10%;
	}

	.payment-input-container label {
		display: flex;
		align-items: start;
		gap: 1rem;
	}
	
	.review-summary {
		place-self: center;
		display: flex;
		flex-direction: column;
		background-color: var(--white);
		border-radius: 4px;
		padding: 1rem;
		margin-bottom: 1rem;
		width: 34cqw;
		
		@container style(--mobile:1) {
			place-self: center;
		}

		h3{
			text-align: center ;
			border-bottom: solid 3px;
			font-size: clamp(1rem,3vw,2rem);
			margin-bottom: .5rem;
		}
		
		.review-item {
			display: flex;
			gap:1rem;
			margin-bottom: 0.5rem;
			width: 100%;
			justify-content: space-between;
			padding-right: 3%;
		}

		span{
			position: relative;
		}
		
		.review-label {
			font-weight: 500;
			flex: 0 1 50%;
			text-wrap: nowrap;
		}

		.review-value{
			flex: 1 0 auto;
		}

		@container style(--mobile:1) {
			width: 100%;
		}

	}

</style>