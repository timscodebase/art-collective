<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	async function signup(e: Event) {
		e.preventDefault();
		const res = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			await goto('/login');
		} else {
			const data = await res.json();
			error = data.error;
		}
	}
</script>

<h1>Sign Up</h1>

<form onsubmit={signup}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Sign Up</button>
	{#if error}<p style="color: red;">{error}</p>{/if}
</form>