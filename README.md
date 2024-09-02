# **Voice-Controlled Kiosk Demo**

This project serves as a demo for integrating the Hamsa AI Voice Agent into a food ordering kiosk. It allows users to interact with a voice-controlled kiosk that guides them through the process of selecting and ordering food items, including combo meals and non-combo items.

## **Table of Contents**

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [Project Structure](#project-structure)
-   [Usage](#usage)
-   [Available Scripts](#available-scripts)
-   [Contributing](#contributing)
-   [License](#license)

## **Project Overview**

This is a voice-controlled food ordering kiosk demo, built with React, Zustand, and Vite. It showcases the capabilities of the Hamsa AI Voice Agent in guiding users through a dynamic and interactive food ordering experience.

## **Features**

-   **Voice-Controlled Interaction**: Navigate the menu and place orders using voice commands.
-   **Real-Time UI Updates**: The UI updates instantly as selections are made.
-   **Combo Meal Management**: Step-by-step guidance through combo meal selections.
-   **Order Summary and Completion**: View a summary of the order and finalize it easily.

## **Tech Stack**

-   **Frontend**: React, Zustand
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **State Management**: Zustand

## **Installation**

To set up the project locally, follow these steps:

1. **Clone the repository:**

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Start the development server:**

    ```bash
    yarn dev
    ```

4. **Open the app:**

    Visit [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## **Project Structure**

```bash
/your-project-root
├── /public
│   └── vite.svg
├── /src
│   ├── /assets
│   ├── /components
│   ├── /hooks
│   ├── /pages
│   ├── /store
│   │   ├── README.md
│   │   ├── initialState.ts
│   │   ├── kioskStore.ts
│   │   ├── menuData.ts
│   │   ├── /slices
│   │   │   ├── categorySlice.ts
│   │   │   ├── comboSlice.ts
│   │   │   └── orderSlice.ts
│   │   └── types.ts
│   ├── /__mocks__
│   │   └── zustand.ts
│   ├── /__tests__
│   ├── App.tsx
│   ├── main.tsx
│   └── index.html
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md
```

## **Usage**

### **Starting the Demo**

1. **Start the Demo**: Click the "Start Demo" button on the main screen.
2. **Category Selection**: Use voice commands or clicks to select a menu category.
3. **Combo Meal Process**: Follow voice guidance to select items for a combo meal.
4. **Order Summary**: Review the order summary and complete the order.

### **Customizing Menu Data**

-   The menu data is located in the `menuData.ts` file within the `/src/store` directory. Modify this file to change the menu categories, items, and combo steps.

## **Available Scripts**

Here are the scripts you can run using `yarn`:

-   **`yarn dev`**: Starts the development server.
-   **`yarn build`**: Builds the app for production.
-   **`yarn preview`**: Previews the production build locally.
-   **`yarn format`**: Formats the codebase using Biome.
-   **`yarn lint`**: Lints the codebase using Biome.
-   **`yarn commit`**: Runs Commitizen for generating commit messages.
-   **`yarn release`**: Runs the release script.

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch and submit a pull request.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
