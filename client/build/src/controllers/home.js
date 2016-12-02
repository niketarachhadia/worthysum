 wsApp.controller('home', function ($scope,$http,itemModel) {
		var emptyAsset=itemModel.emptyAssetFactory();
		var emptyLiability=itemModel.emptyLiabilityFactory();
        $scope.liabilities=[emptyLiability];
		$scope.assets=[emptyAsset];
	
	}); 