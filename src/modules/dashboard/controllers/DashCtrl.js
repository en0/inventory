(function() {
    'use strict';

    const controllerId = 'DashCtrl';
    const moduleId = 'starter';

    angular
        .module(moduleId)
        .controller(controllerId, controller);

    controller.$inject = [
        '$scope'
    ];
    
    function controller($scope) {
        var vm = this;
    };

})();
