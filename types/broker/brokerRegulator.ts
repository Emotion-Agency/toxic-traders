export interface iRegulatorItem {
  name: number
  licenseNumber: string
  licenseLink?: string
}

export interface iRegulatorData {
  data: {
    regulators: iRegulatorItem[]
  }
}

export interface iRegulatorNamesData {
  data: {
    regulatorNames: string[]
  }
}
