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

```dotenv
# ...
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=7ensemble_db # Your database name
DB_USERNAME=root       # Your database user
DB_PASSWORD=           # Your database password

# Custom 7 Ensemble settings
SEVEN_ENSEMBLE_DEFAULT_CONSTELLATION_TYPE=pleiades # 'triangulum' or 'pleiades'
SEVEN_ENSEMBLE_INITIAL_CONTRIBUTION=21

# Payment Gateway (e.g., Stripe)
PAYMENT_STRIPE_KEY=pk_test_YOUR_STRIPE_PUBLIC_KEY
PAYMENT_STRIPE_SECRET=sk_test_YOUR_STRIPE_SECRET_KEY
PAYMENT_DEFAULT_CURRENCY=EUR

# Admin User (for initial setup)
ADMIN_EMAIL=admin@7ensemble.com
ADMIN_PASSWORD=adminpass # IMPORTANT: Change this in production!

# Filament Admin Panel
FILAMENT_EMAIL=admin@7ensemble.com
FILAMENT_PASSWORD=adminpass # IMPORTANT: Change this in production!
# ...
```

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

Ensure `resources/css/app.css` correctly includes Tailwind directives and custom styles/animations (this is already done in the provided file):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... (Your custom CSS for cosmic background, stars, animations, components) ... */
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

