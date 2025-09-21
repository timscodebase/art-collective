// src/lib/crypto.ts

const ENCRYPTION_KEY = 'your-super-secret-key'; // In a real app, this should be managed securely!

async function getKey() {
	const enc = new TextEncoder();
	const keyData = enc.encode(ENCRYPTION_KEY);
	return await crypto.subtle.importKey(
		'raw',
		keyData,
		{ name: 'AES-GCM' },
		false,
		['encrypt', 'decrypt']
	);
}

export async function encryptMessage(message: string): Promise<string> {
	const key = await getKey();
	const enc = new TextEncoder();
	const encodedMessage = enc.encode(message);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const ciphertext = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv
		},
		key,
		encodedMessage
	);

	const buffer = new Uint8Array(iv.length + ciphertext.byteLength);
	buffer.set(iv, 0);
	buffer.set(new Uint8Array(ciphertext), iv.length);

	return btoa(String.fromCharCode(...buffer));
}

export async function decryptMessage(encryptedMessage: string): Promise<string> {
	const key = await getKey();
	const buffer = Uint8Array.from(atob(encryptedMessage), (c) => c.charCodeAt(0));
	const iv = buffer.slice(0, 12);
	const ciphertext = buffer.slice(12);

	const decrypted = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: iv
		},
		key,
		ciphertext
	);

	const dec = new TextDecoder();
	return dec.decode(decrypted);
}