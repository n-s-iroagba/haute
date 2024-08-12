import { getData } from "../../../common/utils/apiUtils";
import { getAvailableCurrenciesUrl } from "../../../constants/constants";


export const getAvailableWallets = async () =>{
    try {
      const response = await getData(getAvailableCurrenciesUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching currency data:', error);
      return [];
    }
}