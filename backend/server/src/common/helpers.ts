
import * as path from 'path'
import { promises as fs } from 'fs';
import { Blob as NodeBlob } from 'buffer';
import { Investment, Manager } from '../types/investorTypes';


export async function imageFileToBlob(filePath: string): Promise<Blob> {
    try {
        const fileBuffer = await fs.readFile(filePath);
        const nodeBlob = new NodeBlob([fileBuffer], { type: 'image/jpeg' }); // Change the MIME type as needed
        return nodeBlob as unknown as Blob;
    } catch (error:any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export const calculateEarnings = (investment: Investment, manager: Manager): number => {
    const currentDate = new Date();
  
    if (!investment.investmentDate||investment.investmentDate.getDate() === currentDate.getDate()) {
        return 0;
    }
    const differenceInDays = Math.floor((currentDate.getTime() - investment.investmentDate.getTime()) / (1000 * 60 * 60 * 24));
    const earning = (manager.percentageYield / manager.duration) * investment.amountDeposited * differenceInDays;
    return earning;
  };
export const dataURLToBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error('Invalid data URL');

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };



  

  
  