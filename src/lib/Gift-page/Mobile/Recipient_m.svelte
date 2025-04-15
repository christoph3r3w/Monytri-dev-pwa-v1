<script>
	import { fade } from 'svelte/transition';
	let { formData, recipients, selected, button } = $props();

	let filteredRecipients = $derived(
		formData.searchQuery 
		? recipients.filter(recipient => 
			recipient.name.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
			recipient.email.toLowerCase().includes(formData.searchQuery.toLowerCase())
		)
		: recipients
	);

</script>

			<section class="step-container" transition:fade>
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
						bind:value={formData.searchQuery}
					/>
				</section>

				{#if formData.errors[1]}
					<div class="error-message" transition:fade>
						{formData.errors[1]}
					</div>
				{/if}
				
				<section>
					<h3 class="section-title">Most Recent</h3>
					<ul class="recipients-list">
						{#each filteredRecipients as recipient}
							<li 
								class="recipient-item {formData.recipient?.id === recipient.id ? 'selected' : ''}"
								onclick={() => selected(recipient)}
								>
								<article class="recipient-info">
									<div class="profile-pic">
										{recipient.name[0].toUpperCase()}
									</div>
									<div class="recipient-details">
										<h3>{recipient.name}</h3>
										<p>{recipient.email}</p>
										<p class="last-sent">Last sent: {recipient.lastSent}</p>
									</div>
								</article>
								<button class="more-options" aria-label="More options">...</button>
							</li>
						{:else}
							<li class="no-results">
								No recipients found
							</li>
						{/each}
					</ul>
				</section>
				<div class="button-container">
					{@render button('continue',1)}
				</div>
			</section>

<style>
	section:has(.recipients-list){
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1cqh;
		overflow-y: hidden;
	}

	.recipients-list{ 
		background-color: var(--white);
		height: fit-content;
		max-height: 50cqh;
		overflow-y: scroll !important;
		padding-inline: 1cqw;
		padding-block: 2cqh;
		/* background-color:#c00; */

		
		.recipient-item {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: clamp(1%,1.5vw,5%);
			border-bottom: 1px solid #e0e0e0;
			border-radius: 10px;
			cursor: pointer;
		}
		
		.recipient-item:where(.selected) {
			outline: solid 2px var(--primary-darkgreen-550);	

			.recipient-details p {
				color: var(--primary-darkgreen-550);
			}
		}
		
		.recipient-info {
			display: flex;
			align-items: center;
		}
		
		.profile-pic {
			width: clamp(1rem,40px,5vh);
			/* aspect-ratio: 1; */
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

		.last-sent {
			display: none;
		}
		
	}


	.error-message {
		background-color: #fee;
		color: #c00;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		text-align: center;
	}

	.no-results {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	.profile-pic {
		width: 40px;
		aspect-ratio: 1;
		border-radius: 50%;
		margin-right: 1rem;
		background-color: var(--primary-darkgreen-550);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

</style>
