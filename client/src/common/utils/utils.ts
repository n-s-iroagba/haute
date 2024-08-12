import { ReadableItem } from "../../../../common/compositeTypes";
import { ManagerDto } from "../../../../common/managerType";
import { CreatePromoDto } from "../../../../common/promoTypes";
import { ExtendPromoDto } from "../../../../common/promoTypes";
import { CreateWalletDto } from "../../../../common/walletTypes";


  
  export const isLargeScreen = () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    return mediaQuery.matches;
  }

  export function countUnreadItems(items:ReadableItem[]) {
    let unreadCount = 0;
    
    for (const item of items) {
      if (!item.read) {
        unreadCount++;
      }
    }
    
    return unreadCount;
  }

  export function extractErrorCode(errorMessage:string) {
    const regex = /status code (\d+)/;
    const match = errorMessage.match(regex); 
    if (match && match.length > 1) {
      return parseInt(match[1]); 
    }
    return null;
  }

  export const hasEmptyKey = (obj:CreatePromoDto|ExtendPromoDto|ManagerDto|CreateWalletDto): boolean => {
    for (const key in obj) {
      if (!key||key==='') {
        return true;
      }
    }
    return false;
  };

  export const numberWithCommas = (number: number) => {
    const str = String(number);
    let formatted = '';
    if (str.length < 4)
      return str;
  
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
      formatted = str[i] + formatted;
      if (count % 3 === 2 && i !== 0) {
        formatted = ',' + formatted;
      }
    }
  
    return formatted;
  };
  