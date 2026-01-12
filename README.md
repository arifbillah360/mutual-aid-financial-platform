# 7 Ensemble

## Project Overview

7 Ensemble is a comprehensive financial mutual aid platform designed to foster community support and financial growth through a unique constellation-based progression system. This project is built as a full-stack application, leveraging a Laravel backend for robust business logic, API services, and database management, coupled with a dynamic frontend utilizing React and Alpine.js for an interactive user experience.

**Key Backend Features (Laravel):**

*   **User Authentication & Authorization:** Secure user management, roles, and permissions using Laravel Sanctum, Breeze, and Spatie/Laravel-Permission. Includes 2FA support with Pragmarx/Google2FA.
*   **Admin Panel:** Powerful administrative interface built with FilamentPHP for managing users, constellations, transactions, and system settings.
*   **Payment Gateway Integration:** Support for Stripe and PayPal for processing contributions and payouts.
*   **Activity Logging:** Detailed logging of user and system activities with Spatie/Laravel-Activitylog.
*   **Database Management:** Eloquent ORM for seamless database interactions, migrations, and seeding.
*   **API Development:** RESTful API endpoints for frontend-backend communication.
*   **Backup Solutions:** Integrated backup capabilities with Spatie/Laravel-Backup.

**Key Frontend Features (React & Alpine.js with Tailwind CSS):**

*   **Public Pages:** Engaging landing page, mission statement, and detailed explanation of the "7 Tours" progression system.
*   **User Dashboard:** A personalized hub for members to track their balance, view tour progress, manage payments, initiate money transfers, and monitor referral activity.
*   **Constellation Visualization:** Interactive graphical representation of a user's constellation and their direct referrals.
*   **Dynamic Forms:** User-friendly forms for registration, login, profile settings, and financial transactions.
*   **Referral System:** Displays unique referral links and QR codes for easy sharing.
*   **Responsive UI:** Crafted with Tailwind CSS to ensure a seamless experience across various devices.
*   **Interactive Elements & Animations:** Utilizes React for complex UI components and Alpine.js for lightweight reactivity and enhanced user interactions (e.g., animations, modals, toasts).

## Getting Started: Ubuntu Development Setup

This guide provides step-by-step instructions to set up the "7 Ensemble" project for local development on Ubuntu, utilizing Laravel Sail for a Docker-based environment.

### Prerequisites (Ubuntu)

Before you begin, ensure you have the following installed on your Ubuntu system:

*   **Docker Engine & Docker Compose:** Laravel Sail relies on Docker.
    *   Follow the official Docker documentation for [installing Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).
    *   Ensure Docker Compose (or `docker compose` CLI plugin) is also installed, as it's needed for managing multi-container Docker applications.
*   **Git:** Latest version
    ```bash
    sudo apt update
    sudo apt install git -y
    ```
*   **Node.js & npm (or Yarn):** Latest LTS version (for frontend tooling, `npm` is included with Node.js).
    *   The recommended way to install Node.js is using `nvm` (Node Version Manager).
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # Close and reopen your terminal, then:
    nvm install --lts
    nvm use --lts
    npm install -g yarn # Optional, if you prefer Yarn
    ```

### Local Development Setup

We highly recommend using **Laravel Sail** for local development, which provides a pre-configured Docker-based environment.

#### 1. Clone the Project

Open your terminal and clone the repository:

```bash
git clone YOUR_REPOSITORY_URL 7ensemble
cd 7ensemble
```
Replace `YOUR_REPOSITORY_URL` with the actual URL of your Git repository.

#### 2. Configure Environment Variables

Copy the example environment file and generate an application key:

```bash
cp .env.example .env
./vendor/bin/sail artisan key:generate
```
*Note: If `vendor/bin/sail` is not found, you might need to run `composer install` first (see step 4), or if Docker is not fully set up, install PHP and Composer locally and run `php artisan key:generate`.*

#### 3. Start Docker Containers

Navigate to your project root and start the Sail environment:

```bash
./vendor/bin/sail up -d
```
This command will build and start your Docker containers (Nginx, PHP, MySQL, Redis, Mailpit, etc.) in the background. This might take some time on the first run as Docker images are downloaded and built.

#### 4. Install Composer Dependencies

Once the containers are up and running, install the PHP dependencies using Composer via Sail:

```bash
./vendor/bin/sail composer install
```

#### 5. Install JavaScript Dependencies & Compile Frontend Assets

Install the Node.js dependencies and compile the frontend assets (React, Alpine.js, Tailwind CSS) using `npm` via Sail:

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```
**Important:** Keep the `npm run dev` command running in a separate terminal tab/window to enable hot-reloading for frontend changes during development.

