const emailTester =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const phoneTester = /\+?([\d|\(][\h|\(\d{3}\)|\.|\-|\d]{4,}\d)/

class Validation {
  required(validationText) {
    return str => {
      if (!str.trim()) {
        return validationText
      }
      return false
    }
  }

  // Minimum length validation
  min(min, validationText) {
    return str => {
      if (str.trim().length < min) {
        return validationText
      }
      return false
    }
  }

  // Maximum length validation
  max(max, validationText) {
    return str => {
      const length = str.trim().length
      if (length > max) {
        return validationText
      }
      return false
    }
  }

  // Email validation
  email(validationText) {
    return email => {
      if (!email) return validationText

      const emailParts = email.split('@')

      if (emailParts.length !== 2) return validationText
      const account = emailParts[0]
      const address = emailParts[1]

      if (account.length > 64) return validationText
      if (address.length > 255) return validationText

      const domainParts = address.split('.')
      if (domainParts.some(part => part.length > 63)) {
        return validationText
      }

      if (!emailTester.test(email)) {
        return validationText
      }

      return false
    }
  }

  // Phone validation
  phone(validationText) {
    return phone => {
      if (!phoneTester.test(phone)) {
        return validationText
      }
      return true
    }
  }

  // Equality check
  isEqual(value, validationText) {
    return str => {
      if (str.trim() !== value.trim()) {
        return validationText
      }
      return false
    }
  }
}

export default new Validation()
