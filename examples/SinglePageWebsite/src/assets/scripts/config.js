require.config({

    baseUrl: 'assets/scripts/',

    paths: {
        requirejs: '../vendor/requirejs/require',
        jquery: '../vendor/jquery/dist/jquery.min',
        handlebars: '../vendor/handlebars/handlebars.amd',
        structurejs: '../vendor/structurejs/js/',
        templates: './precompiledJst'
    },

    waitSeconds: 120,

    packages: []
});
