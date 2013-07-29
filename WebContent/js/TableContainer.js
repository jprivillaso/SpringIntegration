(function() {

	var colNamesList = [ 'id', 'username', 'firstname', 'lastname' ];
	var colModelList = [ 
         {name : 'id', index : 'id',editable : true},
         {name : 'username', index : 'username', editable : true},
         {name : 'firstname', index : 'firstname', editable : true},
         {name : 'lastname', index : 'lastname', editable : true} ];
	
	var data = [];
	
	var fillTable = function() {
		console.log('before displaying the data in the grid');
		for ( var i = 0; i <= data.length; i++) {
			jQuery("#table").jqGrid('addRowData', i + 1, data[i]);
		}
	};
	
	var initTable = function() {
		$("#table").jqGrid('GridUnload');
		jQuery("#table").jqGrid({
			datatype : "json",
			url: 'restApi/account/getAllAccounts?pageNumber=' + 
				$('#viewId').val() + '&rowsxView=' + 
					$('#rowsxView').val(),
			jsonReader: {
                repeatitems: false,
                page:  function(obj) { return 1; },
                total: function(obj) { return 1; },
                records: function(obj) { 
                	data = [];	
                	for(var i = 0; i< obj.content.length; i++){
                		data.push(obj.content[i]);
                	}
                	fillTable();
                },
            },
			colNames : colNamesList, 
			colModel : colModelList,
			rowList : [ 5, 10, 15 ],
			pager : '#pager',
			sortname : 'id',
			viewrecords : true,
			sortorder : "asc",
			caption : "Account List",
			height: "auto"
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
			'click; .fillDataBtn' : function(event) {
				this.$el.trigger("DO_SELECT_FILL_DATA");
			},
			
			'click; .searchDataBtn' : function(event) {
				this.$el.trigger("DO_SELECT_SEARCH");
			},
		},

		docEvents : {
			'DO_SELECT_FILL_DATA' : function() {
				initTable();
			},
			
			'DO_SELECT_SEARCH' : function(event) {
				var url = 'restApi/account/search';
				
				var id = jQuery("#table").jqGrid('getGridParam','selrow');
				var ret = jQuery("#table").jqGrid('getRowData',id);
				
				if (ret.id != null){
					var data = {
						'id' : ret.id,
					};
					return ajaxCall(data, url, "search");
				}else{
					alert('select a row please');
				}
			},
		}
	});
})();
