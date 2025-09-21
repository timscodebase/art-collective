<script lang="ts">
	import { session } from '$lib/stores/session';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// Initialize the store with data from the server
	$session = $page.data.session;

	async function logout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		$session = null;
		await goto('/');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if $session}
			<li><a href="/galleries">Galleries</a></li>
			<li><a href="/chat">Chat</a></li>
			<li><a href="/sales">Sales</a></li>
			<li><a href="/latest-uploads">Latest Uploads</a></li>
		{/if}
	</ul>
	<div>
		{#if $session}
			<span>{$session.user.email}</span>
			<button onclick={logout}>Logout</button>
		{:else}
			<a href="/login">Login</a>
			<a href="/signup">Sign Up</a>
		{/if}
	</div>
</nav>

<main>
	{@render children?.()}
</main>