The `config/7ensemble.php` and `config/payment.php` files contain custom application settings. These are already generated for you. Review them to ensure they meet your specific needs. `config/7ensemble.php` now includes tour details, countries, and payment methods.

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
│   │   │   ├── AdminPanelController.php  # Admin specific logic (from Phase 2)
│   │   │   ├── HomeController.php        # NEW: For public homepage
│   │   │   ├── PublicPagesController.php # Public page logic (7 Tours, Mission - from Phase 2)
│   │   │   └── UserDashboardController.php # User dashboard logic (from Phase 2)
│   │   ├── Middleware/
│   │   │   ├── CheckUserRole.php         # NEW: Custom middleware for role-based access (from Phase 2)
│   │   │   ├── CheckUserTour.php         # NEW: Custom middleware for tour progression (from Phase 2)
│   │   │   └── EnsureUserHasConstellation.php # NEW: Custom middleware for constellation status (from Phase 2)
│   │   └── Kernel.php                 # UPDATED: Middleware registration (from Phase 2)
│   ├── Models/                    # NEW: Eloquent models for your application's data (from Phase 2)
│   │   ├── Constellation.php
│   │   ├── ConstellationMember.php
│   │   ├── Referral.php
│   │   ├── Tour.php
│   │   ├── Transaction.php
│   │   ├── User.php               # UPDATED: Added fields and relationships
│   │   └── UserPaymentMethod.php
│   └── Providers/
│       └── ConstellationServiceProvider.php # NEW: Service provider for constellation services (from Phase 2)
│       └── AppServiceProvider.php (standard Laravel, for registering services)
├── config/
│   ├── 7ensemble.php              # UPDATED: Custom configuration for application settings (now includes tour/country/payment data)
│   └── payment.php                # NEW: Custom configuration for payment gateway settings (from Phase 2)
├── database/
│   ├── factories/                 # NEW: Model factories (from Phase 2)
│   ├── migrations/                # NEW: Database schema definitions (from Phase 2)
│   │   ├── 2014_10_12_000000_create_users_table.php (UPDATED)
│   │   ├── ..._create_constellations_table.php
│   │   ├── ..._create_constellation_members_table.php
│   │   ├── ..._create_tours_table.php
│   │   ├── ..._create_transactions_table.php
│   │   ├── ..._create_referrals_table.php
│   │   └── ..._create_user_payment_methods_table.php
│   └── seeders/
│       ├── AdminUserSeeder.php    # NEW: Seed an initial admin user (from Phase 2)
│       ├── RolesAndPermissionsSeeder.php # NEW: Seed roles for spatie/laravel-permission (from Phase 2)
│       └── DatabaseSeeder.php     # UPDATED: Call other seeders (from Phase 2)
├── public/
│   ├── css/                       # NEW: Placeholders for cosmic-theme, animations, components CSS
│   │   ├── cosmic-theme.css
│   │   ├── animations.css
│   │   └── components.css
│   ├── js/                        # NEW: Placeholders for constellation-animation, modal-handler, number-animation JS
│   │   ├── constellation-animation.js
│   │   ├── modal-handler.js
│   │   └── number-animation.js
│   └── images/                    # NEW: Placeholder for image assets (e.g., hand_illustration.png)
├── resources/
│   ├── css/
│   │   └── app.css                # UPDATED: Tailwind directives, plus all custom styles and animations
│   ├── js/
│   │   └── app.js                 # UPDATED: Alpine.js init, custom numberCounter Alpine data
│   └── views/
│       ├── auth/                  # Breeze authentication views (login, etc.)
│       │   └── register.blade.php # UPDATED: Custom comprehensive registration form
│       ├── components/            # Reusable Blade components
│       │   ├── blinking-text.blade.php         # NEW
│       │   ├── button.blade.php                # NEW (replaces Breeze's for consistency)
│       │   ├── checkbox.blade.php              # NEW
│       │   ├── confetti.blade.php              # NEW
│       │   ├── constellation-visual.blade.php  # NEW
│       │   ├── dancing-silhouettes.blade.php   # NEW
│       │   ├── footer.blade.php                # NEW
│       │   ├── header.blade.php                # NEW
│       │   ├── hero-section.blade.php          # NEW
│       │   ├── input.blade.php                 # NEW
│       │   ├── modal.blade.php                 # NEW (generic modal)
│       │   ├── radio-button.blade.php          # NEW
│       │   ├── select.blade.php                # NEW
│       │   ├── stats-cards.blade.php           # NEW
│       │   ├── danger-button.blade.php         # Breeze component (from Phase 2)
│       │   ├── dashboard-nav-link.blade.php    # (from Phase 2)
│       │   ├── input-error.blade.php           # Breeze component (from Phase 2)
│       │   ├── input-label.blade.php           # Breeze component (from Phase 2)
│       │   ├── primary-button.blade.php        # Breeze component (from Phase 2)
│       │   ├── responsive-nav-link.blade.php   # Breeze component (from Phase 2)
│       │   ├── secondary-button.blade.php      # Breeze component (from Phase 2)
│       │   ├── stat-card.blade.php             # (from Phase 2)
│       │   ├── table-cell.blade.php            # (from Phase 2)
│       │   ├── table-header.blade.php          # (from Phase 2)
│       │   ├── table.blade.php                 # (from Phase 2)
│       │   ├── text-input.blade.php            # Breeze component (from Phase 2)
│       │   ├── tour-table.blade.php            # (from Phase 2)
│       │   └── tour-timeline.blade.php         # (from Phase 2)
│       ├── dashboard/             # User dashboard specific views (from Phase 2)
│       │   ├── my-constellation.blade.php
│       │   ├── overview.blade.php
│       │   ├── payment-history.blade.php
│       │   ├── referral-system.blade.php
│       │   ├── settings.blade.php
│       │   ├── tour-progress.blade.php
│       │   └── transfer-money.blade.php
│       ├── admin/                 # Admin panel specific views (from Phase 2)
│       │   ├── dashboard.blade.php
│       │   ├── constellations-management.blade.php
│       │   ├── reports-analytics.blade.php
│       │   ├── transactions-management.blade.php
│       │   └── users-management.blade.php
│       ├── layouts/
│       │   ├── app.blade.php          # NEW: Main public layout
│       │   └── dashboard.blade.php    # NEW: Dashboard layout (for user and admin)
│       └── pages/                   # Public pages
│           ├── index.blade.php          # NEW: Homepage content
│           ├── mission.blade.php        # NEW: Mission page content
│           └── seven-tours.blade.php    # NEW: 7 Tours page content
├── routes/
│   ├── admin.php                  # NEW: Admin-specific routes (from Phase 2)
│   ├── api.php (standard Laravel)
│   ├── auth.php (from Breeze)
│   ├── dashboard.php              # NEW: User dashboard routes (from Phase 2)
│   └── web.php                    # UPDATED: Public routes (home, 7 tours, mission)
├── .env.example                   # UPDATED: With custom variables
├── composer.json                  # UPDATED: Added Laravel Breeze, Filament, Spatie/laravel-permission
├── package.json                   # UPDATED: Added Chart.js, removed React deps
├── README-SETUP.md                # UPDATED: This file
└── vite.config.js (standard Laravel)
```