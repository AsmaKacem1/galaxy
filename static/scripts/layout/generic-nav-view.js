define("layout/generic-nav-view",["exports","mvc/ui/ui-modal"],function(a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=function(a){return a&&a.__esModule?a:{default:a}}(e),i=Backbone.View.extend({initialize:function(){this.modal=null},makeModalIframe:function(a){var e=null,d=null,t='<iframe class="f-iframe fade in communication-iframe" src="'+(window.Galaxy.config.communication_server_host+":"+window.Galaxy.config.communication_server_port+("?username="+escape(window.Galaxy.user.attributes.username)+"&persistent_communication_rooms="+escape(window.Galaxy.config.persistent_communication_rooms)))+'"> </iframe>';return $(".chat-modal").length>0&&$(".chat-modal").remove(),i.modal=new o.default.View({body:t,height:350,width:600,closing_events:!0,title_separator:!1,cls:"ui-modal chat-modal"}),i.modal.show(),e=$(".chat-modal .modal-header"),d=$(".chat-modal .modal-body"),e.addClass("modal-header-body"),d.addClass("modal-header-body"),e.find("h4").remove(),e.removeAttr("min-height padding border"),e.append('<i class="fa fa-comment" aria-hidden="true" title="Communicate with other users"></i><i class="fa fa-expand expand-compress-modal" aria-hidden="true" title="Maximize"></i><i class="fa fa-times close-modal" aria-hidden="true" title="Close"></i>'),$(".close-modal").click(function(a){$(".chat-modal").css("display","none")}),$(".expand-compress-modal").click(function(a){$(".expand-compress-modal").hasClass("fa-expand")?($(".chat-modal .modal-dialog").width("1000px"),$(".chat-modal .modal-body").height("575px"),$(".expand-compress-modal").removeClass("fa-expand").addClass("fa-compress"),$(".expand-compress-modal").attr("title","Minimize"),$(".expand-compress-modal").css("margin-left","96.2%")):($(".chat-modal .modal-dialog").width("600px"),$(".chat-modal .modal-body").height("350px"),$(".expand-compress-modal").removeClass("fa-compress").addClass("fa-expand"),$(".expand-compress-modal").attr("title","Maximize"),$(".expand-compress-modal").css("margin-left","93.2%"))}),this},render:function(){return{id:"show-chat-online",icon:"fa-comment-o",tooltip:"Chat online",visible:!1,onclick:this.makeModalIframe}}});a.default={GenericNavView:i}});