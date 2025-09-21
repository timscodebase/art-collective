<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		// We use goto to force a server reload which clears the user state
		await goto('/');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if $page.data.user}
			<li><a href="/galleries">Galleries</a></li>
			<li><a href="/chat">Chat</a></li>
		{/if}
	</ul>
	<div>
		{#if $page.data.user}
			<span>{$page.data.user.email}</span>
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