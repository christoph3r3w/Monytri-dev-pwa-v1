<script>
	import { fade } from 'svelte/transition';
	let { formData, recipients, selected, button } = $props();

</script>

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
		
	</div>
	<div class="button-container">
		{@render button('continue',1)}
	</div>
</section>

<style>
		.step-header {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		position: relative;
		height: fit-content;

		button{
			flex: 0 1 20%;
			height: 100%;

			@container style(--mobile:1) {
				display: flex;
				align-items: center;
				flex: 0 1 20%;
				height: 60%;

				svg {
					height: fit-content;
				}
			}
		}
		
		h2{
			flex: 2 1 40%;
			height: fit-content;
			align-items: center;
			justify-content: center;
			font-size: clamp(1rem,20vw ,1.2rem);
			margin-block: 4%;
			padding-inline: 2%;
		}
		
		.back-button {
			background: none;
			border: none;
			font-size: 1.5rem;
			cursor: pointer;
			height: 100%;
		}

		@container style(--mobile:1) {
			display: flex;
			align-items: baseline;

			button{
				flex: 0 1 20%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 0 1 20%;
				height: 60%;
			}
				
		}
	}

	.step-container > p {
		position: relative;
		margin-bottom: 1.5rem;
	}

	.step-container h3{
		position: relative;
		margin-bottom: 1%;
	}

	.search-container {
		background-color: #f5f5f5;
		margin-bottom: 4%;
	}
	
	.search-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
	}

	.recipients-list{ 
		display: flex;
		flex-direction: column;
		flex-basis: 50%;
		width: 100%;
		overflow-y: scroll;
		background-color: var(--white);

		.recipient-item {
			display: flex;
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

		@container style(--mobile:1) {
			flex: 2 1 50%;
			
		}
	}

	.last-sent {
		font-size: 0.8rem;
		color: #666;
	}


</style>
