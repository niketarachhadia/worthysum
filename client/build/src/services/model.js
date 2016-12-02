angular.module('worthysum').service('itemModel', function() {
    this.liabilityFactory = function (desc,subType,amount,lender,dueDate,paidAmount,isIncomeGenerating,customAttrs,mode) {
        var liability=this.itemFactory(desc,subType,amount,lender,mode);
		liability.dueDate=dueDate;
		liability.paidAmount=paidAmount;
		liability.isIncomeGenerating=isIncomeGenerating;
		liability.type='liability';
		liability=this.addCustomAttrs(liability,customAttrs);
		return liability;
    }
	this.emptyLiabilityFactory = function () {
        var liability=this.itemFactory("","other",0,"","edit");
		liability.dueDate="";
		liability.paidAmount=0;
		liability.isIncomeGenerating=false;
		liability.type='liability';
		return liability;
    }
	this.emptyAssetFactory = function () {
        var asset=this.itemFactory("","other",0,"","edit");
		asset.financed=false;
		asset.isIncomeGenerating=false;
		asset.isLiquid=true;
		asset.type='asset';
		return asset;
    }
	this.assetFactory = function (desc,subType,amount,borrower,financed,isIncomeGenerating,isLiquid,customAttrs,mode) {
        var asset=this.itemFactory(desc,subType,amount,borrower,mode);
		asset.financed=financed;
		asset.isIncomeGenerating=isIncomeGenerating;
		asset.isLiquid=isLiquid;
		asset.type='asset';
		asset=this.addCustomAttrs(asset,customAttrs);
		return asset;
    }
	this.addCustomAttrs= function(item, customAttrs){
		for(index in customAttrs){
			var key=customAttrs[index].key;
			var value=customAttrs[inidex].values;
			item[key]=valuel
		}
		return item;
	}
	
	this.itemFactory= function(desc,subType,amount,entity,mode){
		return {
			desc:desc,
			subType:subType,
			amount:amount,
			entity:entity,
			mode:mode
		};
	}
});