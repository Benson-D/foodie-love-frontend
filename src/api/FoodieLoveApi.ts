import axios, { AxiosError } from "axios";
import { GetRecipes, SearchRecipes, GetSingleRecipe } from "./interface/foodieGet";
import { CreateRecipeForm, CreateRecipeResponse } from "./interface/foodieCreate";

const BASE_URL: string  = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * General data sent into axios request method
 * @interface FoodieRequest
 */ 
interface FoodieRequest {
    url: string; 
    method: string; 
    data?: CreateRecipeForm | SearchRecipes;
};

/**
 * General data sent back after request
 * @interface FoodieAxiosRequest
 */
interface FoodieAxiosRequest {
    recipes?: GetRecipes[];
    recipe?: GetSingleRecipe | CreateRecipeResponse
};


class FoodieLoveApi {
    
    static token: string;

    static async request(axiosData: FoodieRequest): Promise<FoodieAxiosRequest> {
        const { url, data } = axiosData;

        let method = axiosData.method || 'GET';
        const params = method === 'GET' ? axiosData.data : {};

        try {
            return (await axios({ url, data, params, method })).data; 
        } catch (err) {
            const recipeError = err as AxiosError; 

            console.error("API Error Get", recipeError.response);
            throw recipeError.response;
        }
    }

    /**
     * Request all recipes in database, 
     * if params are there will handle search request 
     * 
     * @param {object} params 
     * @returns {Promise<Array>} JSON
     */
    static async getRecipes(params: SearchRecipes = {}): Promise<GetRecipes[]> {
        try {
            const { data } = await axios({url: `${BASE_URL}/recipes`, params});
            return data.recipes; 
        } catch (err) {
            const recipeError = err as AxiosError; 

            console.error("API Error Get", recipeError.response);
            throw recipeError.response;
        }
    }

    /**
     * Grabs an id to return a specific recipe with all of it's data 
     * 
     * @param {string} id 
     * @returns {Promise<Array>} JSON
     */
    static async getSingleRecipe(id: string): Promise<GetSingleRecipe> {
        try {
            const { data } = await axios({ url:`${BASE_URL}/recipes/${id}`})
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
    static async createRecipe(createData: CreateRecipeForm): Promise<CreateRecipeResponse> {
        try {
            const { data } = await axios({
                url: `${BASE_URL}/recipes`, 
                data: createData,
                method: 'post'
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
    static async sendImage(file: FormData): Promise<string> {
        try {
            const { data } = await axios({
                url: `${BASE_URL}/recipes/image`, 
                data: file,
                method: 'post'
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