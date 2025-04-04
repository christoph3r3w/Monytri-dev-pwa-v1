<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	
	let { formData, validatePurpose, button } = $props();
	
	onMount(() => {
		formData.Purpose = '';
	});

</script>


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
		</article>
		<div class="button-container">
			{@render button('continue',3)}
			{@render button('skip',3)}
		</div>
	</div>
</section>

<style>
	.purpose-selction {
		flex: 2 1 50%;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
	
	.purpose-options {
		background-color: var(--white);
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		overflow-y: scroll;
	}
	
	.purpose-option{
		position: relative;
		display: flex;
    	align-items: center;
		background-color: var(--general-background-color);
		width: clamp(100px, 20cqw, 200px);
		height: auto;
		aspect-ratio: 1;
		background-color: var(--general-background-color);
	}

	.purpose-option:has(input:checked) {
		background-color: var(--primary-darkgreen-550);
		color: var(--white);
	}

	.purpose-option input {
		display: none;
		width: clamp(100px, 20cqw, 200px);
		aspect-ratio: 1;
	}

	.purpose-option label {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

</style>