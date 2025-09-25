// Máscaras de entrada para CPF e Telefone (Brasil)

export function maskCPF(value: string): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const parts: string[] = []
  if (digits.length > 0) parts.push(digits.substring(0, 3))
  if (digits.length >= 4) parts.push(digits.substring(3, 6))
  if (digits.length >= 7) parts.push(digits.substring(6, 9))
  const rest = digits.substring(9, 11)

  let masked = ''
  if (parts.length > 0) masked = parts[0]
  if (parts.length > 1) masked += `.${parts[1]}`
  if (parts.length > 2) masked += `.${parts[2]}`
  if (rest) masked += `-${rest}`
  return masked
}

// Máscara de CNPJ: 00.000.000/0000-00
export function maskCNPJ(value: string): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 14)
  const p1 = digits.slice(0, 2)
  const p2 = digits.slice(2, 5)
  const p3 = digits.slice(5, 8)
  const p4 = digits.slice(8, 12)
  const p5 = digits.slice(12, 14)

  let masked = ''
  if (p1) masked = p1
  if (p2) masked += `.${p2}`
  if (p3) masked += `.${p3}`
  if (p4) masked += `/${p4}`
  if (p5) masked += `-${p5}`
  return masked
}

// Formato alvo: (xx) xx xxxxx-xxxx para até 11 dígitos
// Mantém formato progressivo enquanto digita
export function maskPhoneBR(value: string): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const len = digits.length
  if (len === 0) return ''

  // (xx
  if (len <= 2) return `(${digits}`
  // (xx) 
  if (len === 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  // (xx) xx
  if (len <= 4) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  // (xx) xx x
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 4)} ${digits.slice(4)}`
  // (xx) xx xxxx
  if (len <= 9) return `(${digits.slice(0, 2)}) ${digits.slice(2, 4)} ${digits.slice(4, 9)}${len > 9 ? '-' : ''}`
  // (xx) xx xxxxx-xxxx
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 4)} ${digits.slice(4, 9)}-${digits.slice(9, 13)}`
}


