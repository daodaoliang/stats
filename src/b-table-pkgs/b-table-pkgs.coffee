module = angular.module 'B.Table.Pkgs', []

module.directive "bTablePkgs", (bDataSvc, bPoP) ->
  templateUrl: 'b-table-pkgs/b-table-pkgs.html'
  restrict: 'E'
  link: (scope) ->
    bDataSvc.fetchAllP.then (data) ->
      # calc period over period totals
      data.data.packages.forEach (pkgObj) ->
        pkgObj.priorRank = pkgObj.rank[0] # [prior, current]
        pkgObj.currentRank = pkgObj.rank[1]
        pkgObj.rankDelta = pkgObj.priorRank - pkgObj.currentRank
        pkgObj.installsSum = bPoP.process pkgObj.installs, 7
        pkgObj.currentInstallsSum = pkgObj.installsSum[1]
        return

      scope.packages = data.data.packages
      return

    scope.setPredicate = (predicate) ->
      if scope.predicate != predicate then scope.reverse = false else scope.reverse = !scope.reverse
      scope.predicate = predicate
      return

    scope.checkPredicate = (predicate, reverse) ->
      scope.predicate == predicate && (reverse == undefined || reverse)

    scope.setPredicate('currentRank')

    scope.hideAngular = true
    scope.toggleHideAngular = ->
      scope.hideAngular = !scope.hideAngular
      return

    return

module.filter 'bPredicateFilter', ->
  (items, predicate) ->
    predicate = predicate.replace('-', '')
    filtered = []
    if items
      items.forEach (item) ->
        if item[predicate]? then filtered.push item
        return
    filtered
