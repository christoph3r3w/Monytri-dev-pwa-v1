<script>
	import { onMount } from 'svelte';
	import {Logo} from '$lib';
	import QRCode from 'qrcode';
	import { goto } from '$app/navigation';

	const currentURL = './share';
	let qrDataUrl = '';

	// Move generateQR outside of onMount
	async function generateQR() {
		try {
			qrDataUrl = await QRCode.toDataURL(currentURL);
		} catch (err) {
			console.error(err);
		}
	}

	async function share() {
				if (navigator.share) {
					try {
						await navigator.share({
							title: 'Monytri',
							text: 'Check out Monytri!',
							url: currentURL
						});
					} catch (err) {
						console.error('Share failed:', err);
					}
				} else {
					alert('Web Share API is not supported in your browser.');
				}
			}

</script>


<div class="container">
	
	<h2>Request coming soon</h2>
	
	
	<figure class="banner">
		<img src="./shared-assests/Monytri-01.png" alt="">
	</figure>

	<article class="share-container">
		<h2>
			Share Monytri with your friends and family.
		</h2>

		<figure class="qr-container">
			{#if qrDataUrl.length > 0}
			<img src={qrDataUrl} alt="QR Code" width="300" height="300" />
			<p>Scan the QR code to share Monytri</p>
			{/if}
		</figure>

		<div class="share-button-container">
			<button onclick={generateQR}>
				generate QR code
			</button>
	
			<button onclick={share}>
				share
			</button>

			<button onclick={goto('/share')}>
				share page
			</button>
		</div>
	</article>

	<!-- add socials here -->
	<section class='socials'>
		<a href=""><img src="" alt=""></a>
		<a href=""><img src="" alt=""></a>
		<a href=""><img src="" alt=""></a>
	</section>
	

	<figure>
		<Logo name={false}/>
	</figure>
</div>

<style>
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		height: fit-content;
		margin-bottom: 5rem;
	}

	article,figure{
		border-radius: 8px;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		background-color: white;
	}

	h2{
		font-size: clamp(1rem,8vw,1.1rem);
	}

	.container > h2{
		position: relative;
		margin-block: 3%;
		width: 100%;

		&::after{
			content: '';
			position: absolute;
			inset-inline: 0;
			top:auto;
			bottom: -80%;
			display: block;
			width: 100%;
			height: 1px;
			border-radius: 8px;
			background-color: var(--grey-400);
		}
	}	

	figure.banner{
		width: 100%;
		aspect-ratio: 30/9;
		background-color: var(--white);
		background-image: url('./shared-assests/banner-deco.png');
		background-size: cover;
		display: grid;
		place-items: center;
	}

	.banner img{
		width: 60%;
		height: auto;
	}

	.share-container{
		padding-inline: 2rem;
		padding-block: 1rem;
	}

	.qr-container{
		min-height: 20dvh;
		max-width: 400px;
		gap: 1rem;
	}

	.qr-container p{
		font-size: 12px;
		margin-bottom: 1%;
	}

	.qr-container img{
		width: 60%;
		height: auto;
	}


	.share-button-container {
		flex: 1 1 20%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 1svh;
		justify-content: end;
	}

	.share-button-container button {
		width: 100%;
		padding: clamp(10px, .9rem, 1vw) clamp(10px, .9rem, 1vw);
		text-decoration: none;
		text-align: center;
		font-size: 1rem;
		width: 100%;
		padding: 1rem 2rem;
		border-radius: 5px;
		border: solid var(--primary-green-500) 2px;
		
		&:nth-of-type(1) {
			background-color: var(--primary-green-500);
			color: var(--white);
		}
		
		&:nth-of-type(2) {
			color: var(--primary-green-500);
		}
	}

	figure:nth-last-of-type(1){
		background-color: unset;
		margin-bottom: 5rem;
	}
</style>