import { useState } from "react";
import { HamsaVoiceAgent } from "@hamsa-ai/voice-agents-sdk";
import { agentTools } from "./agent-tools";

/**
 * The agent ID used for the Hamsa voice agent.
 * @constant {string}
 */
const AGENT_ID = "20664578-ba51-4362-b782-46f785344519";

/**
 * The API key used for the Hamsa voice agent.
 * @constant {string}
 */
const API_KEY = "8295c84d-195c-4057-9eb6-e9d42f923538";

/**
 * Instance of the Hamsa voice agent.
 * @constant {HamsaVoiceAgent}
 */
const agent = new HamsaVoiceAgent(API_KEY);

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
  agentId: AGENT_ID,
  voiceEnablement: true,
  tools: agentTools,
  params: {
    our_menu: `
      ### Categories and Items:

      **Sandwiches** (categoryId: sandwich)
      - Classic Burger (itemId: classic_burger)
      - Grilled Chicken Sandwich (itemId: grilled_chicken_sandwich)
      - Bacon Burger (itemId: bacon_burger)
      - BBQ Chicken Sandwich (itemId: bbq_chicken_sandwich)
      - Veggie Burger (itemId: veggie_burger)
      - Turkey Sandwich (itemId: turkey_sandwich)

      **Chicken** (categoryId: chicken)
      - Crispy Chicken Tenders (itemId: crispy_chicken_tenders)
      - Spicy Chicken Wings (itemId: spicy_chicken_wings)
      - Grilled Chicken Breast (itemId: grilled_chicken_breast)
      - BBQ Chicken Legs (itemId: bbq_chicken_legs)
      - Fried Chicken Bucket (itemId: fried_chicken_bucket)
      - Popcorn Chicken (itemId: popcorn_chicken)

      **Drinks** (categoryId: drinks)
      - Cola (itemId: cola)
      - orange Juice (itemId: orange_juice)

      **Fries** (categoryId: fries)
      - Regular Fries (itemId: regular_fries)
      - Curly Fries (itemId: curly_fries)
      - Waffle Fries (itemId: waffle_fries)
      - Sweet Potato Fries (itemId: sweet_potato_fries)
      - Loaded Fries (itemId: loaded_fries)
      - Garlic Parmesan Fries (itemId: garlic_parmesan_fries)

      **Sauce** (categoryId: sauce)
      - Ketchup (itemId: ketchup)
      - Mayonnaise (itemId: mayo)
      - BBQ Sauce (itemId: bbq_sauce)
      - Ranch Sauce (itemId: ranch_sauce)
      - Honey Mustard (itemId: honey_mustard)
      - Spicy Sriracha (itemId: spicy_sriracha)

    If the user ask about an item call the function that opens the category of the item
    `,
  },
};

/**
 * Custom hook to manage the state and functionality of the Hamsa voice agent.
 *
 * @returns {{
 *  isAgentRunning: boolean;
 *  startAgent: () => void;
 *  endAgent: () => void;
 *  restartAgent: () => void;
 * }}
 */
const useVoiceAgent = () => {
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);

  /**
   * Starts the voice agent.
   * Logs an error message if the agent fails to start.
   */
  const startAgent = (): void => {
    try {
      agent.start(agentParams);
      agent.on("transcriptionReceived", (text) => {
        console.log("User speech transcription received", text);
      });
      agent.on("answerReceived", (text) => {
        console.log("Agent answer received", text);
      });
      setIsAgentRunning(true);
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
      setIsAgentRunning(false);
      console.log("Agent paused successfully");
    } catch (error) {
      console.error("Failed to end agent:", error);
    }
  };

  /**
   * Restarts the voice agent by first ending it, then starting it again.
   * Logs errors if the agent fails to end or start.
   */
  const restartAgent = (): void => {
    endAgent();
    startAgent();
  };

  return { isAgentRunning, startAgent, endAgent, restartAgent };
};

export default useVoiceAgent;
