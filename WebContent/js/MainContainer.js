(function(){
	/**
	 * Register the view to be displayed. 
	 */
	brite.registerView("MainContainer", {
		create: function(){
			/**
			 * It is mandatory to have the same name as you have defined
			 * in the template
			 */
			return render("tmpl-MainContainer");
		}, 
		
		postDisplay : function() {
			/**
			 * Triggers the DO_SELECT_FILL_DATA event, defined in 
			 * TableContainer.js where the table will be filled with
			 * the data present in the database
			 */
			this.$el.trigger("DO_SELECT_FILL_DATA");
			/**
			 * Shows up the buttons that were hided before
			 */
			$('.fillDataBtn').fadeIn(0);
			$('.searchDataBtn').fadeIn(0);
		},
		
		/**
		 * Default Events
		 */
		events : {
			/**
			 * Triggers the event when the request button 
			 * is pressed
			 * @param event
			 */
			"click; .requestBtn" : function(event) {
				this.$el.trigger("DO_SELECT_REQ_BUTTON");
			},
			
			/**
			 * Triggers the event when the action selector changes
			 * @param event
			 */
			"change; #actionSelector" : function(event){
				var action = $('#actionSelector').val();
				
				switch(action){
				case 'add' :
					$('#ownerId').fadeOut();
					$('#idTitle').fadeOut();
					break;
				case 'update' :
					$('#ownerId').fadeIn();
					$('#idTitle').fadeOut();
					break;
				case 'search' :
					$('#ownerId').fadeIn();
					$('#idTitle').fadeIn();
					break;
				case 'delete' :
					$('#ownerId').fadeIn();
					$('#idTitle').fadeIn();
					break;
				default:
					break;
				}
			}
		},
		
		/**
		 * Customized events
		 */
		docEvents : {
			/**
			 * This method makes an AJAX call setting the proper URL and
			 * waiting for the Spring Controller response
			 * @param event
			 * @returns
			 */
			"DO_SELECT_REQ_BUTTON" : function(event) {
				var action = $('#actionSelector').val();
				var url = '';
				
				switch(action){
				case 'add' :
					url = 'restApi/account/save';
					break;
				case 'update' :
					url = 'restApi/account/edit';
					break;
				case 'search' :
					url = 'restApi/account/search';
					break;
				case 'delete' :
					url = 'restApi/account/delete';
					break;
				default:
					break;
				}
				
				var id = $('#ownerId').val();
				var firstname = $('#firstname').val();
				var lastname = $('#lastname').val();
				var username = $('#username').val();
				
				var data = {
					'id' : id,
					'firstname' : firstname,
					'lastname' : lastname,
					'username' : username,
				};
				
				return ajaxCall(data, url, action);
			}
		}
	});
})();