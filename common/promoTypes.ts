export interface CreatePromoDto{
    startDate: Date,
    bonusPercent:number,
    endDate:Date,
  }

  export type ExtendPromoDto = {
    id:  number,
    days: number,
} 

export interface PromoDto {
    id:number
    startDate: string,
    bonusPercent:number,
    endDate:string,
}
