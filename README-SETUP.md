# 7 Ensemble - Laravel 11 Project Setup Guide

This guide provides step-by-step instructions to set up the "7 Ensemble" Laravel 11 web application.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **PHP:** Version 8.3 or higher (as requested by the user)
*   **Composer:** Latest version
*   **Node.js & npm (or Yarn):** Latest LTS version
*   **Database Server:** MySQL, PostgreSQL, SQLite, or SQL Server (MySQL is assumed in `.env.example`)
*   **Web Server:** Nginx or Apache (Laravel Sail includes Docker for this)
*   **Docker Desktop:** (Recommended for Laravel Sail)

## 1. Install Laravel 11

If you don't have the Laravel installer, install it globally:

```bash
composer global require laravel/installer
```

Create a new Laravel project (skip if you already have the basic Laravel structure):

```bash
laravel new 7ensemble
cd 7ensemble
```

Alternatively, if you're using Composer directly:

```bash
composer create-project laravel/laravel 7ensemble
cd 7ensemble
```

## 2. Configure Environment Variables

Copy the `.env.example` file to `.env` and generate an application key:

```bash
cp .env.example .env
php artisan key:generate
```

Open the newly created `.env` file and update the database credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) and any custom variables specific to 7 Ensemble and payment gateways. **Remember to replace placeholder values like `YOUR_STRIPE_PUBLIC_KEY` with your actual credentials.**

## 3. Install Composer Dependencies

The `composer.json` has been updated with `filament/filament`, `laravel/breeze`, and `spatie/laravel-permission`. Install these dependencies:

```bash
composer install
```

## 4. Install Laravel Breeze (for Authentication)

Laravel Breeze provides a great starting point for authentication. Install it:

```bash
php artisan breeze:install
```

When prompted, choose:

*   `Blade` for the stack.
*   `No` for dark mode (unless you want to implement it).
*   `Yes` for PHPUnit (for testing).

This will generate authentication views, routes, and controllers. Our custom registration view will override Breeze's default.

## 5. Install Filament 3 (for Admin Panel)

Filament is a beautiful TALL stack admin panel.

```bash
php artisan filament:install --panels
```

This command will prompt you to create a new user. You can use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file here, or use the seeder (see step 10). If you create one here, ensure it matches the credentials in `.env` for consistency.

## 6. Configure Tailwind CSS

Laravel Breeze and Filament already set up Tailwind CSS. Ensure your `tailwind.config.js` includes the paths to your Blade templates for proper purging:

```javascript
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/filament/**/*.blade.php', // For Filament views
        './vendor/laravel/breeze/resources/views/**/*.blade.php', // For Breeze views
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php', // Your custom Blade views
        './resources/js/**/*.js', // Assuming your main JS is here
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms, typography],
};
```

Ensure `resources/css/app.css` correctly includes Tailwind directives (this is already done in the provided file):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 7. Install Node.js Dependencies and Build Assets

Install the frontend dependencies (Tailwind, Alpine.js, Chart.js) and compile your assets:

```bash
npm install
npm run dev # or npm run build for production
```

`npm run dev` will watch for changes and recompile automatically.

## 8. Run Migrations

Your database tables for users, constellations, tours, transactions, etc., need to be created.

```bash
php artisan migrate
```

## 9. Create Custom Configuration

The `config/7ensemble.php` and `config/payment.php` files contain custom application settings. These are already generated for you. Review them to ensure they meet your specific needs.

## 10. Seed the Database

An `AdminUserSeeder` and `RolesAndPermissionsSeeder` have been created. First, set up roles, then create an initial admin user.

```bash
php artisan db:seed --class=RolesAndPermissionsSeeder
php artisan db:seed --class=AdminUserSeeder
```

This will create an admin user with the credentials defined in your `.env` file (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) and assign them the 'admin' role.

## 11. Register Middleware & Service Provider

The custom middleware (`CheckUserTour`, `EnsureUserHasConstellation`, `CheckUserRole`) are generated. The `CheckUserRole` middleware is now registered in `app/Http/Kernel.php` for convenience and proper role checking using Spatie's package.
`ConstellationServiceProvider` is placed in `app/Providers` and automatically discovered by Laravel.

## 12. Run the Application

Start the Laravel development server:

```bash
php artisan serve
```

Or if you're using Laravel Sail (Docker):

```bash
./vendor/bin/sail up -d # Run in detached mode
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
./vendor/bin/sail artisan db:seed --class=RolesAndPermissionsSeeder
./vendor/bin/sail artisan db:seed --class=AdminUserSeeder
```

Visit `http://127.0.0.1:8000` (or `http://localhost` if using Sail) in your browser.

You can now:
*   Access public pages: `/`, `/7tours`, `/mission`
*   Register a new user: `/register` (or `/register?referral_code=XXXXXX`)
*   Log in: `/login`
*   Access the user dashboard: `/dashboard` (after login as a regular user)
*   Access the admin panel: `/admin` (after logging in as an admin)

---

**Directory Structure Overview**

Here's an overview of the generated and recommended directory structure for your Laravel 11 project:

