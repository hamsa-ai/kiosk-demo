import type { Category } from "./types";
import comboMealImage from "@assets/images/comboMeal.png";

// TODO: UPDATE ALL THE IMAGES BELOW
import sandwichImage from "@assets/images/sandwich.png";
import chickenImage from "@assets/images/chicken.png";
import drinksImage from "@assets/images/drinks.png";
import friesImage from "@assets/images/fries.png";
import sauceImage from "@assets/images/sauce.png";
// import burgerComboImage from "@assets/images/burgerCombo.png";
// import chickenComboImage from "@assets/images/chickenCombo.png";
// import classicBurgerImage from "@assets/images/classicBurger.png";
// import grilledChickenImage from "@assets/images/grilledChicken.png";
// import crispyTendersImage from "@assets/images/crispyTenders.png";
// import spicyWingsImage from "@assets/images/spicyWings.png";
// import colaImage from "@assets/images/cola.png";
// import regularFriesImage from "@assets/images/regularFries.png";
// import curlyFriesImage from "@assets/images/curlyFries.png";
// import ketchupImage from "@assets/images/ketchup.png";
// import mayoImage from "@assets/images/mayo.png";
import colaImage from "@assets/images/cola.png";
import orangeJuiceImage from "@assets/images/orange-juice.png";

import classicBurgerImage from "@assets/images/comboMeal.png";
import grilledChickenImage from "@assets/images/comboMeal.png";
import crispyTendersImage from "@assets/images/comboMeal.png";
import spicyWingsImage from "@assets/images/comboMeal.png";
import regularFriesImage from "@assets/images/fries.png";
import curlyFriesImage from "@assets/images/fries.png";
import ketchupImage from "@assets/images/comboMeal.png";
import mayoImage from "@assets/images/comboMeal.png";
import waffleFriesImage from "@assets/images/fries.png";
import sweetPotatoFriesImage from "@assets/images/fries.png";
import loadedFriesImage from "@assets/images/fries.png";
import garlicParmesanFriesImage from "@assets/images/fries.png";
import baconBurgerImage from "@assets/images/comboMeal.png";
import bbqChickenSandwichImage from "@assets/images/comboMeal.png";
import veggieBurgerImage from "@assets/images/comboMeal.png";
import turkeySandwichImage from "@assets/images/comboMeal.png";
import grilledChickenBreastImage from "@assets/images/comboMeal.png";
import bbqChickenLegsImage from "@assets/images/comboMeal.png";
import friedChickenBucketImage from "@assets/images/comboMeal.png";
import popcornChickenImage from "@assets/images/comboMeal.png";
import bbqSauceImage from "@assets/images/comboMeal.png";
import ranchSauceImage from "@assets/images/comboMeal.png";
import honeyMustardImage from "@assets/images/comboMeal.png";
import spicySrirachaImage from "@assets/images/comboMeal.png";

