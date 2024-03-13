interface Auth {
  children: React.ReactNode
  signIn?: () => void
  signOut?: () => void
  createAccount?: () => void
  email?: string
  password?: string
  setEmail?: React.Dispatch<React.SetStateAction<string>>
  setPassword?: React.Dispatch<React.SetStateAction<string>>
}
interface Children {
  children: React.ReactNode
}


//@env types
declare module '@env' {
  export const API_URL: string;
  export const NEXT_PUBLIC_URL_S3: string;
  export const HERE_API_KEY: string;
  export const SOCKET_URL: string;

}
