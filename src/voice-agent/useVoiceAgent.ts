import { HamsaVoiceAgent } from "@hamsa-ai/voice-agents-sdk";
import { agentTools } from "./agent-tools";

/**
 * The agent ID used for the Hamsa arabic voice agent.
 * @constant {string}
 */
const ARABIC_AGENT_ID = "20664578-ba51-4362-b782-46f785344519";

/**
 * The agent ID used for the Hamsa english voice agent.
 * @constant {string}
 */

const ENGLISH_AGENT_ID = "76252fd2-a1a2-47df-9812-7067e842c228";
/**
 * The API key used for the Hamsa voice agent.
 * @constant {string}
 */
const API_KEY = "8295c84d-195c-4057-9eb6-e9d42f923538";

/**
 * Instance of the Hamsa voice agent.
 * @constant {HamsaVoiceAgent}
 */
export const agent = new HamsaVoiceAgent(API_KEY);

// TODO: WORK ON THE TYPE SAFETY OF THIS (take the types from the SDK)
interface HamsaVoiceAgentParams {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  agentId?: any;
  params?: object;
  voiceEnablement?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  tools?: any[];
}
/**
 * Parameters used to initialize the Hamsa voice agent.
 * @constant {HamsaVoiceAgentParams}
 */
const agentParams: HamsaVoiceAgentParams = {
  voiceEnablement: true,
  tools: agentTools,
  params: {
    our_menu: `
  **Burgers (برغر)** (categoryId: burgers)
  - Beef Burger (برغر لحم) (itemId: beef_burger) - 450 calories - $5.50
  - Chicken Burger (برغر دجاج) (itemId: chicken_burger) - 400 calories - $5.00
  - Cheese Burger (برغر جبن) (itemId: cheese_burger) - 500 calories - $6.00
  - Veggie Burger (برغر خضار) (itemId: veggie_burger) - 350 calories - $4.50
  - Double Burger (برغر دبل) (itemId: double_burger) - 600 calories - $7.00
  - Spicy Burger (برغر حار) (itemId: spicy_burger) - 420 calories - $6.50

  **Sandwiches (ساندويتشات)** (categoryId: sandwiches)
  - Club Sandwich (ساندويتش كلوب) (itemId: club_sandwich) - 300 calories - $4.00
  - Chicken Wrap (راب دجاج) (itemId: chicken_wrap) - 350 calories - $4.50
  - Tuna Sandwich (ساندويتش تونة) (itemId: tuna_sandwich) - 280 calories - $3.80
  - Falafel Wrap (راب فلافل) (itemId: falafel_wrap) - 270 calories - $3.60
  - Turkey Melt (تركي مذاب) (itemId: turkey_melt) - 380 calories - $5.50
  - Fish Sandwich (ساندويتش سمك) (itemId: fish_sandwich) - 330 calories - $5.00

  **Appetizers (مقبلات)** (categoryId: appetizers)
  - French Fries (بطاطا مقلية) (itemId: french_fries) - 200 calories - $2.50
  - Onion Rings (حلقات بصل) (itemId: onion_rings) - 220 calories - $3.00
  - Chicken Wings (أجنحة دجاج) (itemId: chicken_wings) - 450 calories - $4.50
  - Garlic Bread (خبز بالثوم) (itemId: garlic_bread) - 180 calories - $2.20
  - Mozzarella Sticks (أصابع موزاريلا) (itemId: mozzarella_sticks) - 310 calories - $3.50
  - Cheese Nachos (ناتشوز بالجبن) (itemId: cheese_nachos) - 320 calories - $3.80

  **Salads (سلطات)** (categoryId: salads)
  - Caesar Salad (سلطة سيزر) (itemId: caesar_salad) - 150 calories - $4.00
  - Chicken Salad (سلطة دجاج) (itemId: chicken_salad) - 200 calories - $4.50
  - Greek Salad (سلطة يونانية) (itemId: greek_salad) - 170 calories - $4.20
  - Garden Salad (سلطة حدائق) (itemId: garden_salad) - 130 calories - $3.50
  - Avocado Salad (سلطة أفوكادو) (itemId: avocado_salad) - 180 calories - $4.80
  - Tuna Salad (سلطة تونة) (itemId: tuna_salad) - 160 calories - $4.00

  **Beverages (مشروبات)** (categoryId: beverages)
  - Coca Cola (كوكا كولا) (itemId: coca_cola) - 140 calories - $1.50
  - Sprite Soda (سبرايت صودا) (itemId: sprite_soda) - 130 calories - $1.50
  - Iced Tea (شاي مثلج) (itemId: iced_tea) - 120 calories - $1.80
  - Lemonade Twist (عصير ليمون) (itemId: lemonade_twist) - 100 calories - $2.00
  - Orange Juice (عصير برتقال) (itemId: orange_juice) - 110 calories - $2.00
  - Vanilla Shake (شيك فانيليا) (itemId: vanilla_shake) - 220 calories - $2.50

  **Desserts (حلويات)** (categoryId: desserts)
  - Chocolate Cake (كعكة شوكولاتة) (itemId: chocolate_cake) - 250 calories - $3.50
  - Apple Pie (فطيرة تفاح) (itemId: apple_pie) - 220 calories - $3.00
  - Ice Cream (آيس كريم) (itemId: ice_cream) - 180 calories - $2.80
  - Caramel Tart (تارت كراميل) (itemId: caramel_tart) - 210 calories - $3.20
  - Brownie Delight (برواني ديلايت) (itemId: brownie_delight) - 300 calories - $3.00
  - Molten Cake (كعكة مولتن) (itemId: molten_cake) - 330 calories - $3.50

  If the user ask about an item call the function that opens the category of the item
`,
  },
};

/**
 * Custom hook to manage the state and functionality of the Hamsa voice agent.
 *
 * @returns {{
 *  startAgent: (language: "ar" | "en") => void;
 *  endAgent: () => void;
 * }}
 */
const useVoiceAgent = () => {
  /**
   * Starts the voice agent.
   * Logs an error message if the agent fails to start.
   */
  const startAgent = (language: "ar" | "en"): void => {
    try {
      agent.start({
        ...agentParams,
        agentId: language === "ar" ? ARABIC_AGENT_ID : ENGLISH_AGENT_ID,
      });
      agent.on("transcriptionReceived", (text) => {
        console.log("User speech transcription received", text);
      });
      agent.on("answerReceived", (text) => {
        console.log("Agent answer received", text);
      });
      console.log("Agent started successfully");
    } catch (error) {
      console.error("Failed to start agent:", error);
    }
  };

  /**
   * Ends (pauses) the voice agent.
   * Logs an error message if the agent fails to end.
   */
  const endAgent = (): void => {
    try {
      agent.end();
      console.log("Agent ended successfully");
    } catch (error) {
      console.error("Failed to end agent:", error);
    }
  };

  return { startAgent, endAgent };
};

export default useVoiceAgent;
