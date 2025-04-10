<script>
	let selectedMethod = "Linked Credit/Debit Card";
	let methods = ["Linked Credit/Debit Card", "iDEAL", "EFT Payment"];

	export let recipient = "James May";
	export let amount = "€50";
	export let deliveryDate = "23 Aug 2024";
	export let occasion = "Birthday";
</script>

<section class="page">
	<!-- Linkerzijde -->
	<section class="left">
		<section class="header-row">
			<a href="/" class="back-arrow">←</a>
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

	<!-- Rechterzijde -->
	<section class="right">
		<section class="payment-confirmation">
			<h2>Please confirm your payment</h2>
			<hr />
			<p>Recipient: {recipient}</p>
			<p>Gift Amount: {amount}</p>
			<p>Delivery Date: {deliveryDate}</p>
			<p>Occasion: {occasion}</p>
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
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.header-row h2 {
		font-size: 1.75rem;
		margin: 0;
		margin-right: 10rem;
	}

	.back-arrow {
		font-size: 2rem;
		color: #222;
		transition: transform 0.2s ease;
	}

	.back-arrow:hover {
		transform: translateX(-4px);
	}

	.payment-option {
		margin-bottom: 1rem;
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
		margin-left: 2.5rem;
		margin-bottom: 1rem;
	}

	.right {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.payment-confirmation {
		/* background: rgba(255, 255, 255, 0.8); */
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		/* width: fit-content; */
	}

	h2 {
		font-size: 1.75rem;
		margin-bottom: 10px;
	}

	hr {
		margin-bottom: 15px;
		height: 1px;
		background-color: #1e1e1e;
	}

	p {
		font-size: 1.5rem;
		margin: 40px 0;
	}

	.confirm-button-container {
		/* align-self: flex-end; */
		/* margin-top: auto; */
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
</style>
