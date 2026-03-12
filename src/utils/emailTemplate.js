export function fillTemplate(template, vars) {
  let result = template
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replaceAll(`{{${key}}}`, value || '')
  })
  return result
}

export function buildMailtoLink(email, subject, body) {
  const params = new URLSearchParams({
    subject,
    body
  })
  // URLSearchParams uses + for spaces, but mailto needs %20
  const encoded = params.toString().replace(/\+/g, '%20')
  return `mailto:${email}?${encoded}`
}
