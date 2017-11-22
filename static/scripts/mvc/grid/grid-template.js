define("mvc/grid/grid-template",["exports","utils/utils"],function(e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(e){return e&&e.__esModule?e:{default:e}}(a);e.default={grid:function(e){var a="";return a=e.embedded?this.grid_header(e)+this.grid_table(e):'<div class="loading-elt-overlay"></div><table><tr><td width="75%">'+this.grid_header(e)+'</td><td></td><td></td></tr><tr><td width="100%" id="grid-message" valign="top"></td><td></td><td></td></tr></table>'+this.grid_table(e),e.info_text&&(a+='<br><div class="toolParamHelp" style="clear: both;">'+e.info_text+"</div>"),a},grid_table:function(e){return'<form method="post" onsubmit="return false;"><table id="grid-table" class="grid"><thead id="grid-table-header"></thead><tbody id="grid-table-body"></tbody><tfoot id="grid-table-footer"></tfoot></table></form>'},grid_header:function(e){var a='<div class="grid-header">';if(e.embedded||(a+="<h2>"+e.title+"</h2>"),e.global_actions){a+='<ul class="manage-table-actions">';var t=e.global_actions.length>=3;t&&(a+='<li><a class="action-button" id="popup-global-actions" class="menubutton">Actions</a></li><div popupmenu="popup-global-actions">');for(var r in e.global_actions){var i=e.global_actions[r];a+='<li><a class="action-button use-target" target="'+i.target+'" href="'+i.url_args+'" onclick="return false;" >'+i.label+"</a></li>"}t&&(a+="</div>"),a+="</ul>"}return e.insert&&(a+=e.insert),a+=this.grid_filters(e),a+="</div>"},header:function(e){var a="<tr>";e.show_item_checkboxes&&(a+="<th>",e.items.length>0&&(a+='<input type="checkbox" id="check_all" name=select_all_checkbox value="true"><input type="hidden" name=select_all_checkbox value="true">'),a+="</th>");for(var t in e.columns){var r=e.columns[t];r.visible&&(a+='<th id="'+r.key+'-header">',r.href?a+='<a href="'+r.href+'" class="sort-link" sort_key="'+r.key+'">'+r.label+"</a>":a+=r.label,a+='<span class="sort-arrow">'+r.extra+"</span></th>")}return a+="</tr>"},body:function(e){var a="";0==e.items.length&&(a+='<tr><td colspan="100"><em>No Items</em></td></tr>');for(var t in e.items){var r=e.items[t],i=r.encode_id;a+="<tr ",e.current_item_id==r.id&&(a+='class="current"'),a+=">",e.show_item_checkboxes&&(a+='<td style="width: 1.5em;"><input type="checkbox" name="id" value="'+i+'" id="'+i+'" class="grid-row-select-checkbox" /></td>');for(var l in e.columns){var n=e.columns[l];if(n.visible){var s="";n.nowrap&&(s='style="white-space:nowrap;"');var o=r.column_config[n.label],d=o.link,c=o.value,p=o.target;"string"===jQuery.type(c)&&(c=c.replace(/\/\//g,"/"));var f="",u="";n.attach_popup&&(f="grid-"+t+"-popup",u="menubutton",""!=d&&(u+=" split"),u+=" popup"),a+="<td "+s+">",d?(0!=e.operations.length&&(a+='<div id="'+f+'" class="'+u+'" style="float: left;">'),a+='<a class="menubutton-label use-target" target="'+p+'" href="'+d+'" onclick="return false;">'+c+"</a>",0!=e.operations.length&&(a+="</div>")):a+='<div id="'+f+'" class="'+u+'"><label id="'+n.label_id_prefix+i+'" for="'+i+'">'+(c||"")+"</label></div>",a+="</td>"}}a+="</tr>",0}return a},footer:function(e){var a="";if(e.use_paging&&e.num_pages>1){var t=e.num_page_links,r=e.cur_page_num,i=e.num_pages,l=t/2,n=r-l,s=0;n<=0&&(s=l-(r-(n=1)));var o,d=l+s,c=r+d;0!=(o=c<=i?0:d-((c=i)+1-r))&&(n-=o)<1&&(n=1),a+='<tr id="page-links-row">',e.show_item_checkboxes&&(a+="<td></td>"),a+='<td colspan="100"><span id="page-link-container">Page:',n>1&&(a+='<span class="page-link" id="page-link-1"><a href="javascript:void(0);" page_num="1" onclick="return false;">1</a></span> ...');for(var p=n;p<c+1;p++)p==e.cur_page_num?a+='<span class="page-link inactive-link" id="page-link-'+p+'">'+p+"</span>":a+='<span class="page-link" id="page-link-'+p+'"><a href="javascript:void(0);" onclick="return false;" page_num="'+p+'">'+p+"</a></span>";c<i&&(a+='...<span class="page-link" id="page-link-'+i+'"><a href="javascript:void(0);" onclick="return false;" page_num="'+i+'">'+i+"</a></span>"),a+="</span>",a+='<span class="page-link" id="show-all-link-span"> | <a href="javascript:void(0);" onclick="return false;" page_num="all">Show All</a></span></td></tr>'}if(e.show_item_checkboxes){a+='<tr><input type="hidden" id="operation" name="operation" value=""><td></td><td colspan="100">For <span class="grid-selected-count"></span> selected items: ';for(var f in e.operations)(g=e.operations[f]).allow_multiple&&(a+='<input type="button" value="'+g.label+'" class="operation-button action-button">&nbsp;');a+="</td></tr>"}var u=!1;for(f in e.operations)if(e.operations[f].global_operation){u=!0;break}if(u){a+='<tr><td colspan="100">';for(f in e.operations){var g=e.operations[f];g.global_operation&&(a+='<a class="action-button" href="'+g.global_operation+'">'+g.label+"</a>")}a+="</td></tr>"}return e.legend&&(a+='<tr><td colspan="100">'+e.legend+"</td></tr>"),a},message:function(e){var a=e.status;return-1!=["success","ok"].indexOf(a)&&(a="done"),'<p><div class="'+a+'message transient-message">'+_.escape(e.message)+'</div><div style="clear: both"></div></p>'},grid_filters:function(e){var a=e.default_filter_dict,t=e.filters,r="none";e.advanced_search&&(r="block");var i=!1;for(var l in e.columns)if("advanced"==(p=e.columns[l]).filterable){var n=p.key,s=t[n],o=a[n];s&&o&&s!=o&&(r="block"),i=!0}var d="block";"block"==r&&(d="none");var c='<div id="standard-search" style="display: '+d+';"><table><tr><td style="padding: 0;"><table>';for(var l in e.columns)"standard"==(p=e.columns[l]).filterable&&(c+=this.grid_column_filter(e,p));c+="</table></td></tr><tr><td>",i&&(c+='<a href="" class="advanced-search-toggle">Advanced Search</a>'),c+="</td></tr></table></div>",c+='<div id="advanced-search" style="display: '+r+'; margin-top: 5px; border: 1px solid #ccc;"><table><tr><td style="text-align: left" colspan="100"><a href="" class="advanced-search-toggle">Close Advanced Search</a></td></tr>';for(var l in e.columns){var p=e.columns[l];"advanced"==p.filterable&&(c+=this.grid_column_filter(e,p))}return c+="</table></div>"},grid_column_filter:function(e,a){e.default_filter_dict;var t=e.filters,r=a.label,i=a.key;"advanced"==a.filterable&&(r=r.toLowerCase());var l="<tr>";if("advanced"==a.filterable&&(l+='<td align="left" style="padding-left: 10px">'+r+":</td>"),l+='<td style="padding-bottom: 1px;">',a.is_text){l+='<form class="text-filter-form" column_key="'+i+'" action="'+e.url+'" method="get" >';for(c in e.columns){var n=e.columns[c],s=t[n.key];s&&"All"!=s&&(n.is_text&&(s=JSON.stringify(s)),l+='<input type="hidden" id="'+n.key+'" name="f-'+n.key+'" value="'+s+'"/>')}l+='<span id="'+i+'-filtering-criteria">';var o=t[i];if(o){var d=jQuery.type(o);if("string"==d&&"All"!=o&&(l+=this.filter_element(i,o)),"array"==d)for(var c in o){var p=o[c],f=o;f=f.slice(c),l+=this.filter_element(i,p)}}l+="</span>";var u="";if("standard"==a.filterable){var g=(u=a.label.toLowerCase()).length;g<20&&(g=20),g+=4}l+='<span class="search-box"><input class="search-box-input" id="input-'+i+'-filter" name="f-'+i+'" type="text" placeholder="'+u+'" size="'+g+'"/><button type="submit" style="background: transparent; border: none; padding: 4px; margin: 0px;"><i class="fa fa-search"></i></button></span></form>'}else{l+='<span id="'+i+'-filtering-criteria">';var v=!1;for(var b in e.categorical_filters[i]){var h=e.categorical_filters[i][b],_="",m="";for(var k in h)_=k,m=h[k];v&&(l+=" | "),v=!0,(p=t[i])&&h[i]&&p==m?l+='<span class="categorical-filter '+i+'-filter current-filter">'+b+"</span>":l+='<span class="categorical-filter '+i+'-filter"><a href="javascript:void(0);" filter_key="'+_+'" filter_val="'+m+'">'+b+"</a></span>"}l+="</span>"}return l+="</td></tr>"},filter_element:function(e,a){return'<span class="text-filter-val">'+(a=t.default.sanitize(a))+'<a href="javascript:void(0);" filter_key="'+e+'" filter_val="'+a+'"><i class="fa fa-times" style="padding-left: 5px; padding-bottom: 6px;"/></a></span>'}}});