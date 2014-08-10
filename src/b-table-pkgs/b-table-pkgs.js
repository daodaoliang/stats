(function() {
  var module;

  module = angular.module('B.Table.Pkgs', []);

  module.directive("bTablePkgs", ["bDataSvc", "bPoP", function(bDataSvc, bPoP) {
    return {
      templateUrl: 'b-table-pkgs/b-table-pkgs.html',
      restrict: 'E',
      link: function(scope) {
        bDataSvc.fetchAllP.then(function(data) {
          data.data.packages.forEach(function(pkgObj) {
            pkgObj.priorRank = pkgObj.rank[0];
            pkgObj.currentRank = pkgObj.rank[1];
            pkgObj.rankDelta = pkgObj.priorRank - pkgObj.currentRank;
            pkgObj.installsSum = bPoP.process(pkgObj.installs, 7);
            pkgObj.currentInstallsSum = pkgObj.installsSum[1];
          });
          scope.packages = data.data.packages;
        });
        scope.setPredicate = function(predicate) {
          if (scope.predicate !== predicate) {
            scope.reverse = false;
          } else {
            scope.reverse = !scope.reverse;
          }
          scope.predicate = predicate;
        };
        scope.checkPredicate = function(predicate, reverse) {
          return scope.predicate === predicate && (reverse === void 0 || reverse);
        };
        scope.setPredicate('currentRank');
        scope.hideAngular = true;
        scope.toggleHideAngular = function() {
          scope.hideAngular = !scope.hideAngular;
        };
      }
    };
  }]);

  module.filter('bPredicateFilter', function() {
    return function(items, predicate) {
      var filtered;
      predicate = predicate.replace('-', '');
      filtered = [];
      if (items) {
        items.forEach(function(item) {
          if (item[predicate] != null) {
            filtered.push(item);
          }
        });
      }
      return filtered;
    };
  });

}).call(this);

//# sourceMappingURL=../b-table-pkgs/b-table-pkgs.js.map