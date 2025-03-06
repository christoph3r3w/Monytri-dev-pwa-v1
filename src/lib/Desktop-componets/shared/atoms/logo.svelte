<a href="/">
	<picture>
		<img src="Monytri-01-1.png" alt="logo" width="40px" />
	</picture>
	<h1>monytri</h1>
</a>

<style>
	a {
		display: flex;
		align-items: center;
		width: clamp(100px, 50%, 10vw);
		gap: 5px;
		color: var(--black);
	}
	
	picture {
		flex: 0 0 fit-content;
		width: fit-content;
		height: fit-content;
		transition: .5s ease;
	}

	picture img {
		aspect-ratio: 1 / 1;
		width: 40px;

		@starting-style{
			width: 40px;
		}
	}

	h1 {
		flex: 0 0 50%;
		font-size: clamp(1rem,2rem,2rem);
		font-weight: 600;
		text-transform: capitalize;
	}
</style>