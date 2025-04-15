<script>
	import { goto } from '$app/navigation';
	import {fade} from 'svelte/transition';
	let { formData, validateCardDesign,button } = $props();
	let date = $state(new Date())

	let cardDesigns = $state([
		{ id: 'design1', name: 'Design 1',cardBackground: './gift-page-assets/Gift card 1.png',cardbackgroundMessage:'./gift-page-assets/Message Card.png' ,primaryColor:'#AFABED'},
		{ id: 'design2', name: 'Design 2',cardBackground: './gift-page-assets/Gift card 6.png',cardbackgroundMessage:'./gift-page-assets/Message Card6.png' ,primaryColor:'#82A6C5'},
		{ id: 'design3', name: 'Design 3',cardBackground: './gift-page-assets/Gift card 2.png',cardbackgroundMessage:'./gift-page-assets/Message Card2.png' ,primaryColor:'#5AB1AA'},
		{ id: 'design4', name: 'Design 4',cardBackground: './gift-page-assets/Gift card 3.png',cardbackgroundMessage:'./gift-page-assets/Message Card3.png' ,primaryColor:'#F2A550'},
		{ id: 'design5', name: 'Design 5',cardBackground: './gift-page-assets/Gift card 5.png',cardbackgroundMessage:'./gift-page-assets/Message Card5.png' ,primaryColor:'#AFABED'},
		{ id: 'design6', name: 'Design 6',cardBackground: '',cardbackgroundMessage:'' ,primaryColor:'purple'},
		{ id: 'design7', name: 'Design 7',cardBackground: '',cardbackgroundMessage:'' ,primaryColor:'orange'},
		{ id: 'design8', name: 'Design 8',cardBackground: '',cardbackgroundMessage:'' ,primaryColor:'red'}
	]);
