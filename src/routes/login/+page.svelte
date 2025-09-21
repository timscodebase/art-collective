<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	async function login(e: Event) {
		e.preventDefault();
		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			await goto('/galleries');
		} else {
			const data = await res.json();
			error = data.error;
		}
	}
</script>

<h1>Login</h1>

<form onsubmit={login}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Login</button>
	{#if error}<p style="color: red;">{error}</p>{/if}
</form>