/**
 * This class is kind of important. It is in charge of all the logic
 * for displaying the data in the table and its proper configurations
 */
(function() {
	
	/* Column Names */
	var colNamesList = [ 'id', 'username', 'firstname', 'lastname' ];
	
	/* Defining the configuration types of each column*/
	var colModelList = [ 
         {name : 'id', index : 'id',editable : true},
         {name : 'username', index : 'username', editable : true},
         {name : 'firstname', index : 'firstname', editable : true},
         {name : 'lastname', index : 'lastname', editable : true} ];
	
	/*The table will read this array to display its data inside it */
	var data = [];
	
	/**
	 * Reads data information and displays it in the table
	 */
	var fillTable = function() {
		for ( var i = 0; i <= data.length; i++) {
			jQuery("#table").jqGrid('addRowData', i + 1, data[i]);
		}
	};
	
	/**
	 * This is the most important method here. Set all
	 * the table configuration 
	 */ 
	var initTable = function() {
		$("#table").jqGrid('GridUnload');
		jQuery("#table").jqGrid({
			datatype : "json",
			url: 'restApi/account/getAllAccounts',
			jsonReader: {
                repeatitems: true,
                page: 'page',
                total: 'totalPages',
                rows: 'rows',
                records: function(obj) { 
                	console.log(obj);
                	data = [];	
                	for(var i = 0; i< obj.content.length; i++){
                		data.push(obj.content[i]);
                	}
                	fillTable();
                }
            },
			colNames : colNamesList, 
			colModel : colModelList,
			rowList : [ 5, 10, 15 ],
			pager : '#pager',
			sortname : 'id',
			viewrecords : true,
			sortorder : "asc",
			caption : "Account List",
			height: "auto",
		});
	};
	
	/**
	 * Register the view
	 */
	brite.registerView("TableContainer", {
		emptyParent : true
	}, {
		/**
		 * Render the view
		 * @returns
		 */
		create : function() {
			return render("tmpl-TableContainer");
		},

		postDisplay : function() {
		},
		
		/**
		 * Default Events
		 */
		events : {
			'click; .fillDataBtn' : function(event) {
				this.$el.trigger("DO_SELECT_FILL_DATA");
			},
			
			'click; .searchDataBtn' : function(event) {
				this.$el.trigger("DO_SELECT_SEARCH");
			}
		},
		
		/**
		 * Custom Events
		 */
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
			}
		}
	});
})();
