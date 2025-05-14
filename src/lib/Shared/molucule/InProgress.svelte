<article class="message-container">
	<header class="message-header">
		<h2>in progress</h2>
	</header>
	<section class="message-body">
		<img src="./shared-assests/team-brainstorming.png" alt="team-brainstorming">
		<p>Oops! Looks like you've stumbled upon a page that's still under construction. Our team is working hard to bring this content to life. In the meantime, feel free to return to our home page.</p>
		<a href="/" >
			go home
		</a>
	</section>
</article>


<style>

	:global(html:has(.message-container) main)  {
			overflow: hidden;

		&::after{
			@container style(--mobile:1) {
				content: '';
				position: absolute;
				inset: 0 -30dvw;
				background-color: color-mix( in srgb, rgba(243, 243, 243, 0.549), var(--primary-green-500) 20%);
				backdrop-filter: blur(5px);
				z-index: 10;
			}
		}
	}

	*{
		user-select: none;
	}

	.message-container {
		--rad:clamp(5px, 5vw, 10px);
		position: absolute;
		width: 30dvw;
		height: auto;
		inset-inline: 31vw;
		padding-top: 30%;
		z-index: 101;
		
		@container style(--mobile:1) {
			position: relative;
			padding: 20px;
			grid-column: content;
			top: 0;
			left: 0;
			height: 100dvh;
		}
	}

	.message-header {
		background-color: var(--primary-green-500);
		color: white;
		padding: 10px;
		border-radius: var(--rad) var(--rad) 0 0;
		width: 100%;

		height: 10%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center	;

		/* display: none; */

		@container style(--mobile:1) {
			display: none;
		}
	}

	.message-body {
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgb(255, 255, 255);
		color: black;
		padding: 20px;
		border-radius: 0 0 var(--rad) var(--rad);
		width: 100%;
		height: 50%;
		text-align: center;

		@container style(--mobile:1) {
			grid-column: 1 / -1;
			width: 100%;
			height: calc(100% - 16svh);
			background-color: unset;
			padding: unset;
			padding-top: 15dvh;
		}
	}

	.message-body img {
		width: auto;
		height: auto;

	}

	.message-body p {
		text-align: center;
		font-size: 1.2rem;
		max-width: 50vw;
		margin-bottom: 1rem;

		@container style(--mobile:1) {
			width: 100%;
			max-width: 100%;
			margin-bottom: 0;
			padding-top: 10dvh;
		}
	}

	a{
		position: relative;
		bottom: var(--body-padding);
		right:0;
		width:50%;
		
		padding: clamp(1rem,1vw,1rem);
		background-color: #4B7A5B;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		align-self: center;
		margin-top: auto;

		@container style(--mobile:1) {
			position: relative;
			width: 100%;
			right: 0;
			bottom: auto;
			align-items: end;
			align-self: flex-end;
			margin-top: auto;
		}
	}

</style>