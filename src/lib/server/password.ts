import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
	const salt = randomBytes(16).toString('hex');
	const buf = (await scryptAsync(password, salt, 64)) as Buffer;
	return `${buf.toString('hex')}.${salt}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	const [hashedPassword, salt] = hash.split('.');
	const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
	const buf = (await scryptAsync(password, salt, 64)) as Buffer;
	if (hashedPasswordBuf.length !== buf.length) {
		return false;
	}
	return timingSafeEqual(hashedPasswordBuf, buf);
}