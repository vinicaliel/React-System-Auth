// Validações de CPF, CNPJ, e-mail, nome e senha

export function onlyDigits(value: string): string {
  return (value || '').replace(/\D/g, '')
}

export function isValidEmail(email: string): boolean {
  if (!email) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidName(name: string): boolean {
  if (!name) return false
  const trimmed = name.trim()
  if (trimmed.length < 2) return false
  // Permite letras com acentos e espaços simples entre nomes
  const re = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/
  return re.test(trimmed)
}

export function isValidPassword(password: string): boolean {
  if (!password) return false
  // Pelo menos 8 caracteres, 1 maiúscula, 1 número e 1 caractere especial
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
  return re.test(password)
}

export function isValidCPF(cpf: string): boolean {
  let value = onlyDigits(cpf)
  if (value.length !== 11) return false
  if (/^(\d)\1{10}$/.test(value)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(value.charAt(i)) * (10 - i)
  let firstDigit = 11 - (sum % 11)
  if (firstDigit >= 10) firstDigit = 0
  if (firstDigit !== parseInt(value.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(value.charAt(i)) * (11 - i)
  let secondDigit = 11 - (sum % 11)
  if (secondDigit >= 10) secondDigit = 0
  return secondDigit === parseInt(value.charAt(10))
}

export function isValidCNPJ(cnpj: string): boolean {
  const value = onlyDigits(cnpj)
  if (value.length !== 14) return false
  if (/^(\d)\1{13}$/.test(value)) return false

  const calcCheckDigit = (base: string): number => {
    const weights = base.length === 12
      ? [5,4,3,2,9,8,7,6,5,4,3,2]
      : [6,5,4,3,2,9,8,7,6,5,4,3,2]
    const sum = base
      .split('')
      .reduce((acc, digit, idx) => acc + parseInt(digit) * weights[idx], 0)
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const base12 = value.slice(0, 12)
  const d1 = calcCheckDigit(base12)
  const base13 = base12 + String(d1)
  const d2 = calcCheckDigit(base13)
  return value.endsWith(`${d1}${d2}`)
}

export function hasLength(value: string, min?: number, max?: number): boolean {
  const len = (value || '').length
  if (min != null && len < min) return false
  if (max != null && len > max) return false
  return true
}

export function confirmEquals(a: string, b: string): boolean {
  return (a || '') === (b || '')
}


