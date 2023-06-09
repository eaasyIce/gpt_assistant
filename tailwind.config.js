const colors = require('tailwindcss/colors');
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './features/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            translate: ['dark'],

            colors: {
                // colorPrimary: colors.cyan[700],
                colorPrimary: colors.teal[600],
                colorSecondary: colors.amber[300],
                black: {
                    base: '#615e5e',
                    // base: colors.red[500],
                    DEFAULT: colors.black,
                    inverted: colors.neutral[300],
                },
                white: {
                    DEFAULT: colors.white,
                    inverted: colors.neutral[900],
                },
                gray: {
                    base: colors.neutral[50],
                    inverted: colors.neutral[800],
                },
            },

            fontSize: {
                sm: '0.8rem',
                base: '0.9rem',
            },
            keyframes: {
                typing: {
                    '0%': {
                        width: '0%',
                        visibility: 'hidden',
                    },
                    '100%': {
                        width: '80%',
                    },
                },
                blink: {
                    '50%': {
                        borderColor: 'transparent',
                    },
                    '100%': {
                        borderColor: 'white',
                    },
                },
                sideSlide: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateX(20%)',
                    },
                    '100%': {
                        opacity: '100%',
                        transform: 'translateX(0)',
                    },
                },
                slideInFromTop: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateY(-10%)',
                    },
                    '100%': {
                        opacity: '100%',
                        transform: 'translateY(0)',
                    },
                },
                alertSlideIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-20px)',
                    },
                    '100%': {
                        opacity: '100%',
                    },
                },
                alertSlideOut: {
                    '0%': {
                        opacity: '100%',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateY(-20px)',
                    },
                },
                slideInFromBottom: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '100%',
                    },
                },
            },
            animation: {
                typing: 'typing 0.5s',
                sideSlide: 'sideSlide 0.8s ease-out',
                alertSlideIn: 'alertSlideIn 0.3s ease-out',
                alertSlideOut: 'alertSlideOut 0.3s ease-out',
                slideInFromTop: 'slideInFromTop 0.4s ease-out',
                alertSlide: 'alertSlide 3s ease-in-out',
                slideInFromBottom: 'slideInFromBottom 0.3s ease ',
            },
        },
    },

    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('@headlessui/tailwindcss'),
        require('autoprefixer'),
    ],
};
