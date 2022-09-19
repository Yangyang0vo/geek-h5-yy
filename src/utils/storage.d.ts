declare const TOKEN_KEY: string
declare const CHANNEL_KEY: string

type GetTokenInfo = () => void
declare const getTokenInfo: GetTokenInfo
interface TokenInfo {
  token: string
  refresh_token: string
}
declare const setTokenInfo = (tokenInfo: TokenInfo): void => {}

declare const removeTokenInfo = (): void => {}

declare const hasToken = (): boolean => {}
