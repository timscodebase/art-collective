<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/galleries">Galleries</a></li>
		<li><a href="/chat">Chat</a></li>
		<li><a href="/sales">Sales</a></li>
		<li><a href="/latest-uploads">Latest Uploads</a></li>
	</ul>
</nav>

<main>
	{@render children?.()}
</main>
