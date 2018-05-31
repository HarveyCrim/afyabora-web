app.config(function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'partials/geocard.ejs' })
        .when('/member', { templateUrl: 'partials/Adhesion.php' })
        .when('/objects', { templateUrl: 'partials/Objectifs.php' })
        .when('/platforms', { templateUrl: 'partials/plateformes.php' })
        .when('/structurations', { templateUrl: 'partials/structures.php' })
        .when('/strategies', { templateUrl: 'partials/strategies.php' })
        .when('/contacts', { templateUrl: 'partials/contacts.php' })
        .when('/news/:idref', { templateUrl: 'partials/news.php' })
        .when('/announces/:idrefa', { templateUrl: 'partials/news-announces.php' })
        .when('/table-news/', { templateUrl: 'partials/tables-actualites.php' })
        .when('/table-announces/', { templateUrl: 'partials/table-announces.php' })
        .when('/documentslist', { templateUrl: 'partials/docslist.php' })
        .otherwise({ redirectTo: '/' })


})