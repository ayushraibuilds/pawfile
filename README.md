# PAWFILE - The Ultimate Pet Management Dashboard

> Your pet's entire life, organized in one beautiful place.

PAWFILE is a comprehensive web application designed to help pet owners manage every aspect of their best friend's life. From health records and smart reminders to a dedicated pet portfolio and emergency information, PAWFILE keeps everything you need right at your fingertips.

## 🐾 Key Features

*   **Health Vault:** Securely store and track your pet's medical history, vaccinations, and vet visits.
*   **Smart Reminders:** Never miss a pill, walk, or grooming appointment with customizable alerts.
*   **Food Brain:** Track diet plans, monitor weight, and manage feeding schedules.
*   **Pet Map:** Discover pet-friendly parks, vets, and emergency clinics near you (powered by Leaflet).
*   **Emergency Card:** Instantly access critical information in case of an emergency.
*   **Pawfolio & Rainbow Bridge:** Document your pet's life journey and memorialize past companions.
*   **Pet Sitter Network:** Organize and share care instructions with your trusted pet sitters.
*   **Secure Authentication:** Keep your pet's data safe with secure login powered by Supabase.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Backend / Database:** [Supabase](https://supabase.com/)
*   **Maps:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Supabase project (for database and authentication)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pawfile.git
    cd pawfile
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Environment Setup:
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Database Setup:
    Run the SQL commands provided in `supabase_schema.sql` in your Supabase SQL editor to create the necessary tables.

5.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  Open your browser and navigate to `http://localhost:5173`.

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
