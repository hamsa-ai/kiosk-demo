import type { Category } from "./types";

// Mock menu data for demonstration purposes
export const menuData: { categories: Category[] } = {
	categories: [
		{
			id: "combo_meal",
			name: "Combo Meal",
			type: "combo",
			steps: [
				{
					id: "sandwich",
					name: "Sandwich",
					prompt: "What sandwich would you like for your combo?",
				},
				{
					id: "fries",
					name: "Fries",
					prompt: "What type of fries would you like?",
				},
				{
					id: "drink",
					name: "Cold Drink",
					prompt: "What cold drink would you like with your combo?",
				},
			],
			items: [
				{
					id: "burger_combo",
					name: "Burger Combo",
					price: 8.99,
					description:
						"Your choice of sandwich with fries and a drink",
				},
				{
					id: "chicken_combo",
					name: "Chicken Combo",
					price: 9.49,
					description:
						"Your choice of chicken item with fries and a drink",
				},
			],
		},
		{
			id: "smoked_french_sandwiches",
			name: "Smoked French Sandwiches",
			type: "regular",
			items: [
				{
					id: "classic_burger",
					name: "Classic Burger",
					price: 5.99,
					description:
						"Juicy beef patty with fresh lettuce, tomato, and our special sauce",
				},
				{
					id: "grilled_chicken_sandwich",
					name: "Grilled Chicken Sandwich",
					price: 6.49,
					description:
						"Tender grilled chicken breast with avocado and honey mustard",
				},
			],
		},
		{
			id: "chicken",
			name: "Chicken",
			type: "regular",
			items: [
				{
					id: "crispy_chicken_tenders",
					name: "Crispy Chicken Tenders",
					price: 5.99,
					description:
						"Crispy breaded chicken tenders, served with your choice of sauce",
				},
				{
					id: "spicy_chicken_wings",
					name: "Spicy Chicken Wings",
					price: 7.99,
					description:
						"Crispy chicken wings tossed in our signature spicy sauce",
				},
			],
		},
		{
			id: "drinks",
			name: "Drinks",
			type: "regular",
			items: [
				{
					id: "cola",
					name: "Cola",
					price: 1.99,
					description: "Classic cola flavor",
				},
				{
					id: "lemon_lime_soda",
					name: "Lemon-Lime Soda",
					price: 1.99,
					description: "Crisp and refreshing lemon-lime flavor",
				},
			],
		},
		{
			id: "fries",
			name: "Fries",
			type: "regular",
			items: [
				{
					id: "regular_fries",
					name: "Regular Fries",
					price: 2.49,
					description: "Crispy golden fries",
				},
				{
					id: "curly_fries",
					name: "Curly Fries",
					price: 2.99,
					description: "Seasoned curly fries",
				},
			],
		},
		{
			id: "sauce",
			name: "Sauce",
			type: "regular",
			items: [
				{
					id: "ketchup",
					name: "Ketchup",
					price: 0.25,
					description: "Classic tomato ketchup",
				},
				{
					id: "mayo",
					name: "Mayonnaise",
					price: 0.25,
					description: "Creamy mayonnaise",
				},
			],
		},
		{
			id: "sides",
			name: "Sides",
			type: "regular",
			items: [
				{
					id: "onion_rings",
					name: "Onion Rings",
					price: 2.49,
					description: "Crispy onion rings served with dipping sauce",
				},
				{
					id: "mozzarella_sticks",
					name: "Mozzarella Sticks",
					price: 3.99,
					description: "Fried mozzarella cheese sticks with marinara",
				},
			],
		},
		{
			id: "desserts",
			name: "Desserts",
			type: "regular",
			items: [
				{
					id: "chocolate_cake",
					name: "Chocolate Cake",
					price: 4.49,
					description: "Rich and moist chocolate cake",
				},
				{
					id: "ice_cream_sundae",
					name: "Ice Cream Sundae",
					price: 3.99,
					description:
						"Vanilla ice cream topped with chocolate syrup and nuts",
				},
			],
		},
	],
};
