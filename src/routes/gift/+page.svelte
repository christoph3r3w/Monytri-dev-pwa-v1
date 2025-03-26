<script>
	import {current} from '$lib/store.js';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
  
	// State management
	let currentStep = $state(1);
	let totalSteps = $state(5);
	
	// Form data structure
	let formData = $state({
		recipient: null,
		amount: null,
		cardDesign: 'default',
		Purpose: null,
		DeliveryDate: null,
		PaymentMethod: null,
		type: null,
		message: ''
	});
	
	// Step validation state
	let stepValidation = $state({
		1: false,
		2: false,
		3: false,
		4: false,
		5: true // Review step is always valid
	});
	
	// Use provided recipients or fallback to defaults
	let recipients = $state([
		{
		id: 1,
		name: 'James May',
		email: 'jamesmay123@gmail.com',
		lastSent: '12 Aug 2024',
		profilePic: '/path/to/profile1.jpg',
		linkedCard: 'ambro-bro1',
		},
		{
		id: 2,
		name: 'Richard Hammond',
		email: 'richardhammond@gmail.com',
		lastSent: '10 Aug 2024',
		profilePic: '/path/to/profile2.jpg',
		linkedCard: 'card-1234',
		},
		{
		id: 3,
		name: 'Jeremy Clarkson',
		email: 'jeremyclarkson@gmail.com',
		lastSent: '15 Aug 2024',
		profilePic: '/path/to/profile3.jpg',
		linkedCard: null,
		}
	]);
	
	// Progress tracking
	let currentProgress = $state(0);
	let progressPercentage = $derived(currentProgress > 0 ? currentProgress : ((currentStep / totalSteps) - (1 / totalSteps)) * 100);
	
	function selectRecipient(recipient) {
		formData.recipient = recipient;
		stepValidation[1] = true;
	}
	
	function nextStep() {
		if (stepValidation[currentStep] && currentStep < totalSteps) {
		currentStep++;
		}
	}
	
	function previousStep() {
		if (currentStep > 1) {
		currentStep--;
		}
	}
	
	// it also needs to check if both e target type has been selected and tell the user to select one
	function validateAmount(e) {
		let finalAmount;

		if (e.target.type === 'radio') {
			// Check if the custom amount input is empty
			const customAmountInput = document.getElementById('amount');
			if (customAmountInput && customAmountInput.value.trim() !== '') {
				// Prevent selecting the radio button if custom amount is not empty
				e.target.checked = false;
				return;
			}

			// Handle fixed amounts from radio buttons
			formData.type = e.target.id;
			finalAmount = parseFloat(e.target.value.replace('€', ''));
		} else {
			// Handle custom amount input
			formData.type = 'amount';
			finalAmount = parseFloat(e.target.value);

			// Clear radio button selection if custom amount is entered
			const radioButtons = document.querySelectorAll('input[name="fixedAmount"]');
			radioButtons.forEach((radio) => (radio.checked = false));
		}

		// Update form data and validation
		formData.amount = finalAmount;
		stepValidation[2] = finalAmount > 0 && !isNaN(finalAmount);
	}
	
	function validatePurpose() {
		stepValidation[3] = formData.Purpose !== null;
	}

	function validateCardDesign() {
		stepValidation[4] = formData.cardDesign !== null;
	}

	function validatePayment(e) {
		stepValidation[5] = e.target.value && formData.PaymentMethod !== null;
	}
	
	function submitForm() {
		
		// Submit form data to the backend
		// check the value of the payment method
		//  if its a linked card then the value should be the card id
		//  if its iDEAL then the value should trigger the iDEAL payment in the backend
		//  if its EFT then the value should trigger the EFT payment in the backend
	
		// Show a success alert and redirect to the transactions page
		// if validation is scuccessful then submit the form
		// else show an error message

		const alertContent = `
			<div style="
				background-color: #f5f5f5;
				padding: 20px;
				border-radius: 8px;
				border: 2px solid #4B7A5B;
				font-family: sans-serif;
			">
				<h3 style="color: #4B7A5B; margin: 0 0 15px 0;">Transfer Completed</h3>
				<div style="display: grid; gap: 10px;">
					<div><span style="color: #666;">Recipient:</span> ${formData.recipient.name}</div>
					<div><span style="color: #666;">Amount:</span> €${formData.amount}</div>
					<div><span style="color: #666;">Purpose:</span> ${formData.Purpose}</div>
					<div><span style="color: #666;">Card Design:</span> ${formData.cardDesign}</div>
					<div><span style="color: #666;">Message:</span> ${formData.message || 'None'}</div>
					<div><span style="color: #666;">payment:</span> ${formData.PaymentMethod}</div>
				</div>
			</div>
		`;

		const alertDialog = document.createElement('div');
		alertDialog.innerHTML = alertContent;
		alertDialog.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1000;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		`;

		if (formData.PaymentMethod !== null 
			&& formData.PaymentMethod !== undefined 
			&& formData.PaymentMethod !== '' 
			&& formData.PaymentMethod !== ' ' 
			&& formData.recipient !== null 
			&& formData.recipient !== undefined 
			&& formData.recipient !== '') {
			currentProgress = 100;
			document.body.appendChild(alertDialog);
			setTimeout(() => {
				alertDialog.remove();
				goto('/transactions');
			}, 5000);	
			
		} else if (formData.recipient.linkedCard === null 
			|| formData.recipient.linkedCard === undefined 
			|| formData.recipient.linkedCard === '') {
			alert('No Debit/Credit card linked to this account');
			console.error('Please select a payment method');
			return;
		} else {
			alert('Please select a payment method')
			console.error('Please select a payment method');
			return;
		}
	}

	$effect(() => {
		// Reset form data when the component is destroyed
		return () => {
			formData.recipient = null;
			formData.amount = null;
			formData.cardDesign = 'default';
			formData.Purpose = null;
			formData.DeliveryDate = null;
			formData.type = null;
			formData.message = '';
		};
	});



</script>

<svelte:head>
	<title>{$current}</title>	
</svelte:head>

<!-- button types  -->
{#snippet button(type,step)}
	{#if type === 'back'}
		{#if currentStep > 1}
			<button class="back-button" onclick={previousStep}>←</button>
		{:else}
			<button class="back-button" onclick={() => history.back()}>←</button>
		{/if}
	{:else if type === 'continue'}
		<button 
			class="continue-button {stepValidation[step] ? 'active' : 'disabled'}"
			disabled={!stepValidation[step]}
			onclick={nextStep}
			>
			Continue
		</button>
	{:else if type === 'skip'}
		<button
			class="skip-button"
			onclick={() => {
				// formData.Purpose = '';
				stepValidation[step] = true,
				currentStep++;
				}}>
			Skip
		</button>
	{:else if type === 'submit'}
		<button 
			class="submit-button"
			onclick={submitForm}
			>
			Confirm & pay €{formData.amount}
		</button>
	{/if}
{/snippet}

<article class="transfer-wizard" transition:fade>
	<!-- Progress indicator -->
	<div class="progress-bar">
		<div class="progress" style="width: {progressPercentage}%"></div>
	</div>
	
	<!-- Step 1: Choose Recipient -->
	{#if currentStep === 1}
		<section class="step-container" transition:fade>
			<div class="left-step">
				<section class="step-header">
					{@render button('back')}
					<h2>Choose Recipient</h2>
				</section>
				
				<p>Please select your recipient to send to.</p>
				
				<section class="search-container">
					<input 
					type="search" 
					placeholder="Search Recipients" 
					aria-label="Search Recipients"
					class="search-input"
					/>
				</section>
			</div>
			
			<div class="right-step">
				<h3 class="section-title">Most Recent</h3>
				<ul class="recipients-list">
					{#each recipients as recipient}
						<li 
							class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}"
							onclick={() => selectRecipient(recipient)}
							>
							<article class="recipient-info">
								<img src={recipient.profilePic} alt={''||recipient.name} class="profile-pic" />
								<div class="recipient-details">
									<h3>{recipient.name}</h3>
									<p>{recipient.email}</p>
									<p class="last-sent">Last sent: {recipient.lastSent}</p>
								</div>
							</article>
							<button class="more-options">...</button>
						</li>
					{/each}
				</ul>
				
				{@render button('continue',1)}
			</div>
		</section>

	<!-- Step 2: Enter Amount -->
	{:else if currentStep === 2}
		<section class="step-container" transition:fade>
			<div class="left-step">
				<section class="step-header">
					<button class="back-button" onclick={previousStep}>←</button>
					<h2>Enter Amount</h2>
				</section>
			</div>

			<div class="right-step">
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
					
					{@render button('continue',2)}
				</form>
			</div>
		</section>

	<!-- choose proposal -->
	{:else if currentStep === 3}
		<section class="step-container" transition:fade>			
			<div class="left-step">
				<section class="step-header">
					{@render button('back')}
					<h2>Choose a purpose</h2>
				</section>
				
				<p>Personalise your gift card by selecting an occasion</p>
				
				<section class="search-container">
					<input 
					type="search" 
					placeholder="Search purpose" 
					aria-label="Search Purpose"
					class="search-input"
					/>
				</section>
			</div>

			<div class="right-step">
				<article class="purpose-selction">
					<ul class="purpose-options">
						<li class="purpose-option">
							<input 
								type="radio" 
								id="purpose1" 
								name="purpose" 
								value="Birthday"
								onclick={() => {
									formData.Purpose = 'Birthday';
									validatePurpose();
								}}
							/>
							<label for="purpose1">Birthday</label>
						</li>
						<li class="purpose-option">
							<input 
								type="radio" 
								id="purpose2" 
								name="purpose" 
								value="Wedding"
								onclick={() => {
									formData.Purpose = 'Wedding';
									validatePurpose();
								}}
							/>
							<label for="purpose2">Wedding</label>
						</li>
						<li class="purpose-option">
							<input 
								type="radio" 
								id="purpose3" 
								name="purpose" 
								value="Anniversary"
								onclick={() => {
									formData.Purpose = 'Anniversary';
									validatePurpose();
								}}
							/>
							<label for="purpose3">Anniversary</label>
						</li>
						<li class="purpose-option">
							<input 
								type="radio" 
								id="purpose4" 
								name="purpose" 
								value="Thank You"
								onclick={() => {
									formData.Purpose = 'Thank You';
									validatePurpose();
								}}
							/>
							<label for="purpose4">Thank You</label>
						</li>
					</ul>
					{@render button('skip',3)}
					{@render button('continue',3)}
				</article>
			</div>
		</section>
	
	<!-- Step 3: Choose Card Design -->
	{:else if currentStep === 4}
		<section class="step-container" transition:fade>
			<div class="left-step">
				<section class="step-header">
					{@render button('back')}
					<h2>Choose Card Design</h2>
				</section>
			</div>

			<div class="right-step">
				<article class="card-designs">
					<ul class="card-design-options">
						<li 
						class="card-option {formData.cardDesign === 'design1' ? 'selected' : ''}"
						onclick={() => {
							formData.cardDesign = 'design1';
							validateCardDesign();
						}}
							>
							Design 1
						</li>
						<li 
						class="card-option {formData.cardDesign === 'design2' ? 'selected' : ''}"
						onclick={() => {
							formData.cardDesign = 'design2';
							validateCardDesign();
						}}
							>
							Design 2
						</li>
					</ul>
					
					<section class="message-input">
						<label for="message">Add a message (optional)</label>
						<textarea 
						id="message" 
						bind:value={formData.message}
						rows="3"
						></textarea>
					</section>
				</article>
				{@render button('skip',4)}
				{@render button('continue',4)}
			</div>
		</section>
	
	<!-- Step 4: Review and Confirm -->
	{:else if currentStep === 5}
		<section class="step-container" transition:fade>
			<div class="left-step">
				<section class="step-header">
					{@render button('back')}
					<h2>Select a payment method</h2>
				</section>
				<section class="amount-input-container payment-input-container">
					{#if formData.recipient.linkedCard !== null }
					<label for='paymentMethod1'><input type="radio" id='paymentMethod1' name="paymentMethod" onclick={() =>{
						formData.PaymentMethod = formData.recipient.linkedCard;
						validatePayment
						}} value="paymentMethod1">
						Linked Credit/Debit Card
					</label>
					{/if}
					<label for='paymentMethod2'><input type="radio" id='paymentMethod2' name="paymentMethod" onclick={() =>{
						formData.PaymentMethod = 'iDEAL';
						validatePayment
						}} value="paymentMethod2">
						iDEAL 
					</label>
					<label for='paymentMethod3'><input type="radio" id='paymentMethod3' name="paymentMethod" onclick={() =>{
						formData.PaymentMethod = 'EFT';
						validatePayment
						}} value="paymentMethod3">
						EFT Payment
					</label>
				</section>
			</div>

			<div class="right-step">
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
				
				{@render button('submit')}
			</div>
		</section>
	{/if}
</article>

<style>
	.transfer-wizard {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / -1;
		display: grid;
		grid-template-columns: 
		subgrid 
		[left-start] repeat(5,[mid-left]) [left-end right-start] repeat(5,[mid-right]) [right-end];
		grid-template-rows: minmax(min-content,4px) 1fr 1fr 3fr;
		height: 100%;
		width: 100%;

		container-type:normal;
		container-name: transfer-wizard;

		@container style(--mobile:1) {
			height: calc(98dvh - var(--footer-height) - var(--header-height));
		}
	}
	
	.progress-bar {
		position: relative;
		grid-column: 1 / -1;
		grid-row: 1 / 2;
		height: 4px ;
		background-color: var(--general-background-color);
		border-radius: 2px;
		/* margin-bottom: 1.5rem; */

		@container style(--mobile:1) {
			margin-bottom: 0;
		}
	}

	.progress {
		position: relative;
		height: 100%;
		background-color: var(--primary-darkgreen-550);
		border-radius: 2px;
		transition: width 0.3s ease;

		@container style(--mobile:1) {
		}
	}

	.step-container{
		position: relative;
		grid-column: left / right;
		grid-row: 2 / -1;
		display: grid;
		grid-template-columns: subgrid;
		gap: 1rem;
		padding: 1rem;
		height: 100%;
		width: 100%;
		/* outline: solid; */

		/* background-color: var(--primary-orange-500); */
		@container style(--mobile:1) {
			display: flex;
			flex-direction: column;
			width: 100%;
			/* height: 100cqh; */
			/* background-color: var(--primary-orange-500); */
		}
	}

	.left-step {
		position: relative;
		grid-column: left ;
		grid-row: 1 / -1;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		/* outline: solid; */

		@container style(--mobile:1) {
			height: fit-content;
			grid-row: 1 / 2;
		}
	}

	.right-step {
		position: relative;
		grid-column: right;
		grid-row: 1 / -1;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		
		@container style(--mobile:1) {
			grid-row: 2 / -1;
			height: 100%;
			width: 100%;
			/* justify-content: space-around; */
			/* outline: solid crimson; */
		}
	}
	
	
	.step-header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: fit-content;
		/* margin-bottom: 1rem; */
		/* outline: solid blue; */

		 button{
			flex: 0 1 20%;
			height: 100%;
		}
		
		h2{
			flex: 1 1 auto;
			height: 100%;
			font-size: clamp(1rem,50vw ,1rem);
		}
		
		
		.back-button {
			background: none;
			border: none;
			font-size: 1.5rem;
			cursor: pointer;
			height: 100%;
			}

			@container style(--mobile:1) {
				display: none;
			}
		}
			
	.step-container > p {
		position: relative;
	}

	.search-container {
		background-color: #f5f5f5;
	}
	
	.search-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		/* margin-bottom: 1rem; */
	}

	.recipients-list{ 
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		height: fit-content;
		/* display: none; */
		overflow-y: scroll;
		/* outline: solid rgb(0, 255, 30); */
		/* margin-inline: 5%; */
		.recipient-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 5%;
			border-bottom: 1px solid #e0e0e0;
			border-radius: 10px;
			cursor: pointer;
		}
		
		.recipient-item:where(.selected) {
			border: solid 2px var(--primary-darkgreen-550);	

			.recipient-details p {
				color: var(--primary-darkgreen-550);
			}
		}
		
		.recipient-info {
			display: flex;
			align-items: center;
		}
		
		.profile-pic {
			width: 40px;
			aspect-ratio: 1;
			border-radius: 50%;
			margin-right: 1rem;
		}
		
		.recipient-details h3 {
			margin: 0;
			font-size: 1rem;
		}
		
		.recipient-details p {
			margin: 0;
			font-size: 0.875rem;
			color: #666;
		}
	}

	
	
	.last-sent {
		font-size: 0.8rem;
		color: #666;
	}

	form:has(.amount-input-container){
		/* outline: solid red; */
	}

	.amount-input-container,.payment-input-container {
		margin-bottom: 1rem;
	}
	
	:is(.amount-input-container,.payment-input-container) label {
		display: block;
		margin-bottom: 0.5rem;
	}
	
	:is(.amount-input-container,.payment-input-container) input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
	}
	
	.card-designs {
		margin-bottom: 1rem;
	}
	
	.card-design-options {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	
	.card-option {
		border: 2px solid #e0e0e0;
		border-radius: 4px;
		padding: 1rem;
		flex: 1;
		cursor: pointer;
		text-align: center;
	}
	
	.card-option.selected {
		border-color: var(--primary-darkgreen-550);
	}
	
	.message-input label {
		display: block;
		margin-bottom: 0.5rem;
	}
	
	.message-input textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		resize: vertical;
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
		}
		
		.review-label {
			font-weight: 500;
			flex: 0 1 50%;
			text-wrap: nowrap;
		}

		.review-value{
			flex: 1 0 auto;
		}

	}

	.continue-button, .submit-button, .skip-button {
		position: absolute;
		bottom: var(--body-padding);
		/* right: var(--body-padding); */
		width:50%;
		padding: 1rem;
		background-color: #4B7A5B;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		/* margin-top: 1rem; */
		font-weight: 500;
		/* justify-self: center; */
		
		@container style(--mobile:1) {
			width: 100%;
			right: 0;
			/* bottom: calc(var(--footer-height) * -1 - var(--body-padding)); */
			bottom: 0;
			align-items: end;
		}
	}
	
	/* .continue-button{

	} */

	.continue-button.disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.skip-button {
		background-color: #4B7A5B;
		cursor: pointer;
		/* bottom: calc(var(--body-padding) + 5rem); */
	}

	.submit-button {
		background-color: #4B7A5B;
	}

	
</style>
