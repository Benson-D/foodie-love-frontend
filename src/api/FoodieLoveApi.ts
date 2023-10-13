import axios, { AxiosError } from "axios";
import {
  GetRecipes,
  SearchRecipes,
  GetRecipe,
  CreateRecipe,
  CreatedRecipe,
} from "../interface";

const BASE_URL: string = "http://localhost:3001";

/**
 * General data sent into axios request method
 * @interface FoodieRequest
 */
interface FoodieRequest {
  endpoint: string;
  method?: string;
  data?: CreateRecipe | SearchRecipes;
  credentials?: boolean;
}

/**
 * General data sent back after request
 * @interface FoodieAxiosRequest
 */
interface FoodieAxiosRequest {
  data(data: any): { payload: any; type: "App/setAuthUser" };
  recipes: GetRecipes[];
  recipe: GetRecipe | CreatedRecipe;
}

/**
 * Main Class for handling various Foodie api calls
 */
class FoodieLoveApi {
  static token: string;

  public static async request(
    axiosData: FoodieRequest,
  ): Promise<FoodieAxiosRequest> {
    const { endpoint, data, credentials } = axiosData;

    const url = `${BASE_URL}/${endpoint}`;
    let method = axiosData.method || "GET";
    const params = method === "GET" ? axiosData.data : {};
    const withCredentials = !credentials ? false : true;

    try {
      return (await axios({ url, data, params, method, withCredentials })).data;
    } catch (err) {
      const recipeError = err as AxiosError;

      console.error("API Error", recipeError.response);
      throw recipeError.response;
    }
  }

  public static async getAuthUser() {
    const response = await this.request({
      endpoint: "user/auth/user",
      credentials: true,
    });

    return response;
  }

  public static async logOut() {
    const response = await this.request({
      endpoint: "auth/logout",
      credentials: true,
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
  ): Promise<GetRecipes[]> {
    const res = await this.request({
      endpoint: `recipes`,
      data: params,
      credentials: true,
    });
    return res.recipes;
  }

  /**
   * Grabs an id to return a specific recipe with all of it's data
   *
   * @param {string} id
   * @returns {Promise<Array>} JSON
   */
  public static async getSingleRecipe(id: string): Promise<GetRecipe> {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/recipes/${id}`,
        withCredentials: true,
      });

      return data.recipe;
    } catch (err) {
      const recipeError = err as AxiosError;

      console.error("API Error Get", recipeError.response);
      throw recipeError.response;
    }
  }

  /**
   * Grabs data and sends a post request to create a new recipe
   *
   * @param {object} createData
   * @returns {Promise<Array>} JSON
   */
  public static async createRecipe(
    createData: CreateRecipe,
  ): Promise<CreatedRecipe> {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/recipes`,
        data: createData,
        method: "post",
        withCredentials: true,
      });

      return data.recipe;
    } catch (err) {
      const recipeError = err as AxiosError;

      console.error("API Error Get", recipeError.response);
      throw recipeError.response;
    }
  }

  /**
   * Takes in the form data instance uploads a file image to aws,
   * returns url string
   * @param file
   * @returns
   */
  public static async sendImage(file: FormData): Promise<string> {
    try {
      const { data } = await axios({
        url: `recipes/image`,
        data: file,
        method: "post",
        withCredentials: true,
      });

      return data.url;
    } catch (err) {
      const recipeError = err as AxiosError;

      console.error("API Error Get", recipeError.response);
      throw recipeError.response;
    }
  }
}

export default FoodieLoveApi;
