(function() {
    'use strict';

    const serviceId = 'Chats';
    const moduleId = 'starter';

    angular
        .module(moduleId)
        .factory(serviceId, factory);

    factory.$inject = [

    ];
    
    function factory() {

        var chats;
        var service = {
            all: all,
            remove: remove,
            get: getItem
        };

        init();

        return service;

        // --------------------------------------------------------------------

        function init() {
            chats = [{
                id: 0,
                name: 'Ben Sparrow',
                lastText: 'You on your way?',
                face: 'assets/images/ben.png'
            }, {
                id: 1,
                name: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'assets/images/max.png'
            }, {
                id: 2,
                name: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'assets/images/adam.jpg'
            }, {
                id: 3,
                name: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'assets/images/perry.png'
            }, {
                id: 4,
                name: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'assets/images/mike.png'
            }];
        }

        function all() {
            return chats;
        }

        function remove(chat) {
            chats.splice(chats.indexOf(chat), 1);
        }

        function getItem(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})();
