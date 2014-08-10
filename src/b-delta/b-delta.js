(function() {
  var module;

  module = angular.module('B.Delta', []);

  module.directive("bDelta", ["bDataSvc", function(bDataSvc) {
    return {
      templateUrl: 'b-delta/b-delta.html',
      restrict: 'E',
      scope: {
        delta: "@",
        type: "@"
      }
    };
  }]);

  module.filter('pct', function() {
    return function(input) {
      var inputAbs;
      if (input == null) {
        return void 0;
      } else {
        input *= 100;
        inputAbs = Math.abs(input);
        inputAbs = inputAbs < 1 ? 1 : inputAbs;
        if (input === 0) {
          return null;
        } else {
          return inputAbs.toFixed(0) + '%';
        }
      }
    };
  });

  module.filter('abs', function() {
    return function(input) {
      return Math.abs(input);
    };
  });

}).call(this);

//# sourceMappingURL=../b-delta/b-delta.js.map