// Mock menu data for demonstration purposes
export const menuData: { categories: Category[] } = {
  categories: [
    {
      id: "combo_meal",
      name: "Combo Meal",
      type: "combo",
      image: comboMealImage,
      discount: "20% off",
      backgroundColor: "#97DE00",
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
          id: "drinks",
          name: "Cold Drink",
          prompt: "What cold drink would you like with your combo?",
        },
      ],
      items: [],
    },
    {
      id: "sandwich",
      name: "Sandwiches",
      type: "regular",
      image: sandwichImage,
      backgroundColor: "#000000",
      items: [
        {
          id: "classic_burger",
          name: "Classic Burger",
          price: 5.99,
          description:
            "Juicy beef patty with fresh lettuce, tomato, and our special sauce",
          image: classicBurgerImage,
        },
        {
          id: "grilled_chicken_sandwich",
          name: "Grilled Chicken",
          price: 6.49,
          description:
            "Tender grilled chicken breast with avocado and honey mustard",
          image: grilledChickenImage,
        },
        {
          id: "bacon_burger",
          name: "Bacon Burger",
          price: 7.49,
          description:
            "Crispy bacon with beef patty, lettuce, tomato, and cheese",
          image: baconBurgerImage,
        },
        {
          id: "bbq_chicken_sandwich",
          name: "BBQ Chicken",
          price: 6.99,
          description: "Grilled chicken with BBQ sauce, pickles, and onions",
          image: bbqChickenSandwichImage,
        },
        {
          id: "veggie_burger",
          name: "Veggie Burger",
          price: 6.99,
          description:
            "A flavorful veggie patty with lettuce, tomato, and avocado",
          image: veggieBurgerImage,
        },
        {
          id: "turkey_sandwich",
          name: "Turkey Sandwich",
          price: 5.99,
          description: "Roasted turkey breast with lettuce, tomato, and mayo",
          image: turkeySandwichImage,
        },
      ],
    },
    {
      id: "chicken",
      name: "Chicken",
      type: "regular",
      image: chickenImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "crispy_chicken_tenders",
          name: "Crispy Tenders",
          price: 5.99,
          description:
            "Crispy breaded chicken tenders, served with your choice of sauce",
          image: crispyTendersImage,
        },
        {
          id: "spicy_chicken_wings",
          name: "Spicy Wings",
          price: 7.99,
          description:
            "Crispy chicken wings tossed in our signature spicy sauce",
          image: spicyWingsImage,
        },
        {
          id: "grilled_chicken_breast",
          name: "Grilled Breast",
          price: 6.99,
          description: "Juicy grilled chicken breast with herbs and spices",
          image: grilledChickenBreastImage,
        },
        {
          id: "bbq_chicken_legs",
          name: "BBQ Legs",
          price: 8.49,
          description: "Tender chicken legs with our house BBQ sauce",
          image: bbqChickenLegsImage,
        },
        {
          id: "fried_chicken_bucket",
          name: "Fried Bucket",
          price: 12.99,
          description: "A bucket of fried chicken served with fries",
          image: friedChickenBucketImage,
        },
        {
          id: "popcorn_chicken",
          name: "Popcorn Chicken",
          price: 4.99,
          description: "Bite-sized crispy chicken pieces, perfect for snacking",
          image: popcornChickenImage,
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      type: "regular",
      image: drinksImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "cola",
          name: "Cola",
          price: 1.99,
          description: "Classic cola flavor",
          image: colaImage,
        },
        {
          id: "orange_juice",
          name: "Orange Juice",
          price: 1.99,
          description: "Refreshing and sweet orange juice",
          image: orangeJuiceImage,
        },
      ],
    },
    {
      id: "fries",
      name: "Fries",
      type: "regular",
      image: friesImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "regular_fries",
          name: "Regular Fries",
          price: 2.49,
          description: "Crispy golden fries",
          image: regularFriesImage,
        },
        {
          id: "curly_fries",
          name: "Curly Fries",
          price: 2.99,
          description: "Seasoned curly fries",
          image: curlyFriesImage,
        },
        {
          id: "waffle_fries",
          name: "Waffle Fries",
          price: 3.49,
          description: "Crispy waffle-cut fries",
          image: waffleFriesImage,
        },
        {
          id: "sweet_potato_fries",
          name: "Sweet Potato Fries",
          price: 3.99,
          description: "Sweet and crispy fries made from sweet potatoes",
          image: sweetPotatoFriesImage,
        },
        {
          id: "loaded_fries",
          name: "Loaded Fries",
          price: 4.99,
          description: "Fries topped with cheese, bacon, and sour cream",
          image: loadedFriesImage,
        },
        {
          id: "garlic_parmesan_fries",
          name: "Garlic Parmesan Fries",
          price: 3.99,
          description: "Fries tossed with garlic and parmesan cheese",
          image: garlicParmesanFriesImage,
        },
      ],
    },
    {
      id: "sauce",
      name: "Sauce",
      type: "regular",
      image: sauceImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "ketchup",
          name: "Ketchup",
          price: 0.25,
          description: "Classic tomato ketchup",
          image: ketchupImage,
        },
        {
          id: "mayo",
          name: "Mayonnaise",
          price: 0.25,
          description: "Creamy mayonnaise",
          image: mayoImage,
        },
        {
          id: "bbq_sauce",
          name: "BBQ Sauce",
          price: 0.35,
          description: "Smokey and sweet BBQ sauce",
          image: bbqSauceImage,
        },
        {
          id: "ranch_sauce",
          name: "Ranch Sauce",
          price: 0.35,
          description: "Creamy ranch dressing",
          image: ranchSauceImage,
        },
        {
          id: "honey_mustard",
          name: "Honey Mustard",
          price: 0.35,
          description: "Sweet and tangy honey mustard",
          image: honeyMustardImage,
        },
        {
          id: "spicy_sriracha",
          name: "Spicy Sriracha",
          price: 0.35,
          description: "Hot and spicy sriracha sauce",
          image: spicySrirachaImage,
        },
      ],
    },
  ],
};
