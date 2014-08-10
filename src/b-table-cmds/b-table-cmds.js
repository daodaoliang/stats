(function() {
  var module;

  module = angular.module('B.Table.Cmds', []);

  module.directive("bTableCmds", ["bDataSvc", "bPoP", function(bDataSvc, bPoP) {
    return {
      templateUrl: 'b-table-cmds/b-table-cmds.html',
      restrict: 'E',
      link: function(scope) {
        bDataSvc.fetchAllP.then(function(data) {
          data.data.commands.forEach(function(cmdObj) {
            cmdObj.usersSum = bPoP.process(cmdObj.users, 7);
            cmdObj.usesSum = bPoP.process(cmdObj.uses, 7);
            if (cmdObj.packages) {
              cmdObj.packagesSum = bPoP.process(cmdObj.packages, 7);
            }
          });
          scope.cmds = data.data.commands;
        });
      }
    };
  }]);

}).call(this);

//# sourceMappingURL=../b-table-cmds/b-table-cmds.js.map