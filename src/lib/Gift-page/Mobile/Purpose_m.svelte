<script>
		import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	
	let { formData, validatePurpose, button } = $props();

	let PurposeList = $state([
		{id: 1,name: 'Birthday',value: 'Birthday',img:'./purpose-assets/Party-3--Streamline-Brooklyn (Traced)party.png'},
		{id: 2,name: 'Wedding',value: 'Wedding',img:'./purpose-assets/Lgbt-Wedding-2--Streamline-Brooklyn (Traced)wedding.png'},
		{id: 5,name: 'Just Because!',value: 'Just Because!',img:'./purpose-assets/Investment-Data-2--Streamline-Brooklyn (Traced)justbecause.png'},
		{id: 3,name: 'Anniversary',value: 'Anniversary',img:''},
		{id: 4,name: 'Thank You',value: 'Thank You',img:''},
		{id: 6,name: 'Job Promotion',value: 'Job Promotion',img:'./purpose-assets/Team-Success-3--Streamline-Brooklyn (Traced)job.png'},
		{id: 7,name: 'New Home',value: 'New Home',img:'./purpose-assets/Welcome Streamline Brooklyn 1 (Traced)newhome.png'},
		{id: 8,name: 'New Family Member',value: 'New Family Member',img:'./purpose-assets/image 18 (Traced)pregnant.png'},
	])

	
	onMount(() => {
		formData.Purpose = '';
	});


</script>

<section class="step-container" transition:fade>			
	<section class="step-header">
		{@render button('back')}
		<h2>Choose a purpose</h2>
		{@render button('skip',3)}
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

	<article class="purpose-selction">
		<ul class="purpose-options">
			{#each PurposeList as purpose}
			<li class="purpose-option" >
				<input 
					type="radio" 
					id="purpose{purpose.id}" 
					name="purpose" 
					value={purpose.value}
					onclick={() => {
						formData.Purpose = purpose.value;
						validatePurpose();
					}}
				/>
				<label for="purpose{purpose.id}">
					{#if purpose.img}
						<p>{purpose.name}</p>
						<div class="purpose-icon-container">
							<img src={purpose.img} alt="{purpose.name} icon" class="purpose-icon" />
						</div>
					{:else}
						<p>{purpose.name}</p>
					{/if}
				</label>
			</li>
			{/each}	
	</ul>
	</article>
<div class="button-container">
	{@render button('continue',3)}
</div>
</section>

<style>
	.purpose-selction {
		position: relative;
		flex: 1 1 70%;
		height: 50vh;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		border-radius: clamp(5px, 11cqw, 10px);
		/* overflow: hidden; */
		/* outline: solid green; */
	}
	
	.purpose-options {
		position: relative;
		background-color: var(--white);
		padding-block: 3rem;
		padding-inline: 1%;
		display: flex;
		flex-wrap: wrap;
		align-content: start;
		justify-content: center;
		height: 100%;
		gap: clamp(1rem, 4cqw, 1.2rem);
		border-radius: clamp(5px, 11cqw, 10px);
		padding-right: 2%;

		overflow-y: auto;
		overflow-x: clip;
		scrollbar-width:auto;  

		/* outline: solid red; */
		container-type: inline-size;

		&::-webkit-scrollbar {
			width: 12px;
			background-color: #f1f1f1;
		}
		
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 4px;
			margin-block: 0.5rem;
		}
		
		&::-webkit-scrollbar-thumb {
			background: var(--primary-darkgreen-550);
			border-radius: 4px;
			min-height: 40px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: var(--primary-darkgreen-550);
			opacity: 0.8;
		}
	}

	.purpose-option{
		position: relative;
		display: flex;
		background-color: var(--general-background-color);
		/* width: clamp(100px, 45cqw, 100%); */
		/* height: clamp(100px, 50cqw, 50cqw); */
		max-width: 300px;
		flex: 1 1 40cqw;
		aspect-ratio: 1;
		border-radius: clamp(5px, 11cqw, 10px);
		overflow: clip;
	}

	.purpose-option label{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		border-radius: clamp(5px, 11cqw, 10px);
		overflow: clip;
		padding-top: 5%;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.purpose-option:has(img) p{
		width: fit-content;
		height: fit-content;
		padding: 2%;
		margin-inline: 5%;
		align-self:start;
		border-radius: clamp(5px, 11cqw, 5px);
		background-color: var(--white);
		/* outline: solid red; */
	}

	.purpose-option .purpose-icon-container{
		flex: 1 2 auto;
		width: 100%;
		height: 90%;
		display: flex;
		justify-content: center;
		aspect-ratio: 1;
		border-radius: clamp(5px, 11cqw, 10px);
		padding: 10%;
		/* outline: solid green; */
	}

	.purpose-option .purpose-icon{
		object-fit: contain;
		object-position: center;
	}

	.purpose-option:has(input:checked) {
		outline: solid var(--primary-darkgreen-550);
	}

	.purpose-option input {
		display: none;
		width: clamp(100px, 20cqw, 200px);
		aspect-ratio: 1;
	}
	

</style>