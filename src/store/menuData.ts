import type { Category } from "./types";

import comboMealImage from "@assets/images/comboMeal.png";
import beefBurgerImage from "@assets/images/beef-burger.webp";
import chickenBurgerImage from "@assets/images/chicken-burger.webp";
import cheeseBurgerImage from "@assets/images/cheese-burger.webp";
import veggieBurgerImage from "@assets/images/veggie-burger.webp";
import doubleBurgerImage from "@assets/images/double-burger.webp";
import spicyBurgerImage from "@assets/images/spicy-burger.webp";
import clubSandwichImage from "@assets/images/club-sandwich.webp";
import chickenWrapImage from "@assets/images/chicken-wrap.webp";
import tunaSandwichImage from "@assets/images/tuna-sandwich.webp";
import falafelWrapImage from "@assets/images/falafel-wrap.webp";
import turkeyMeltImage from "@assets/images/turkey-melt.webp";
import fishSandwichImage from "@assets/images/fish-sandwich.webp";
import frenchFriesImage from "@assets/images/fries.webp";
import onionRingsImage from "@assets/images/onion-rings.webp";
import chickenWingsImage from "@assets/images/chicken-wings.webp";
import garlicBreadImage from "@assets/images/garlic-bread.webp";
import mozzarellaSticksImage from "@assets/images/mozzarella-sticks.webp";
import cheeseNachosImage from "@assets/images/cheese-nachos.webp";
import caesarSaladImage from "@assets/images/caesar-salad.webp";
import chickenSaladImage from "@assets/images/chicken-salad.webp";
import greekSaladImage from "@assets/images/greek-salad.webp";
import gardenSaladImage from "@assets/images/garden-salad.webp";
import avocadoSaladImage from "@assets/images/avocado-salad.webp";
import tunaSaladImage from "@assets/images/tuna-salad.webp";
import cocaColaImage from "@assets/images/coca-cola.webp";
import spriteSodaImage from "@assets/images/sprite-soda.webp";
import icedTeaImage from "@assets/images/iced-tea.webp";
import lemonadeTwistImage from "@assets/images/lemonade.webp";
import orangeJuiceImage from "@assets/images/orange-juice.webp";
import vanillaShakeImage from "@assets/images/vanilla-shake.webp";
import chocolateCakeImage from "@assets/images/chocolate-cake.webp";
import applePieImage from "@assets/images/apple-pie.webp";
import iceCreamImage from "@assets/images/ice-cream.webp";
import caramelTartImage from "@assets/images/caramel-tart.webp";
import brownieDelightImage from "@assets/images/brownie-delight.webp";
import moltenCakeImage from "@assets/images/molten-cake.webp";

