
  export function customError(message: string, status: number): any {
    const error: { message: string; status?: number } = new Error(message);
    error.status = status;
    return error;
  }
  

  export const formatEndDate = (date:Date) => {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };