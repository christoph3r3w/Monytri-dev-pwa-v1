<script>
	import { fade } from 'svelte/transition';
	let { selected, button ,validateAmount,nextStep} = $props();

</script>


<section class="step-container" >
	<div class="left-step"  >
		<section class="step-header"  transition:fade>
			{@render button('back')}
			<h2>Enter Amount</h2>
		</section>
	</div>

	<div class="right-step"  transition:fade>
		<form onsubmit={nextStep}>
			<fieldset class="amount-input-container">
				<label for='fixedAmount1'><input type="radio" id='fixedAmount1' name="fixedAmount" oninput={validateAmount} value="€25">€25</label>
				<label for='fixedAmount2'><input type="radio" id='fixedAmount2' name="fixedAmount" oninput={validateAmount} value="€50">€50</label>
				<label for='fixedAmount3'><input type="radio" id='fixedAmount3' name="fixedAmount" oninput={validateAmount} value="€100">€100</label>
				<label for='fixedAmount4'><input type="radio" id='fixedAmount4' name="fixedAmount" oninput={validateAmount} value="€500">€500</label>
				<label for="amount">Amount to Send</label>
				<input 
				type="number" 
				id="amount" 
				oninput={validateAmount}
				placeholder="€"
				min="0.01" 
				step="0.01" 
				aria-required="true"
				/>
			</fieldset>
			<div class="button-container">
				{@render button('continue',2)}
			</div>
		</form>
	</div>
</section>

<style>
	form:has(.amount-input-container){
		display: flex;
		flex-direction: column;
		flex: 1 1 100%;
	}

	form .amount-input-container:nth-of-type(1){
		flex: 1 1 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1cqh;
	}

	form .amount-input-container{
		align-items: center;
		justify-content: center;
		padding-inline: 10%;
		padding-block: 5%;
		margin-bottom: 20%;
	}

	form .amount-input-container label {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 3rem;
		width: 40%;
		border: solid 1px var(--primary-darkgreen-550);
		border-radius: 10px;
	}
	
	.amount-input-container label {
		height: 3rem;
		width: 40%;
		border: solid 1px var(--primary-darkgreen-550);
		border-radius: 10px;
	}

	.amount-input-container input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
	}

</style>