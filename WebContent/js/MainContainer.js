(function(){
	brite.registerView("MainContainer", {
		create: function(){
			return render("tmpl-MainContainer");
		}, 
		
		postDisplay : function() {
			this.$el.trigger("DO_SELECT_FILL_DATA");
		},
		
		events : {
			"click; .requestBtn" : function(event) {
				this.$el.trigger("DO_SELECT_REQ_BUTTON");
			},
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
		
		docEvents : {
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