
/** General parts of Ingredient List needed to send in request
 * 
 */
interface GeneralList {
    amount: string;
    measurement?: string;
    ingredient: string;
};


interface IngredientItems extends GeneralList {
    id: string;
}

interface InstructionItems {
    instruction?: string;
};

export type {
    GeneralList,
    IngredientItems,
    InstructionItems
}