#### 6. Database Migration and Seeding

Run database migrations to create tables and seed the database with initial data:

```bash
./vendor/bin/sail artisan migrate --seed
```

#### 7. Access the Application

Your application should now be accessible in your web browser:

*   **Laravel Backend (API & Admin Panel):** `http://localhost` (or `http://127.0.0.1`)
*   **Frontend (React/Alpine.js):** `http://localhost:5173` (Vite's default port, as configured in `vite.config.js`)

You can log in with the seeded user (check your database seeder for default credentials, e.g., `admin@example.com` / `password`).

#### 8. Stop the Development Environment

To stop the Sail Docker containers when you're done developing:

```bash
./vendor/bin/sail down
```

### Filament Admin Panel

The project includes FilamentPHP for the admin panel, which provides a powerful interface for managing your application's data.
*   **Access:** Typically at `/admin` (e.g., `http://localhost/admin`).
*   **Credentials:** You can use an admin user created during the seeding process (step 6), or create a new admin user:
    ```bash
    ./vendor/bin/sail artisan make:filament-user
    ```

### Development Workflow

*   **Backend Changes:** Work within the Laravel framework. All Laravel Artisan commands (`./vendor/bin/sail artisan ...`) and Composer commands (`./vendor/bin/sail composer ...`) should be executed via `sail` to ensure they run inside your Docker containers.
*   **Frontend Changes:** Edit your React `.tsx` files, Alpine.js logic in `resources/js/app.js`, and Tailwind CSS in `resources/css/app.css` and other relevant CSS files. The `npm run dev` command (running via Sail or locally) will handle recompilation and hot-reloading.
*   **New CSS Classes/Components:** If you add new Tailwind CSS classes, ensure `npm run dev` is running so Tailwind can process them and rebuild your CSS.
*   **Database Migrations:** When adding new features that require database changes, create new migrations (`./vendor/bin/sail artisan make:migration add_xyz_to_table`) and then run them (`./vendor/bin/sail artisan migrate`).

## Project Structure & Key Files

*   **`composer.json`**: Defines the PHP backend dependencies (Laravel, Filament, etc.).
*   **`package.json`**: Defines the JavaScript frontend dependencies (React, Alpine.js, Tailwind CSS, Vite, Axios, Chart.js).
*   **`index.html`**: The main entry point for the frontend application.
*   **`index.tsx`**: The primary React entry point for the frontend.
*   **`App.tsx`**: The root React component.
*   **`resources/js/app.js`**: Frontend JavaScript for Alpine.js initialization and global utilities.
*   **`resources/css/app.css`**: Main Tailwind CSS file.
*   **`tailwind.config.js`**: Tailwind CSS configuration.
*   **`vite.config.js`**: Vite build tool configuration for frontend assets.
*   **`app/`**: Laravel application logic (Models, Controllers, Services).
*   **`database/`**: Database migrations, seeders, and factories.
*   **`routes/`**: API and web routes for the Laravel backend.
*   **`resources/views/`**: Blade templates for Laravel (including Filament views).
*   **`components/`**: Directory for shared React components.
*   **`pages/`**: Directory for React page components (e.g., Home, Dashboard sections).
*   **`public/`**: Frontend compiled assets and static files.
*   **`storage/`**: Laravel storage directory.
*   **`tests/`**: Unit and feature tests for the backend.
*   **`docs/`**: Project documentation (API, Business Logic, Deployment, Guides).
*   **`deployment/`**: Scripts and configurations related to deployment.
*   **`.github/workflows/`**: GitHub Actions for CI/CD.

## Documentation

*   `docs/API.md`: Detailed API reference for interacting with the backend.
*   `docs/BUSINESS-LOGIC.md`: Explains the core financial and constellation progression logic.
*   `docs/SERVER-SETUP.md`: Guide for setting up a production server environment.
*   `docs/DEPLOYMENT.md`: Instructions for deploying the application.
*   `docs/ADMIN-GUIDE.md`: Manual for administrators using the Filament panel.
*   `docs/USER-GUIDE.md`: Guide for end-users on how to use the platform.
*   `deployment-checklist.md`: A checklist for ensuring a smooth deployment.

## Contributing

(Section on contributing guidelines, code of conduct, etc.)

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
