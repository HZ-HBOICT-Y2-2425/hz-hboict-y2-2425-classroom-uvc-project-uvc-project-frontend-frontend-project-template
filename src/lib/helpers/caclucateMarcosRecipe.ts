import axios from 'axios';
import { z } from 'zod';

export interface IIngredient {
	name: string;
	amount: number;
	is_meat?: string;
	ingredient_code?: string;
}

export const marcosSchema = z.array(
	z.object({
		name: z.string(),
		nutrient_value: z.number(),
		unit_name: z.string()
	})
);

export async function calculateMarcosForARecipe(ingredients: IIngredient[]): Promise<{
	total_calories: number;
	total_protein: number;
	total_carbs: number;
	total_fats: number;
}> {
	const transcript = new Map<string, number>([
		['Energy', 0],
		['Protein', 0],
		['Carbohydrate, by difference', 0],
		['Total lipid (fat)', 0]
	]);

	for (const ingredient of ingredients) {
		await axios
			.get('/nutri/getNutritions/ByCode/' + ingredient.ingredient_code)
			.then((response) => {
				//console.log("code: ",ingredient.ingredient_code)
				//console.log("data: ",response.data)
				const parsed = marcosSchema.safeParse(response.data);
				if (!parsed.success) {
					console.log(parsed.error);
					return;
				}
				parsed.data.forEach((macro) => {
					if (transcript.has(macro.name)) {
						let previous = transcript.get(macro.name) ?? 0;
						transcript.set(macro.name, previous + macro.nutrient_value * (ingredient.amount / 100));
					}
				});
			});
	}
	return {
		total_calories: transcript.get('Energy') ?? 0,
		total_protein: transcript.get('Protein') ?? 0,
		total_carbs: transcript.get('Carbohydrate, by difference') ?? 0,
		total_fats: transcript.get('Total lipid (fat)') ?? 0
	};
}
