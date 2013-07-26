var lastselected, lastsel2;
var curRowId = -1;
var gridContainerId = "#table";
var la;
var usernames;
$(document).ready(
		function() {

			$(gridContainerId).jqGrid(
					{
						url : 'restApi/account/table',
						datatype : "json",
						colNames : [ 'Email', 'Lastname', 'Firstname', 'Group',
								'Active' ],
						/*
						 * colModel: [ { name: 'Email', width: 100, index:
						 * 'Email', searchoptions: { sopt: ['eq', 'ne']} }, {
						 * name: 'Lastname', index: 'LastName', searchoptions: {
						 * sopt: ['eq', 'ne', 'cn']} }, { name: 'Firstname',
						 * index: 'FirstName', searchoptions: { sopt: ['eq',
						 * 'ne', 'cn']} }, { name: 'Group', index: 'Group',
						 * searchoptions: { sopt: ['eq', 'ne', 'cn']} }, { name:
						 * 'Active', index: 'Active', searchoptions: { sopt:
						 * ['eq', 'ne', 'cn']} } ],
						 */

						colNames : [ 'Email', 'Lastname', 'Firstname', 'Group',
								'Active' ],
						colModel : [ {
							name : 'email',
							index : 'email',
							width : 85,
							sortable : true,
							sorttype : "text",
							editable : true,
							editoptions : {
								size : "20",
								maxlength : "30"
							},
							sopt : [ 'cn', 'bw', 'eq', 'ne', 'lt', 'gt', 'ew' ]
						}, {
							name : 'lastname',
							index : 'lastname',
							width : 75,
							editable : true,
							edittype : "text",
							editoptions : {
								size : "20",
								maxlength : "30"
							},
							sopt : [ 'cn', 'bw', 'eq', 'ne', 'lt', 'gt', 'ew' ]
						}, {
							name : 'firstname',
							index : 'firstname',
							width : 85,
							sortable : true,
							sorttype : "text",
							editable : true,
							edittype : "text",
							editoptions : {
								size : "20",
								maxlength : "30"
							},
							sopt : [ 'cn', 'bw', 'eq', 'ne', 'lt', 'gt', 'ew' ]
						}, {
							name : 'groupname',
							index : 'groupname',
							width : 80,
							sortable : true,
							sorttype : "text",
							editable : true,
							edittype : "text",
							editoptions : {
								size : "20",
								maxlength : "30"
							},
							sopt : [ 'cn', 'bw', 'eq', 'ne', 'lt', 'gt', 'ew' ]
						}, {
							name : 'isactive',
							index : 'isactive',
							width : 80,
							sortable : true,
							sorttype : "text",
							editable : true,
							edittype : "text",
							editoptions : {
								size : "20",
								maxlength : "30"
							}
						} ],
						rowNum : jQuery("#table").jqGrid(
								'getRowData'),
						rowList : [ 10, 20, 30, 40 ],
						pager : '#pager',
						sortname : 'username',
						viewrecords : true,
						sortorder : "desc",
						loadonce: true,
						height : "auto",

						/*
						 * ondblClickRow : function(id) { if (id && id !==
						 * lastselected) {
						 * $(gridContainerId).jqGrid('restoreRow',
						 * lastselected); $(gridContainerId).jqGrid('editRow',
						 * id, true); lastselected = id; } },
						 */
						/*
						 * onSelectRow : function(username) { if (username &&
						 * username !== lastselected) {
						 * $(gridContainerId).jqGrid('restoreRow',
						 * lastselected); lastselected = null; } },
						 */
						onSelectRow : function(id) {
							curRowId = id;
							var ids = jQuery("#table").jqGrid(
									'getGridParam', 'selarrrow');
							// alert("test: " + ids + "Length is::"+ids.length);
							/*
							 * usernames = new Array(ids.length); var row;
							 * for(var i=0; i<ids.length;i++) { usernames[i] =
							 * jQuery("#data-grid-container").jqGrid('getCell',
							 * ids[i], 'username'); } temp='Urvin';
							 */
						},
						caption : "",
						height : 500
					});

			jQuery("#table").jqGrid('setGroupHeaders', {
				useColSpanStyle : false,
				groupHeaders : [ {
					startColumnName : 'email',
					numberOfColumns : 4,
					titleText : '<em>Users' + la + '</em>',

				}, {
					startColumnName : 'group',
					numberOfColumns : 1,
					titleText : '<em>Users' + la + '</em>',

				}

				]
			});
			jQuery("#table").jqGrid('navGrid', "#pager", {
				edit : true,
				add : true,
				del : true,
				search: true
			});
			$("#table").jqGrid(
					'#pager',
					{
						edit : true,
						add : true,
						del : true,
						search : true
					},
					{
						savekey : [ true, 13 ],
						reloadAfterSubmit : true,
						jqModal : false,
						closeOnEscape : true,
						closeAfterEdit : true,
						caption : "Edit User",
						url : 'restApi/account/table',
						afterSubmit : function(response, postdata) {
							if (response.responseText == "Success") {
								jQuery("#success").show();
								jQuery("#success").html(
										"User get Added Successfully.");
								jQuery("#success").fadeOut(6000);
								return [ true, response.responseText ];
							} else {
								return [ false, response.responseText ];
							}
						}
					},
					// Add options
					{
						closeOnEscape : true,
						caption : "Add User",
						url : 'restApi/account/table',
						closeAfterAdd : true
					},
					// Delete options
					{
						caption : "Delete User",
						onclickSubmit : function(eparams) {
							var retarr = {};
							// we can use all the grid methods here
							// to obtain some data
							var ids = jQuery("#data-grid-container").jqGrid(
									'getGridParam', 'selarrrow');
							// alert("test: " + ids + "Length is::"+ids.length);

							var row;
							for ( var i = 0; i < ids.length; i++) {
								if (i == 0) {
									usernames = jQuery("#data-grid-container")
											.jqGrid('getCell', ids[i],
													'username');
								} else {
									usernames += ","
											+ jQuery("#data-grid-container")
													.jqGrid('getCell', ids[i],
															'username');
								}
							}
							alert("Usernames :" + usernames);
							retarr = {
								lstUsername : usernames
							};
							return retarr;
						},
						url : 'restApi/account/table'
					}, {
						Find : "Search",
						Reset : "Reset",
						closeOnEscape : true,
						closeAfterSearch : true,
						caption : "Search",
						multipleSearch : true,
						/*
						 * onClickFind : jQuery(gridContainerId).searchGrid(
						 * {sopt:['cn','bw','eq','ne','lt','gt','ew']})
						 */
						/*
						 * var sg = jQuery("#mysearch").filterGrid(...)[0];
						 * sg.triggerSearch();
						 */
						autoSearch : true
					});
			$(".ui-jqgrid-titlebar").hide();
		});