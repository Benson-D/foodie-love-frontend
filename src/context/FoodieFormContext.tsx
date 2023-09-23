import { createContext } from "react";

const FoodieFormContext = createContext<{ step: number } | null>(null);

export default FoodieFormContext;
