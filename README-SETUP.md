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
SEVEN_ENSEMBLE_PLATFORM_FEE_PERCENTAGE=2
SEVEN_ENSEMBLE_MIN_WITHDRAWAL_AMOUNT=50

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
# Add this for Filament's custom logo
FILAMENT_LOGO_PATH=/images/7ensemble-logo-dark.png

# Two-Factor Authentication (Google Authenticator)
GOOGLE2FA_SECRET_KEY=

# Queue configuration (for emails and background jobs)
QUEUE_CONNECTION=database # Use 'database' for most jobs, 'redis' for critical/high-volume jobs if configured
# ...
```

## 3. Install Composer Dependencies

The `composer.json` has been updated with `filament/filament`, `laravel/breeze`, `spatie/laravel-permission`, `spatie/laravel-activitylog`, `awcodes/filament-gravatar`, and `pragmarx/google2fa-laravel`. Install these dependencies:

```bash
composer install
```

## 4. Configure Environment Variables (Post-Composer)

Some packages require publishing their configuration or running migrations.

*   **Spatie Laravel Activitylog:**
    ```bash
    php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-config"
    php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-migrations"
    ```
*   **Google2FA Laravel:**
    ```bash
    php artisan vendor:publish --provider="PragmaRX\Google2FALaravel\Google2FALaravelServiceProvider" --tag="config"
    ```

## 5. Install Laravel Breeze (for Authentication)

Laravel Breeze provides a great starting point for authentication. Install it:

```bash
php artisan breeze:install
```

When prompted, choose:

*   `Blade` for the stack.
*   `No` for dark mode (unless you want to implement it).
*   `Yes` for PHPUnit (for testing).

This will generate authentication views, routes, and controllers. Our custom registration view will override Breeze's default.

## 6. Install Filament 3 (for Admin Panel)

Filament is a beautiful TALL stack admin panel.

```bash
php artisan filament:install --panels
```

This command will prompt you to create a new user. You can use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file here, or use the seeder (see step 10). If you create one here, ensure it matches the credentials in `.env` for consistency.

Next, publish Filament's configuration and translations:
```bash
php artisan vendor:publish --tag="filament-config"
php artisan vendor:publish --tag="filament-translations"
```

Create a new Filament theme for customization:
```bash
php artisan make:filament-theme
```
This will create a `resources/css/filament/admin/theme.css` file. Ensure `tailwind.config.js` is configured to scan this file as well (see next step).

## 7. Configure Tailwind CSS

Laravel Breeze and Filament already set up Tailwind CSS. Ensure your `tailwind.config.js` includes the paths to your Blade templates for proper purging:

```javascript
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors'; // Import colors for custom theme

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/filament/**/*.blade.php', // For Filament views
        './vendor/laravel/breeze/resources/views/**/*.blade.php', // For Breeze views
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php', // Your custom Blade views
        './resources/js/**/*.js', // Assuming your main JS is here
        './resources/css/filament/admin/theme.css', // NEW: Filament custom theme CSS
    ],

    darkMode: 'class', // Enable dark mode
    theme: {
        extend: {
            colors: {
                danger: colors.red,
                primary: colors.emerald, // Use emerald for primary brand color
                success: colors.green,
                warning: colors.yellow,
                info: colors.blue,
                secondary: colors.indigo, // Use indigo for secondary accents
            },
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

## 8. Install Node.js Dependencies and Build Assets

Install the frontend dependencies (Tailwind, Alpine.js, Chart.js, QRCode) and compile your assets:

```bash
npm install
npm run dev # or npm run build for production
```

`npm run dev` will watch for changes and recompile automatically.

## 9. Run Migrations

Your database tables for users, constellations, tours, transactions, bank accounts, referrals, and now `activity_log`, `support_tickets`, `jobs`, `failed_jobs`, and `email_logs` need to be created.

```bash
php artisan migrate
```
**Important:** After running `php artisan migrate`, if you are using the `database` queue driver, you will also need to run `php artisan queue:table` and `php artisan queue:failed-table` and then `php artisan migrate` again to create the `jobs` and `failed_jobs` tables.

## 10. Create Custom Configuration

The `config/7ensemble.php` and `config/payment.php` files contain custom application settings. These are already generated for you. Review them to ensure they meet your specific needs. `config/7ensemble.php` now includes tour details, countries, payment methods, platform fees, minimum withdrawal, and referral bonus structures.

## 11. Seed the Database

An `AdminUserSeeder`, `RolesAndPermissionsSeeder`, and `DevelopmentSeeder` have been created. First, set up roles, then create an initial admin user and optionally seed development data.

```bash
php artisan db:seed --class=RolesAndPermissionsSeeder
php artisan db:seed --class=AdminUserSeeder
# Optional: for development data
php artisan db:seed --class=DevelopmentSeeder
```

This will create an admin user with the credentials defined in your `.env` file (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) and assign them the 'super_admin' role (which grants full access).

## 12. Register Middleware & Service Provider

The custom middleware (`CheckUserTour`, `EnsureUserHasConstellation`, `CheckUserRole`) are generated. The `CheckUserRole` middleware is now registered in `app/Http/Kernel.php` for convenience and proper role checking using Spatie's package.
`ConstellationServiceProvider` and `FilamentServiceProvider` (for overriding default Filament behaviors) are placed in `app/Providers` and automatically discovered by Laravel.

## 13. Create an "Admin" Filament Panel

A default `AdminPanelProvider.php` is created at `app/Providers/Filament/AdminPanelProvider.php`. We will customize this to define our admin panel's theme, logo, navigation, and widgets.

Make sure your `app/Models/User.php` implements `FilamentUser` and `HasPanelShield`.

```php
// app/Models/User.php
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Spatie\Permission\Traits\HasRoles; // Make sure to use this trait

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles; // Add HasRoles

    // ... existing code ...

    public function canAccessPanel(Panel $panel): bool
    {
        // Only users with 'admin' or 'super_admin' role can access the admin panel
        return $this->hasAnyRole(['super_admin', 'admin', 'support', 'accountant']) && $this->is_active;
    }
}
```

## 14. Run the Application

Start the Laravel development server:

```bash
php artisan serve
```

### Running Queue Workers (Essential for Emails and Jobs)

Since we're using queued emails and jobs, you'll need to run queue workers. This is best done using `Supervisor` in production, but for development, you can run it manually:

```bash
php artisan queue:work
```
Keep this command running in a separate terminal window. If you make changes to your queued jobs or notifications, you'll need to restart the worker (`Ctrl+C` then `php artisan queue:work`).

### Running the Scheduler (Essential for Scheduled Tasks)

Laravel's scheduler (`app/Console/Kernel.php`) needs a single cron entry to run. On your server, you would add this to your crontab:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
For local development, you can manually trigger it or use a tool like Laravel Herd/Valet which often handles this. You can manually test it:
```bash
php artisan schedule:run
```

Or if you're using Laravel Sail (Docker):

```bash
./vendor/bin/sail up -d # Run in detached mode
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
./vendor/bin/sail artisan queue:work & # Run queue worker in background
./vendor/bin/sail artisan db:seed --class=RolesAndPermissionsSeeder
./vendor/bin/sail artisan db:seed --class=AdminUserSeeder
./vendor/bin/sail artisan db:seed --class=DevelopmentSeeder # Optional
# To ensure scheduler runs in Sail, you might need an entry in `docker-compose.yml`
# or manually call `sail artisan schedule:run` periodically.
```

Visit `http://127.0.0.1:8000` (or `http://localhost` if using Sail) in your browser.

You can now:
*   Access public pages: `/`, `/7tours`, `/mission`
*   Register a new user: `/register` (or `/register?referral_code=XXXXXX`)
*   Log in: `/login`
*   Access the user dashboard: `/dashboard` (after login as a regular user)
*   Access the admin panel: `/admin` (after logging in as an an admin)
*   Test emails manually: `php artisan app:test-email-notifications`

---

**Directory Structure Overview**

Here's an overview of the generated and recommended directory structure for your Laravel 11 project:

```
.
├── app/
│   ├── Console/                   # NEW: Custom Artisan commands
│   │   ├── Commands/
│   │   │   ├── CleanupInactiveUsers.php
│   │   │   ├── GenerateDailyReport.php
│   │   │   ├── ProcessPendingPayouts.php
│   │   │   ├── RotateConstellations.php
│   │   │   ├── SendPaymentReminders.php
│   │   │   ├── SyncTransactions.php
│   │   │   └── TestEmailNotifications.php
│   │   └── Kernel.php             # UPDATED: Scheduled tasks configuration
│   ├── Enums/                     # NEW: Custom enums for clarity (e.g., ConstellationType, UserRole, EmailLogEventType)
│   ├── Events/                    # NEW: Custom events for system actions
│   │   ├── ConstellationUpdated.php
│   │   ├── PaymentProcessed.php
│   │   ├── PayoutProcessed.php
│   │   ├── ReferralBonusCredited.php
│   │   └── TourCompleted.php
│   ├── Filament/                  # NEW: Filament Admin Panel resources, widgets, pages
│   │   ├── Pages/
│   │   │   ├── ActivityLog.php
│   │   │   ├── Analytics.php
│   │   │   ├── Reports.php
│   │   │   └── Settings.php
│   │   ├── Resources/
│   │   │   ├── ConstellationResource.php
│   │   │   ├── ConstellationResource/RelationManagers/MembersRelationManager.php
│   │   │   ├── ReferralResource.php
│   │   │   ├── SupportTicketResource.php
│   │   │   ├── SupportTicketResource/RelationManagers/RepliesRelationManager.php
│   │   │   ├── TourResource.php
│   │   │   ├── TransactionResource.php
│   │   │   ├── UserResource.php
│   │   │   └── UserResource/RelationManagers/TransactionsRelationManager.php
│   │   ├── Widgets/
│   │   │   ├── AlertsWidget.php
│   │   │   ├── RecentActivityWidget.php
│   │   │   ├── RevenueChart.php
│   │   │   ├── StatsOverviewWidget.php
│   │   │   ├── TourCompletionFunnel.php
│   │   │   └── UserGrowthChart.php
│   │   └── Panel.php              # UPDATED: Filament panel provider (AdminPanelProvider.php)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AdminPanelController.php
│   │   │   ├── Auth/
│   │   │   │   └── RegisteredUserController.php # UPDATED: Dispatch welcome notification
│   │   │   ├── HomeController.php
│   │   │   ├── PublicPagesController.php
│   │   │   ├── UnsubscribeController.php    # NEW: Handles email unsubscribe requests
│   │   │   ├── UserDashboardController.php
│   │   │   └── Dashboard/                 # NEW: Controllers for user dashboard pages
│   │   ├── Middleware/
│   │   │   ├── CheckUserRole.php
│   │   │   ├── CheckUserTour.php
│   │   │   └── EnsureUserHasConstellation.php
│   │   └── Kernel.php                 # UPDATED: Middleware registration
│   ├── Jobs/                      # NEW: Background jobs
│   │   ├── CleanupInactiveUsersJob.php
│   │   ├── GenerateDailyReportJob.php
│   │   ├── ProcessConstellationRotationJob.php
│   │   ├── ProcessDailyDigestJob.php
│   │   ├── ProcessPaymentReminderJob.php
│   │   ├── ProcessPayoutsJob.php
│   │   ├── SendEmailJob.php
│   │   └── SyncPaymentGatewayJob.php
│   ├── Listeners/                 # NEW: Event listeners
│   │   ├── SendConstellationUpdate.php
│   │   ├── SendPaymentConfirmation.php
│   │   ├── SendPaymentReminder.php
│   │   ├── SendPayoutNotification.php
│   │   ├── SendReferralBonusNotification.php
│   │   ├── SendTourCompletionNotification.php
│   │   └── SendWelcomeEmail.php
│   ├── Mail/                      # NEW: Mailable classes for emails
│   │   ├── AnnouncementMail.php
│   │   ├── ConstellationUpdateMail.php
│   │   ├── DailyDigestMail.php
│   │   ├── PasswordResetMail.php
│   │   ├── PaymentConfirmedMail.php
│   │   ├── PaymentReminderMail.php
│   │   ├── PayoutReceivedMail.php
│   │   ├── ReferralBonusMail.php
│   │   ├── TourCompletedMail.php
│   │   └── WelcomeMail.php
│   ├── Models/                    # NEW: Eloquent models for your application's data
│   │   ├── Constellation.php
│   │   ├── ConstellationMember.php
│   │   ├── Referral.php
│   │   ├── Tour.php
│   │   ├── Transaction.php
│   │   ├── User.php               # UPDATED: Added fields and relationships, FilamentUser, Notifiable
│   │   ├── BankAccount.php
│   │   ├── SupportTicket.php      # NEW: For admin support tickets
│   │   └── EmailLog.php           # NEW: For email tracking
│   ├── Notifications/             # NEW: Notification classes
│   │   ├── AnnouncementNotification.php
│   │   ├── ConstellationUpdateNotification.php
│   │   ├── DailyDigestNotification.php
│   │   ├── PasswordResetNotification.php
│   │   ├── PaymentConfirmedNotification.php
│   │   ├── PaymentReminderNotification.php
│   │   ├── PayoutReceivedNotification.php
│   │   ├── ReferralBonusNotification.php
│   │   ├── TourCompletedNotification.php
│   │   └── WelcomeNotification.php
│   ├── Providers/
│   │   ├── ConstellationServiceProvider.php
│   │   ├── AppServiceProvider.php
│   │   ├── EventServiceProvider.php     # UPDATED: Register events and listeners
│   │   └── Filament/
│   │       └── AdminPanelProvider.php  # NEW: Filament Admin Panel Provider
│   ├── Services/                  # NEW: Application services
│   │   ├── EmailTrackingService.php   # NEW: For tracking email opens/clicks
│   │   ├── ExportService.php
│   │   ├── ReferralService.php
│   │   └── TransferService.php
│   └── Observers/                 # NEW: For activity logging (if not using Spatie's trait)
│       └── AdminAuditObserver.php # Placeholder for custom audit if needed
├── config/
│   ├── 7ensemble.php              # UPDATED: Custom configuration for application settings
│   ├── payment.php                # UPDATED: Custom configuration for payment gateway settings
│   ├── activitylog.php            # NEW: Spatie Activity Log config
│   ├── google2fa.php              # NEW: Google2FA config
│   ├── filament.php               # NEW: Filament config
│   └── queue.php                  # UPDATED: Queue driver configuration
├── database/
│   ├── factories/                 # NEW: Model factories
│   │   ├── SupportTicketFactory.php # NEW
│   ├── migrations/                # NEW: Database schema definitions
│   │   ├── 2014_10_12_000000_create_users_table.php (UPDATED)
│   │   ├── ..._create_constellations_table.php
│   │   ├── ..._create_constellation_members_table.php
│   │   ├── ..._create_tours_table.php
│   │   ├── ..._create_transactions_table.php
│   │   ├── ..._create_referrals_table.php
│   │   ├── ..._create_user_payment_methods_table.php
│   │   ├── ..._create_bank_accounts_table.php
│   │   ├── ..._create_activity_log_table.php # NEW: Spatie Activity Log
│   │   ├── ..._create_support_tickets_table.php # NEW: For support tickets
│   │   ├── 2024_01_01_000009_create_jobs_table.php (NEW: Laravel queue tables)
│   │   ├── 2024_01_01_000010_create_failed_jobs_table.php (NEW: Laravel queue tables)
│   │   ├── 2024_01_01_000011_add_email_preferences_to_users_table.php (NEW)
│   │   └── 2024_01_01_000012_create_email_logs_table.php (NEW)
│   └── seeders/
│       ├── AdminUserSeeder.php
│       ├── RolesAndPermissionsSeeder.php
│       ├── DevelopmentSeeder.php  # NEW: For populating development data
│       └── DatabaseSeeder.php     # UPDATED: Call other seeders
├── public/
│   ├── css/
│   │   └── app.css                # UPDATED: Tailwind directives, plus all custom styles and animations
│   ├── js/
│   │   └── app.js                 # UPDATED: Alpine.js init, custom components
│   └── images/                    # NEW: Placeholder for image assets (e.g., hand_illustration.png, 7ensemble-logo-dark.png)
├── resources/
│   ├── css/
│   │   ├── app.css
│   │   └── filament/
│   │       └── admin/
│   │           └── theme.css      # NEW: Filament custom theme CSS
│   ├── js/
│   │   └── app.js
│   ├── lang/                      # NEW: For translations
│   │   └── fr.json                # NEW: French translations
│   └── views/
│       ├── auth/
│       │   └── register.blade.php
│       ├── components/
│       │   ├── blinking-text.blade.php
│       │   ├── button.blade.php
│       │   ├── checkbox.blade.php
│       │   ├── confetti.blade.php
│       │   ├── constellation-visual.blade.php
│       │   ├── dancing-silhouettes.blade.php
│       │   ├── footer.blade.php
│       │   ├── header.blade.php
│       │   ├── hero-section.blade.php
│       │   ├── input.blade.php
│       │   ├── modal.blade.php
│       │   ├── radio-button.blade.php
│       │   ├── select.blade.php
│       │   ├── stats-cards.blade.php
│       │   ├── danger-button.blade.php
│       │   ├── dashboard-nav-link.blade.php
│       │   ├── input-error.blade.php
│       │   ├── input-label.blade.php
│       │   ├── primary-button.blade.php
│       │   ├── responsive-nav-link.blade.php
│       │   ├── secondary-button.blade.php
│       │   ├── stat-card.blade.php
│       │   ├── table-cell.blade.php
│       │   ├── table-header.blade.php
│       │   ├── table.blade.php
│       │   ├── text-input.blade.php
│       │   ├── tour-table.blade.php
│       │   └── tour-timeline.blade.php
│       ├── dashboard/
│       │   ├── my-constellation.blade.php
│       │   ├── overview.blade.php
│       │   ├── payment-history.blade.php
│       │   ├── referral-system.blade.php
│       │   ├── settings.blade.php
│       │   ├── tour-progress.blade.php
│       │   └── transfer-money.blade.php
│       ├── emails/                # NEW: For email notifications
│       │   ├── layout.blade.php
│       │   ├── welcome.blade.php
│       │   ├── payment-confirmed.blade.php
│       │   ├── tour-completed.blade.php
│       │   ├── payout-received.blade.php
│       │   ├── constellation-update.blade.php
│       │   ├── referral-bonus.blade.php
│       │   ├── payment-reminder.blade.php
│       │   ├── password-reset.blade.php
│       │   ├── announcement.blade.php
│       │   └── unsubscribe.blade.php
│       ├── layouts/
│       │   ├── app.blade.php
│       │   └── dashboard.blade.php
│       ├── pages/
│       │   ├── index.blade.php
│       │   ├── mission.blade.php
│       │   └── seven-tours.blade.php
│       └── pdf/                   # NEW: For PDF exports
│           └── transaction_receipt.blade.php
├── routes/
│   ├── admin.php
│   ├── api.php
│   ├── auth.php
│   ├── dashboard.php
│   └── web.php
├── .env.example                   # UPDATED: With custom variables
├── composer.json                  # UPDATED: Added Filament, Spatie Activity Log, Google2FA
├── package.json                   # UPDATED: Added QRCode
├── README-SETUP.md                # UPDATED: This file
├── tailwind.config.js             # UPDATED: Filament theme customization, dark mode, primary/secondary colors
└── vite.config.js
```