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