<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	async function signup(e: Event) {
    e.preventDefault();
		const res = await fetch('/api/auth/signup', {
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
	<label>
		Email
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Password
		<input type="password" bind:value={password} required />
	</label>
	<button type="submit">Sign Up</button>
</form>

{#if error}
	<p style="color: red;">{error}</p>
{/if}