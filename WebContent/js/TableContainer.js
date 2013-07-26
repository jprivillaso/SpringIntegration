(function() {

	var colNames1 = [ 'id', 'username', 'firstname', 'lastname' ];
	var colModel1 = [ 
         {name : 'id', index : 'id',editable : true},
         {name : 'username', index : 'username', editable : true},
         {name : 'firstname', index : 'firstname', editable : true},
         {name : 'lastname', index : 'lastname', editable : true} ];
	
	var data = [];
	var initTable = function() {
		$("#table").jqGrid('GridUnload');
		jQuery("#table").jqGrid({
			datatype : "local",
			colNames : colNames1, 
			colModel : colModel1,
			rowList : [ 5, 10, 15 ],
			pager : '#pager',
			sortname : 'id',
			viewrecords : true,
			sortorder : "asc",
			caption : "Account List",
			height: "auto"
		});
		for ( var i = 0; i <= data.length; i++) {
			jQuery("#table").jqGrid('addRowData', i + 1, data[i]);
		}
	};

	var fillData = function() {
		$.ajax({
			datatype : 'JSON',
			url : 'restApi/account/getAllAccounts',
			success : function(result){ 				
				data = [];
				data.push(result);
				initTable();
			}
		});
	};

	brite.registerView("TableContainer", {
		emptyParent : true
	}, {
		create : function() {
			return render("tmpl-TableContainer");
		},

		postDisplay : function() {

		},

		events : {
			'click; .showTblBtn' : function(event) {
				this.$el.trigger("DO_SELECT_SHOW_TABLE");
			},

			'click; .fillDataBtn' : function(event) {
				this.$el.trigger("DO_SELECT_FILL_DATA");
			},
			
			'click; .searchDataBtn' : function(event) {
				this.$el.trigger("DO_SELECT_SEARCH");
			},
		},

		docEvents : {
			'DO_SELECT_SHOW_TABLE' : function(event) {
				console.log('after function btn pressed');
				initTable();
			},

			'DO_SELECT_FILL_DATA' : function() {
				fillData();
			},
			
			'DO_SELECT_SEARCH' : function(event) {
				var url = 'restApi/account/search';
				
				var id = jQuery("#table").jqGrid('getGridParam','selrow');
				var ret = jQuery("#table").jqGrid('getRowData',id);
				
				if (ret.id != null){
					var data = {
						'id' : ret.id,
					};
					return ajaxCall(data, url);
				}else{
					alert('select a row please');
				}
			},
		}
	});
})();
