export interface CreateWalletDto{
    identification:string
    currency:string|null
    depositMeans:string|'CRYPTOCURRENCY'
    identificationType:string|'CRYTOCURRENCY WALLET'
}
export interface WalletDto extends CreateWalletDto{
    id: number
    currency: string;
}