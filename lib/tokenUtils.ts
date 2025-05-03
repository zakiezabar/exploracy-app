import crypto from 'crypto';

export function generateInvitationToken(length: number = 32): string {
  // Generate a random buffer of bytes
  const buffer = crypto.randomBytes(length);
  
  // Convert it to a URL-safe base64 string
  const token = buffer.toString('base64url');
  
  return token;
}