(function() {
    'use strict';

    const controllerId = 'ChatsCtrl';
    const moduleId = 'starter';

    angular
        .module(moduleId)
        .controller(controllerId, controller);

    controller.$inject = [
        '$scope',
        'Chats'
    ];

    function controller($scope, Chats) {
        var vm = this;

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    };

})();
