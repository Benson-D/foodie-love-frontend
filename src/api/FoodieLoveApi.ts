import axios, { AxiosError } from "axios";
import { GetRecipes, SearchRecipes } from "../interface";

/**
 * Main Class for handling various Foodie api calls
 */
class FoodieLoveApi {
  /**
   * Request all recipes in database,
   * if params are there will handle search request
   *
   * @param {object} params
   * @returns {Promise<Array>} JSON
   */
  public static async getRecipes(
    params: SearchRecipes = { skip: 0 },
  ): Promise<GetRecipes[]> {
    try {
      const { data } = await axios({
        url: `http://localhost:3001/recipes`,
        params,
        withCredentials: true,
      });

      return data.recipes;
    } catch (err) {
      const recipeError = err as AxiosError;
      console.error("API Error Get", recipeError.response);
      throw recipeError.response;
    }
  }
}

export default FoodieLoveApi;
