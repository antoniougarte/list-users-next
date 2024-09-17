
export interface IRandomPersonResult {
  results: IRandomPersonData[]
}

export interface IRandomPersonData {
  gender: string
  name: IName
  email: string
  login: {
    username: string
  }
  picture: IPicture
}

interface IName {
  title: string
  first: string
  last: string
}

interface IPicture {
  large: string
  medium: string
}

export interface IPerson {
  gender: string
  fullName: string
  username: string
  email: string
  picture: IPicture
}