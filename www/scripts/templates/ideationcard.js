function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function ideationcardTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (description, kind, kindImgUrl, label, sourceDataController, support, thematique, typologyColor) {pug_html = pug_html + "\u003Cli class=\"ideationcard\"\u003E\u003Cdiv" + (" class=\"typology\""+pug_attr("style", pug_style("background-color: rgb(" + typologyColor.r + "," + typologyColor.g + "," + typologyColor.b + ");"), true, false)) + "\u003E\u003Cdiv class=\"thematique\"\u003E" + (pug_escape(null == (pug_interp = thematique) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"kind\""+pug_attr("title", kind, true, false)) + "\u003E\u003Cimg" + (pug_attr("src", kindImgUrl, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"datacontroller\" title=\"Responsable de traitement\"\u003E\u003Cimg src=\"img\u002Fideationcard\u002Fbank.png\"\u002F\u003E" + (pug_escape(null == (pug_interp = sourceDataController) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"name\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = label) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"description\"\u003E" + (pug_escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"support\" title=\"Support\"\u003E\u003Cimg src=\"img\u002Fideationcard\u002Ffile.png\"\u002F\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = support) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";}.call(this,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"kind" in locals_for_with?locals_for_with.kind:typeof kind!=="undefined"?kind:undefined,"kindImgUrl" in locals_for_with?locals_for_with.kindImgUrl:typeof kindImgUrl!=="undefined"?kindImgUrl:undefined,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined,"sourceDataController" in locals_for_with?locals_for_with.sourceDataController:typeof sourceDataController!=="undefined"?sourceDataController:undefined,"support" in locals_for_with?locals_for_with.support:typeof support!=="undefined"?support:undefined,"thematique" in locals_for_with?locals_for_with.thematique:typeof thematique!=="undefined"?thematique:undefined,"typologyColor" in locals_for_with?locals_for_with.typologyColor:typeof typologyColor!=="undefined"?typologyColor:undefined));;return pug_html;}