export const menuData: { categories: Category[] } = {
  categories: [
    {
      id: "burgers",
      name: "Burgers",
      nameArabic: "برغر",
      image: comboMealImage,
      backgroundColor: "#97DE00",
      items: [
        {
          id: "beef_burger",
          name: "Beef Burger",
          nameArabic: "برغر لحم",
          calories: 450,
          price: 5.5,
          image: beefBurgerImage,
        },
        {
          id: "chicken_burger",
          name: "Chicken Burger",
          nameArabic: "برغر دجاج",
          calories: 400,
          price: 5,
          image: chickenBurgerImage,
        },
        {
          id: "cheese_burger",
          name: "Cheese Burger",
          nameArabic: "برغر جبن",
          calories: 500,
          price: 6,
          image: cheeseBurgerImage,
        },
        {
          id: "veggie_burger",
          name: "Veggie Burger",
          nameArabic: "برغر خضار",
          calories: 350,
          price: 4.5,
          image: veggieBurgerImage,
        },
        {
          id: "double_burger",
          name: "Double Burger",
          nameArabic: "برغر دبل",
          calories: 600,
          price: 7,
          image: doubleBurgerImage,
        },
        {
          id: "spicy_burger",
          name: "Spicy Burger",
          nameArabic: "برغر حار",
          calories: 420,
          price: 6.5,
          image: spicyBurgerImage,
        },
      ],
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      nameArabic: "ساندويتشات",
      image: clubSandwichImage,
      backgroundColor: "#000000",
      items: [
        {
          id: "club_sandwich",
          name: "Club Sandwich",
          nameArabic: "ساندويتش كلوب",
          calories: 300,
          price: 4,
          image: clubSandwichImage,
        },
        {
          id: "chicken_wrap",
          name: "Chicken Wrap",
          nameArabic: "راب دجاج",
          calories: 350,
          price: 4.5,
          image: chickenWrapImage,
        },
        {
          id: "tuna_sandwich",
          name: "Tuna Sandwich",
          nameArabic: "ساندويتش تونة",
          calories: 280,
          price: 3.8,
          image: tunaSandwichImage,
        },
        {
          id: "falafel_wrap",
          name: "Falafel Wrap",
          nameArabic: "راب فلافل",
          calories: 270,
          price: 3.6,
          image: falafelWrapImage,
        },
        {
          id: "turkey_melt",
          name: "Turkey Melt",
          nameArabic: "تركي مذاب",
          calories: 380,
          price: 5.5,
          image: turkeyMeltImage,
        },
        {
          id: "fish_sandwich",
          name: "Fish Sandwich",
          nameArabic: "ساندويتش سمك",
          calories: 330,
          price: 5,
          image: fishSandwichImage,
        },
      ],
    },
    {
      id: "appetizers",
      name: "Appetizers",
      nameArabic: "مقبلات",
      image: frenchFriesImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "french_fries",
          name: "French Fries",
          nameArabic: "بطاطا مقلية",
          calories: 200,
          price: 2.5,
          image: frenchFriesImage,
        },
        {
          id: "onion_rings",
          name: "Onion Rings",
          nameArabic: "حلقات بصل",
          calories: 220,
          price: 3,
          image: onionRingsImage,
        },
        {
          id: "chicken_wings",
          name: "Chicken Wings",
          nameArabic: "أجنحة دجاج",
          calories: 450,
          price: 4.5,
          image: chickenWingsImage,
        },
        {
          id: "garlic_bread",
          name: "Garlic Bread",
          nameArabic: "خبز بالثوم",
          calories: 180,
          price: 2.2,
          image: garlicBreadImage,
        },
        {
          id: "mozzarella_sticks",
          name: "Mozzarella Sticks",
          nameArabic: "أصابع موزاريلا",
          calories: 310,
          price: 3.5,
          image: mozzarellaSticksImage,
        },
        {
          id: "cheese_nachos",
          name: "Cheese Nachos",
          nameArabic: "ناتشوز بالجبن",
          calories: 320,
          price: 3.8,
          image: cheeseNachosImage,
        },
      ],
    },
    {
      id: "salads",
      name: "Salads",
      nameArabic: "سلطات",
      image: caesarSaladImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "caesar_salad",
          name: "Caesar Salad",
          nameArabic: "سلطة سيزر",
          calories: 150,
          price: 4,
          image: caesarSaladImage,
        },
        {
          id: "chicken_salad",
          name: "Chicken Salad",
          nameArabic: "سلطة دجاج",
          calories: 200,
          price: 4.5,
          image: chickenSaladImage,
        },
        {
          id: "greek_salad",
          name: "Greek Salad",
          nameArabic: "سلطة يونانية",
          calories: 170,
          price: 4.2,
          image: greekSaladImage,
        },
        {
          id: "garden_salad",
          name: "Garden Salad",
          nameArabic: "سلطة حدائق",
          calories: 130,
          price: 3.5,
          image: gardenSaladImage,
        },
        {
          id: "avocado_salad",
          name: "Avocado Salad",
          nameArabic: "سلطة أفوكادو",
          calories: 180,
          price: 4.8,
          image: avocadoSaladImage,
        },
        {
          id: "tuna_salad",
          name: "Tuna Salad",
          nameArabic: "سلطة تونة",
          calories: 160,
          price: 4,
          image: tunaSaladImage,
        },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      nameArabic: "مشروبات",
      image: cocaColaImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "coca_cola",
          name: "Coca Cola",
          nameArabic: "كوكا كولا",
          calories: 140,
          price: 1.5,
          image: cocaColaImage,
        },
        {
          id: "sprite_soda",
          name: "Sprite Soda",
          nameArabic: "سبرايت صودا",
          calories: 130,
          price: 1.5,
          image: spriteSodaImage,
        },
        {
          id: "iced_tea",
          name: "Iced Tea",
          nameArabic: "شاي مثلج",
          calories: 120,
          price: 1.8,
          image: icedTeaImage,
        },
        {
          id: "lemonade_twist",
          name: "Lemonade Twist",
          nameArabic: "عصير ليمون",
          calories: 100,
          price: 2,
          image: lemonadeTwistImage,
        },
        {
          id: "orange_juice",
          name: "Orange Juice",
          nameArabic: "عصير برتقال",
          calories: 110,
          price: 2,
          image: orangeJuiceImage,
        },
        {
          id: "vanilla_shake",
          name: "Vanilla Shake",
          nameArabic: "شيك فانيليا",
          calories: 220,
          price: 2.5,
          image: vanillaShakeImage,
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      nameArabic: "حلويات",
      image: chocolateCakeImage,
      backgroundColor: "#DDDDDD",
      items: [
        {
          id: "chocolate_cake",
          name: "Chocolate Cake",
          nameArabic: "كعكة شوكولاتة",
          calories: 250,
          price: 3.5,
          image: chocolateCakeImage,
        },
        {
          id: "apple_pie",
          name: "Apple Pie",
          nameArabic: "فطيرة تفاح",
          calories: 220,
          price: 3,
          image: applePieImage,
        },
        {
          id: "ice_cream",
          name: "Ice Cream",
          nameArabic: "آيس كريم",
          calories: 180,
          price: 2.8,
          image: iceCreamImage,
        },
        {
          id: "caramel_tart",
          name: "Caramel Tart",
          nameArabic: "تارت كراميل",
          calories: 210,
          price: 3.2,
          image: caramelTartImage,
        },
        {
          id: "brownie_delight",
          name: "Brownie Delight",
          nameArabic: "برواني ديلايت",
          calories: 300,
          price: 3,
          image: brownieDelightImage,
        },
        {
          id: "molten_cake",
          name: "Molten Cake",
          nameArabic: "كعكة مولتن",
          calories: 330,
          price: 3.5,
          image: moltenCakeImage,
        },
      ],
    },
  ],
};
