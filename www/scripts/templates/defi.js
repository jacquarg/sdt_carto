function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function defiTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (defi) {pug_html = pug_html + "\u003Cdiv" + (" class=\"defi\""+pug_attr("id", defi, true, false)) + "\u003E\u003Ch3\u003EDéfi : " + (pug_escape(null == (pug_interp = defi) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\u003Cul class=\"datasets\"\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";}.call(this,"defi" in locals_for_with?locals_for_with.defi:typeof defi!=="undefined"?defi:undefined));;return pug_html;}