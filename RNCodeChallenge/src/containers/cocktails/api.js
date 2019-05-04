import {apiService} from 'config/api-service';

export const getCocktails = apiService.get('/api/json/v1/1/filter.php?g=Cocktail_glass');
export const getCocktailById = apiService.getWithRouteParams('/api/json/v1/1/lookup.php');