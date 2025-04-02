<script>
	import { fade } from 'svelte/transition';
	let { formData, validateCardDesign, button } = $props();
</script>

<section class="step-container" transition:fade>
	<section class="step-header">
		{@render button('back')}
		<h2>Choose Card Design</h2>
		{@render button('skip',4)}

	</section>

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
<div class="button-container">
	{@render button('continue',4)}
</div>
</section>

<style>
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

</style>