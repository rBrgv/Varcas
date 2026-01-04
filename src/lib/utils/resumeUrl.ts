/**
 * Gets a valid resume URL - returns URL as-is without modifications
 */
export function getResumeUrl(url: string | null | undefined): string | null {
  if (!url) return null
  // Return URL exactly as stored in database - no modifications
  return url
}

