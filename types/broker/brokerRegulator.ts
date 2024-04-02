export interface iRegulatorItem {
  name: string
  licenseNumber: number
  licenseLink: string
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
