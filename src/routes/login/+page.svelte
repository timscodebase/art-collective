<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$lib/stores/session';

	let email = '';
	let password = '';
	let error = '';

	async function login(e: Event) {
    e.preventDefault(); 
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			const userSession = await res.json();
			$session = userSession;
			await goto('/galleries');
		} else {
			const data = await res.json();
			error = data.error;
		}
	}
</script>

<h1>Login</h1>

<form onsubmit={login}>
	<label>
		Email
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Password
		<input type="password" bind:value={password} required />
	</label>
	<button type="submit">Login</button>
</form>

{#if error}
	<p style="color: red;">{error}</p>
{/if}