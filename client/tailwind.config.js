/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar: '300px auto', //for sidebar layout
                'sidebar-collapsed': '64px auto', //for collapsed sidebar layout
            },
            colors: {
                orange: '#FEBA71',
                yellow: '#FFDC7E',
                pink: '#FFC7B0',
            },
        },
    },
    plugins: [],
};
