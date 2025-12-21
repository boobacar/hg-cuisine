const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/hgcuisine06@gmail.com'

type SendResult = { ok: true } | { ok: false; error?: string }

export async function sendForm(payload: Record<string, string>): Promise<SendResult> {
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const message = `Request failed (${res.status})`
      return { ok: false, error: message }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { ok: false, error: message }
  }
}
