(function() {
    'use strict';

    const controllerId = 'AccountCtrl';
    const moduleId = 'starter';

    angular
        .module(moduleId)
        .controller(controllerId, controller);

    controller.$inject = [
        '$scope'
    ];
    
    function controller($scope) {
        var vm = this;
        $scope.settings = {
            enableFriends: true
        };
    };

})();
