import { createContext } from "react";

const FoodieFormContext = createContext<{formSteps: number} | null>(null);

export default FoodieFormContext;