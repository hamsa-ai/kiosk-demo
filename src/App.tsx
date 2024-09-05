import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import "unfonts.css";
import "./store/kioskStore";

import { HamsaVoiceAgent } from "@hamsa-ai/voice-agents-sdk";
import { agentTools } from "./voice-agent/agent-tools";

const AGENT_ID = "20664578-ba51-4362-b782-46f785344519";
const agent = new HamsaVoiceAgent("8295c84d-195c-4057-9eb6-e9d42f923538");

const agentParams = {
	agentId: AGENT_ID,
	voiceEnablement: true,
	tools: agentTools.slice(0, 4),
	params: {
		our_menu: `

### Categories and Items:

**Combo Meal** (categoryId: combo_meal)
- No items listed

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
- Lemon-Lime Soda (itemId: lemon_lime_soda)

**Fries** (categoryId: fries)
- Regular Fries (itemId: regular_fries)
- Curly Fries (itemId: curly_fries)
- Waffle Fries (itemId: waffle_fries)
- Sweet Potato Fries (itemId: sweet_potato_fries)
- Loaded Fries (itemId: loaded_fries)
- Garlic Parmesan Fries (itemId: garlic_parmesan_fries)

**Sauce** (itemId: sauce)
- Ketchup (itemId: ketchup)
- Mayonnaise (itemId: mayo)
- BBQ Sauce (itemId: bbq_sauce)
- Ranch Sauce (itemId: ranch_sauce)
- Honey Mustard (itemId: honey_mustard)
- Spicy Sriracha (itemId: spicy_sriracha)
`,
	},
};

function App() {
	const [isAgentRunning, setIsAgentRunning] = useState(false);

	const handleStartAgent = () => {
		try {
			agent.start(agentParams);
			setIsAgentRunning(true);
			console.log("Agent started successfully");
		} catch (error) {
			console.error("Failed to start agent:", error);
		}
	};

	const handleEndAgent = () => {
		try {
			agent.end();
			setIsAgentRunning(false);
			console.log("Agent paused successfully");
		} catch (error) {
			console.error("Failed to end agent:", error);
		}
	};

	return (
		<>
			<MainLayout />
			<div className='flex justify-center items-center gap-6'>
				<button
					onClick={handleStartAgent}
					disabled={isAgentRunning}
					className={isAgentRunning ? "disabled-button" : ""}
				>
					Start Agent
				</button>
				<button
					onClick={handleEndAgent}
					disabled={!isAgentRunning}
					className={!isAgentRunning ? "disabled-button" : ""}
				>
					Pause Agent
				</button>
			</div>
		</>
	);
}

export default App;
