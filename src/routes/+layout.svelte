<script>
	import { onMount } from 'svelte';
	import '../app.css';
	let { children } = $props();

	async function detectSWUpdate(){
		const registration = await navigator.serviceWorker.ready;
		
		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('A new version of the app is available. Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}

				
			});
		});
	}

	onMount(() => {detectSWUpdate()});

	console.log(
		'%c%s',
		'color: white; background: blue; font-size: 24px;',
		'PWA with service worker'
	);
	
</script>

<header>header</header>

<main>
	{@render children()}
</main>

<footer>footer</footer>

<style>
	main {
		background-color: #43ae57;
		display: inline-block;
	}
</style>