```
.
├── app/
│   ├── Enums/                     # NEW: Custom enums for clarity (e.g., ConstellationType, UserRole)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AdminPanelController.php  # Admin specific logic
│   │   │   ├── PublicPagesController.php # Public page logic (Home, 7 Tours, Mission)
│   │   │   └── UserDashboardController.php # User dashboard logic
│   │   ├── Middleware/
│   │   │   ├── CheckUserRole.php         # NEW: Custom middleware for role-based access
│   │   │   ├── CheckUserTour.php         # NEW: Custom middleware for tour progression
│   │   │   └── EnsureUserHasConstellation.php # NEW: Custom middleware for constellation status
│   │   └── Kernel.php                 # UPDATED: Middleware registration
│   ├── Models/                    # NEW: Eloquent models for your application's data
│   │   ├── Constellation.php
│   │   ├── ConstellationMember.php
│   │   ├── Referral.php
│   │   ├── Tour.php
│   │   ├── Transaction.php
│   │   ├── User.php               # UPDATED: Added fields and relationships
│   │   └── UserPaymentMethod.php
│   └── Providers/
│       └── ConstellationServiceProvider.php # NEW: Service provider for constellation services
│       └── AppServiceProvider.php (standard Laravel, for registering services)
├── config/
│   ├── 7ensemble.php              # NEW: Custom configuration for application settings
│   └── payment.php                # NEW: Custom configuration for payment gateway settings
├── database/
│   ├── migrations/                # NEW: Database schema definitions
│   │   ├── 2014_10_12_000000_create_users_table.php (UPDATED)
│   │   ├── 2024_01_01_100000_create_constellations_table.php (NEW)
│   │   ├── 2024_01_01_100001_create_constellation_members_table.php (NEW)
│   │   ├── 2024_01_01_100002_create_tours_table.php (NEW)
│   │   ├── 2024_01_01_100003_create_transactions_table.php (NEW)
│   │   ├── 2024_01_01_100004_create_referrals_table.php (NEW)
│   │   └── 2024_01_01_100005_create_user_payment_methods_table.php (NEW)
│   └── seeders/
│       ├── AdminUserSeeder.php    # NEW: Seed an initial admin user
│       ├── RolesAndPermissionsSeeder.php # NEW: Seed roles for spatie/laravel-permission
│       └── DatabaseSeeder.php     # UPDATED: Call other seeders
├── public/
│   └── # Your compiled assets go here (handled by Vite)
├── resources/
│   ├── css/
│   │   └── app.css                # UPDATED: Tailwind directives
│   ├── js/
│   │   └── app.js                 # UPDATED: Alpine.js init
│   └── views/
│       ├── auth/                  # Breeze authentication views (login, etc.), custom register.blade.php
│       │   └── register.blade.php # Custom registration form
│       ├── components/            # Reusable Blade components
│       │   ├── checkbox-input.blade.php (NEW)
│       │   ├── constellation-visualization.blade.php (NEW)
│       │   ├── danger-button.blade.php (Breeze component styled)
│       │   ├── dashboard-nav-link.blade.php (NEW)
│       │   ├── footer.blade.php (NEW)
│       │   ├── header.blade.php (NEW)
│       │   ├── input-error.blade.php (Breeze component styled)
│       │   ├── input-label.blade.php (Breeze component styled)
│       │   ├── primary-button.blade.php (Breeze component styled)
│       │   ├── radio-button-input.blade.php (NEW)
│       │   ├── responsive-nav-link.blade.php (Breeze component styled)
│       │   ├── secondary-button.blade.php (Breeze component styled)
│       │   ├── select-input.blade.php (NEW)
│       │   ├── stat-card.blade.php (NEW)
│       │   ├── table-cell.blade.php (NEW)
│       │   ├── table-header.blade.php (NEW)
│       │   ├── table.blade.php (NEW)
│       │   ├── text-input.blade.php (Breeze component styled)
│       │   ├── tour-table.blade.php (NEW)
│       │   └── tour-timeline.blade.php (NEW)
│       ├── dashboard/             # User dashboard specific views
│       │   ├── my-constellation.blade.php
│       │   ├── overview.blade.php
│       │   ├── payment-history.blade.php
│       │   ├── referral-system.blade.php
│       │   ├── settings.blade.php
│       │   ├── tour-progress.blade.php
│       │   └── transfer-money.blade.php
│       ├── admin/                 # Admin panel specific views
│       │   ├── dashboard.blade.php
│       │   ├── constellations-management.blade.php
│       │   ├── reports-analytics.blade.php
│       │   ├── transactions-management.blade.php
│       │   └── users-management.blade.php
│       ├── layouts/
│       │   ├── app.blade.php          # Main public layout (NEW)
│       │   └── dashboard.blade.php    # Dashboard layout (for user and admin) (NEW)
│       └── public/                  # Public pages (home, 7 tours, mission)
│           ├── home.blade.php
│           ├── mission.blade.php
│           └── seven-tours.blade.php
├── routes/
│   ├── admin.php                  # NEW: Admin-specific routes
│   ├── api.php (standard Laravel)
│   ├── auth.php (from Breeze)
│   ├── dashboard.php              # NEW: User dashboard routes
│   └── web.php                    # UPDATED: Public routes and route group includes
├── .env.example                   # UPDATED: With custom variables
├── composer.json                  # UPDATED: Added Laravel Breeze, Filament, Spatie/laravel-permission
├── package.json                   # UPDATED: Added Chart.js, removed React deps
├── README-SETUP.md                # This file
└── vite.config.js (standard Laravel)
```