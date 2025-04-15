<script>
	let selectedMethod = "Linked Credit/Debit Card";
	let methods = ["Linked Credit/Debit Card", "iDEAL", "EFT Payment"];

	export let recipient = "James May";
	export let amount = "€50";
	export let deliveryDate = "23 Aug 2024";
	export let occasion = "Birthday";
</script>

<section class="page">
	<section class="left">
		<!-- <a href="/" class="back-arrow">←</a> -->
		<section class="header-row">
			<h2>Select a payment method</h2>
		</section>

		{#each methods as method}
			<label class="payment-option">
				<input type="radio" bind:group={selectedMethod} value={method} class="radio" />
				<span class="method-label">{method}</span>
			</label>
			{#if method === "Linked Credit/Debit Card" && selectedMethod === method}
				<p class="card-info">ℹCard ending in **** **** 1234</p>
			{/if}
		{/each}
	</section>

	<section class="right">
		<section class="payment-confirmation">
			<h2>Please confirm your payment</h2>
			<hr />
			<p><span>Recipient:</span><span>{recipient}</span></p>
			<p><span>Gift Amount:</span><span>{amount}</span></p>
			<p><span>Delivery Date:</span><span>{deliveryDate}</span></p>
			<p><span>Occasion:</span><span>{occasion}</span></p>
		</section>

		<section class="confirm-button-container">
			<button class="confirm-button">Confirm & Pay {amount}</button>
		</section>
	</section>
</section>

<style>
	.page {
		display: flex;
		justify-content: space-between;
		height: 100vh;
		padding: 2rem;
		gap: 2rem;
	}

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.header-row {
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
	}

	.header-row h2 {
		font-size: 2.5rem;
		margin-right: 15rem;
	}

	.payment-option {
		margin-bottom: 2.5rem;
		cursor: pointer;
	}

	.radio {
		margin-right: 0.75rem;
		width: 1.5rem;
		height: 1.5rem;
		accent-color: #1e1e1e;
	}

	.method-label {
		font-size: 1.5rem;
	}

	.card-info {
		font-size: 1rem;
		color: #4c7551;
		margin-left: 2.8rem;
		margin-bottom: 1.5rem;
		margin-top: -1.5rem;
	}

	.right {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.payment-confirmation {
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		max-width: 35rem;
		margin-left: 10rem;
	}

	.payment-confirmation h2 {
		font-size: 1.5rem;
		margin-bottom: 10px;
	}

	hr {
		margin-bottom: 15px;
		height: 1px;
		background-color: #1e1e1e;
	}

	.payment-confirmation p {
		font-size: 1.2rem;
		margin: 15px 0;
		margin-top: 30px;
		display: flex;
		gap: 0rem;
	}

	.confirm-button {
		background-color: #4c7551;
		color: white;
		padding: 22px 0px;
		font-size: 1rem;
		border-radius: 10px;
		cursor: pointer;
		width: 60%;
		margin-left: 20rem;
	}

	.confirm-button:hover {
		background-color: #3d5f40;
	}

	/* .back-arrow {
		font-size: 2rem;
	} */
</style>