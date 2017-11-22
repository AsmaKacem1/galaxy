define("utils/utils",["exports","utils/localization"],function(t,e){"use strict";function r(t,e){for(var n in t){var i=t[n];if(_.isObject(i)){var a=e(i);a&&(t[n]=a),r(i,e)}}}function n(t){var e={contentType:"application/json",type:t.type||"GET",data:t.data||{},url:t.url};"GET"==e.type||"DELETE"==e.type?($.isEmptyObject(e.data)||(e.url+=-1==e.url.indexOf("?")?"?":"&",e.url+=$.param(e.data,!0)),e.data=null):(e.dataType="json",e.url=e.url,e.data=JSON.stringify(e.data)),$.ajax(e).done(function(e){if("string"==typeof e)try{e=e.replace("Infinity,",'"Infinity",'),e=jQuery.parseJSON(e)}catch(t){console.debug(t)}t.success&&t.success(e)}).fail(function(e){var r=null;try{r=jQuery.parseJSON(e.responseText)}catch(t){r=e.responseText}t.error&&t.error(r,e.status)}).always(function(){t.complete&&t.complete()})}function i(t,e){for(var r=1,n=0;n<e;n++)r*=10;return Math.round(t*r)/r}Object.defineProperty(t,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(e),s=1024,u=s*s,o=u*s,l=o*s;t.default={cssLoadFile:function(t){$('link[href^="'+t+'"]').length||$('<link href="'+Galaxy.root+t+'" rel="stylesheet">').appendTo("head")},cssGetAttribute:function(t,e){var r=$('<div class="'+t+'"></div>');r.appendTo(":eq(0)");var n=r.css(e);return r.remove(),n},get:function(t){top.__utils__get__=top.__utils__get__||{};var e=JSON.stringify(t);t.cache&&top.__utils__get__[e]?(t.success&&t.success(top.__utils__get__[e]),window.console.debug("utils.js::get() - Fetching from cache ["+t.url+"].")):n({url:t.url,data:t.data,success:function(r){top.__utils__get__[e]=r,t.success&&t.success(r)},error:function(e,r){t.error&&t.error(e,r)}})},merge:function(t,e){return t?_.defaults(t,e):e},iframe:function(t){return'<iframe src="'+t+'" frameborder="0" style="width: 100%; height: 100%;"/>'},bytesToString:function(t,e,r){r=void 0!==r?r:1;var n="";if(t>=l)t/=l,n="TB";else if(t>=o)t/=o,n="GB";else if(t>=u)t/=u,n="MB";else if(t>=s)t/=s,n="KB";else{if(!(t>0))return e?"0 b":"<strong>-</strong>";n="b"}var a="b"==n?t:i(t,r);return e?a+" "+n:"<strong>"+a+"</strong> "+n},uid:function(){return top.__utils__uid__=top.__utils__uid__||0,"uid-"+top.__utils__uid__++},time:function(){var t=new Date,e=(t.getHours()<10?"0":"")+t.getHours(),r=(t.getMinutes()<10?"0":"")+t.getMinutes();return t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear()+", "+e+":"+r},request:n,sanitize:function(t){return $("<div/>").text(t).html()},textify:function(t){if($.isArray(t)){var e=(t=t.toString().replace(/,/g,", ")).lastIndexOf(", ");return-1!=e&&(t=t.substr(0,e)+" or "+t.substr(e+2)),t}return""},isEmpty:function(t){if(t instanceof Array||(t=[t]),0===t.length)return!0;for(var e in t)if(["__null__","__undefined__",null,void 0].indexOf(t[e])>-1)return!0;return!1},deepeach:r,isJSON:function(t){return/^[\],:{}\s]*$/.test(t.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))},clone:function(t){return JSON.parse(JSON.stringify(t)||null)},linkify:function(t){var e,r,n,i;return r=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,e=t.replace(r,'<a href="$1" target="_blank">$1</a>'),n=/(^|[^\/])(www\.[\S]+(\b|$))/gim,e=e.replace(n,'$1<a href="http://$2" target="_blank">$2</a>'),i=/(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim,e=e.replace(i,'<a href="mailto:$1">$1</a>')},appendScriptStyle:function(t){t.script&&""!==t.script&&$("<script/>",{type:"text/javascript"}).text(t.script).appendTo("head"),t.styles&&""!==t.styles&&$("<style/>",{type:"text/css"}).text(t.styles).appendTo("head")},getQueryString:function(t){return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(t).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))},setWindowTitle:function(t){window.document.title=t?"Galaxy "+(window.Galaxy.config.brand?" | "+window.Galaxy.config.brand:"")+" | "+(0,a.default)(t):"Galaxy "+(window.Galaxy.config.brand?" | "+window.Galaxy.config.brand:"")}}});