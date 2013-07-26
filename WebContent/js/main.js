// Set brite.js to load on demand
brite.viewDefaultConfig.loadTmpl = true;
brite.viewDefaultConfig.loadCss = true;

// The first view that the page is going to dispay
$(document).ready(function() {
	brite.display("MainView", "#pageBody");
});

// Handlebars to charge the templates
Handlebars.templates = Handlebars.templates || {};
function render(templateName, data) {
	var tmpl = Handlebars.templates[templateName];

	if (!tmpl) {
		var tmplContent = $("#" + templateName).html();
		tmpl = Handlebars.compile(tmplContent);
		Handlebars.templates[templateName] = tmpl;
	}
	return tmpl(data);
}

var ajaxCall = function(result, url, action){
	$.ajax({
		data : result,
		type : 'GET',
		url : url,
		success : function(result) {
			if(result != null && result != ""){
				if(action == "search"){
					$('#result').html('<p>' + result.username + '</p>');
				}else{
					$('#result').html('<p>' + result + '</p>');
				}
			}else{
				$('#result').html('<p> No information found </p>');
			}
		},
		error : function() {
			console.log('Error');
		}
	});
};