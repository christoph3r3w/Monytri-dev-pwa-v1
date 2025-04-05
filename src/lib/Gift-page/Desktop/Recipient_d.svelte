<script>
	import { fade } from 'svelte/transition';
	let { formData, recipients, selected, button } = $props();

</script>

<section class="step-container" >
	<div class="left-step"  >
		<section class="step-header"  transition:fade>
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
	
	<div class="right-step"  transition:fade>
		<h3 class="section-title">Most Recent</h3>
		<ul class="recipients-list">
			{#each recipients as recipient}
				<li 
					class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}"
					onclick={() => selected(recipient)}
					>
					<article class="recipient-info">
						<!-- <img src={recipient.profilePic} alt={''||recipient.name} class="profile-pic" /> -->
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
		
		<div class="button-container">
			{@render button('continue',1)}
		</div>
	</div>
</section>

<style>

	.recipients-list{ 
		flex: 1 1 70%;
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow-y: scroll;
		background-color: var(--white);
		gap: 1rem;

		scrollbar-width: thin;
		overflow-y: scroll;
		
		.recipient-item {
			display: flex;
			width: 90%;
			justify-content: space-between;
			align-items: center;
			padding: clamp(1%,1.5vw,5%);
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

		/* @container style(--mobile:1) {
			flex: 2 1 50%;
			
		} */
	}

	.last-sent {
		font-size: 0.8rem;
		color: #666;
	}


</style>
