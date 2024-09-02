export interface Category {
	id: string;
	name: string;
	type: string;
	steps?: ComboStep[];
	items: { id: string; name: string; price: number; description: string }[];
}

export interface ComboStep {
	id: string;
	name: string;
	prompt: string;
}
