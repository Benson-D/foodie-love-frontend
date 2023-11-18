import axios, { AxiosError } from "axios";
import { GetRecipes, SearchRecipes } from "../interface";

const BASE_URL: string = "http://localhost:3001";

/**
 * Main Class for handling various Foodie api calls
 */
class FoodieLoveApi {
  public static async getAuthUser() {
    const response = await axios({
      url: "http://localhost:3001/auth/user",
      withCredentials: true,
    });

    return response;
  }

  /**
   * Request all recipes in database,
   * if params are there will handle search request
   *
   * @param {object} params
   * @returns {Promise<Array>} JSON
   */
  public static async getRecipes(
    params: SearchRecipes = {
      skip: 0,
    },
    token: string,
  ): Promise<GetRecipes[]> {
    try {
      const { data } = await axios({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/recipes`,
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
