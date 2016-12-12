(function() {
    'use strict';

    const controllerId = 'ChatDetailCtrl';
    const moduleId = 'starter';

    angular
        .module(moduleId)
        .controller(controllerId, controller);

    controller.$inject = [
        '$scope',
        '$stateParams',
        'Chats'
    ];
    
    function controller($scope, $stateParams, Chats) {
        var vm = this;
        $scope.chat = Chats.get($stateParams.chatId);
    };

})();