</script>
<section class="step-container">
	<div class="left-step" >
		<section class="step-header"  transition:fade>
			{@render button('back')}
			<div class="step-header-text">
				<h2>Select a gift card</h2>
				<p>Choose a card and write a message </p>
			</div>
		</section>
	</div>

	<div class="right-step"  transition:fade>
		<span class="option-select">
			{#each cardDesigns as cardDesign}
			<input type="radio" id={cardDesign.id} name="cardDesign" value={cardDesign.id}
			onclick={() => {
				formData.cardDesign = cardDesign.id;
				validateCardDesign();
			}}>
			{/each}
		</span>
		<article class="card-designs-container">
			<ul class="card-design-options">
				{#each cardDesigns as cardDesign}
					<li 
					id="{cardDesign.id}"
					class="card-option {formData.cardDesign === cardDesign.id ? 'selected' : ''}" 
					style="--card-color:{cardDesign.primaryColor};--card-background:{cardDesign.cardBackground};--card-background-message:{cardDesign.cardbackgroundMessage};">
						<label for="{cardDesign.id}">
						<section class="card simple-card" 
							  style="background-image: url('{encodeURI(cardDesign.cardBackground)}');"
							>
							  <h3>{'Monytri'|| cardDesign.name}</h3>
							  <p>Stock gift card</p>
							  <span>€{formData.amount}</span>
						</section>
						<p>Tap the card below to customise your message </p>
						<section class="card message-input" 
							  style="background-image: url('{encodeURI(cardDesign.cardbackgroundMessage)}');"
							>
							  <h4>Monytri</h4>
							<p>{formData.currentDate}</p>
							<label for="message"> 
								<textarea 
								id="message" 
								bind:value={formData.message}
								rows="3"
								maxlength="100"
								placeholder="Create a custom message"
								tabindex="{formData.cardDesign === cardDesign.id ? 0 : -1}"
									></textarea>
							</label>
							<span>€{formData.amount}</span>
						</section>
						</label>
					</li>
				{/each}
			</ul>
			
		</article>
		<div class="button-container">
			{@render button('continue',4)}
			{@render button('skip',4)}
		</div>
	</div>
</section>

<style>

	.right-step{
		height: 100%;
		flex-direction: column;
	}
	/* main container */
	.card-designs-container {
		flex: 1 2 90cqh;
		/* max-width: 900px; */
		height: 100%;
		position: relative;
		padding-inline: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 930px), (max-height: 600px) {
		.card-designs-container {
			flex: 1 1 80cqh;
			height: clamp(60%,85vh,89%) ;
		}
	}

	/* check boxes */
	.option-select{
		flex: 0 1 10%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3%;
		margin-block: clamp(0px,2vh,2%);
		/* background-color: yellowgreen; */
	}

	.option-select input[type="radio"] {
		position: relative;
		background-color: var(--white);
	}

	.option-select input[type="radio"]::before {
		content: '';
		position: absolute;
		inset: 0;
		display: block;
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--primary-darkgreen-550) 40% ,white);
	}

	.option-select input[type="radio"]:checked::before {
		background-color: var(--primary-darkgreen-550);
	}

	.card-design-options {
		position: relative;
		display: flex;
		gap: 1vw;
		width: 110%;
		max-width: 55rem;
		height: 100%;
		padding: 1rem;
		overflow-x: scroll;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		
		container-type: inline-size;
		
		/* outline: solid rgb(0, 255, 21); */
		
		/* &::-webkit-scrollbar {
			height: 8px;
		}
		
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 4px;
		}
		
		&::-webkit-scrollbar-thumb {
			background: var(--primary-darkgreen-550);
			border-radius: 4px;
		} */

	}
	
	.card-option {
		position: relative;
		height: 100%;
		/* version 1 */
		/* flex: 0 1 100cqw; */
		/* version 2 */
		/* flex: 0 0 fit-content; */
		/* version 3 */
		flex: 0 0 100cqw;
		/* width: fit-content; */

		display: flex;
		border: solid transparent;
		scroll-snap-align:start;
		scroll-snap-stop: always;
		/* outline:violet solid ; */
	}

	/* middle text between cards */
	.card-option p {
		width: 100%;
		max-width: 400px;
		text-align: center;
	}

	/*//////////////////////////////////////////////*/
	/* test this out with them durring the meeting  */

	/* .card-option.selected {
		border-radius: 14px;
		box-shadow: inset 0px 0px 55px -37px color-mix(in srgb, var(--general-background-color) 10%, var(--card-color,var(--grey-400)));
	} */

	.card-option.selected section {
		border-radius: 14px;
		box-shadow: 0px 0px 75px -27px color-mix(in srgb, var(--general-background-color) 10%, var(--card-color,var(--grey-400) 90%));
	}
	/*//////////////////////////////////////////////*/

	.card-option > label{
		position: relative;
		padding: 1rem;
		height: 100%;
		min-width: clamp(3%,300px,100%);
		flex: 0 0 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1cqb;
		align-items: center;
		border-radius: 14px;
		/* outline: solid red; */
	}

	.card-option .card{
		--_inline-padding:1.6rem;
		--_block-padding:1.6rem;
		position: relative;
		height: clamp(10cqi,50cqi,30cqh);
		aspect-ratio: 14/9;
		width: clamp(200px,420px 30cqw);
		background-color: var(--white);
		display: grid;
		grid-template-areas: a;
		place-content: center;
		border-radius: 9px;
		box-shadow: 0px 0px 23px -17px #dddddd;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;

		/* outline: solid rgb(0, 255, 21); */
	}
	
	.card > *{
		position: absolute;
	}

	/* general card styling */

	/* logo in the middle  */
	.simple-card h3{
		position: relative;
		font-size: clamp(1.5rem, 2.5rem, 4rem);
		font-weight: 600;
	}

	/* card text bottom left */
	.simple-card p{
		font-size: .9rem;
		bottom: var(--_block-padding);
		left: calc(var(--_inline-padding) - 2cqw);
		width: 15cqw ;
	}

	/* gift-amount */
	.simple-card span{
		bottom: var(--_block-padding);
		right: var(--_inline-padding);
		font-size: 1.5rem;
		background-color: var(--off-white);
		color: var(--primary-darkgreen-550);
		border-radius: 8px;
		padding: 1%;
	}

	.message-input{
		container-type: inline-size;
	}

	/* logo name */
	.message-input h4{
		font-size: 1.2rem;
		font-weight: 600;
		left: calc(var(--_inline-padding) - 2cqw);
		top: calc(var(--_block-padding) - 1cqh);
		width: fit-content;
	}

	/* card date */
	.message-input p{
		font-size: 11.2px;
		top: calc(var(--_block-padding) - 1cqh);
		right: var(--_inline-padding);
		width: fit-content ;
		min-width: 15cqw ;
	}

	/* message input */
	.message-input label {
		display: flex;
		flex-direction: column;
		inset-block: calc(var(--_inline-padding) + 3cqh) calc(var(--_block-padding) + 5cqh);
		right: var(--_inline-padding);
	}

	.message-input label textarea {
		flex: 1 1 auto;
		text-align: right;
		width: 50cqmin;
		height: auto;
		padding: 0.75rem;
		border-bottom: 1px solid var(--card-color,#e0e0e0);
		resize:none;
		background-color: transparent;

		&::placeholder {
			color: var(--black);
			font-size: 1.1rem;
			padding-top: 8cqh;
			text-wrap: no-wrap;
			width: 100%;
		}
	}

	.message-input textarea:focus-within {
		width: 90cqw;
	}

	/* gift-amount */
	.message-input span{
		bottom: var(--_block-padding);
		right: var(--_inline-padding);
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--black);
		border-radius: 8px;
		padding: 1%;
	}

</style>