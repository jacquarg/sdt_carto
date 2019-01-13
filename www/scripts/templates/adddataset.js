function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function adddatasetTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (kind, thematiques, typologyColor) {pug_html = pug_html + "\u003Cdiv class=\"modal\"\u003E\u003Cdiv class=\"close\"\u003EX\u003C\u002Fdiv\u003E\u003Cform class=\"ideationcard\" id=\"adddataset\" method=\"post\" name=\"theform\" action=\"\"\u003E\u003Cdiv" + (" class=\"typology\""+pug_attr("style", pug_style("background-color: rgb(" + typologyColor.r + "," + typologyColor.g + "," + typologyColor.b + ");"), true, false)) + "\u003E\u003Cselect id=\"inputthematique\" name=\"thematique\"\u003E";
// iterate thematiques
;(function(){
  var $$obj = thematiques;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var t = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug_attr("value", t, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var t = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug_attr("value", t, true, false)) + "\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003Cdiv" + (" class=\"kind\""+pug_attr("title", kind, true, false)) + "\u003E\u003Clabel class=\"ok\"\u003E\u003Cinput id=\"kind\" type=\"radio\" name=\"kind\" value=\"personal\" checked=\"checked\"\u002F\u003E\u003Cimg src=\"img\u002Fideationcard\u002Fpersonal.png\"\u002F\u003E\u003C\u002Flabel\u003E\u003Clabel class=\"ko\"\u003E\u003Cinput id=\"kind\" type=\"radio\" name=\"kind\" value=\"notpersonal\"\u002F\u003E\u003Cimg src=\"img\u002Fideationcard\u002Fnotpersonal.png\"\u002F\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"datacontroller\" title=\"Responsable de traitement\"\u003E\u003Cimg src=\"img\u002Fideationcard\u002Fbank.png\"\u002F\u003E\u003Cinput id=\"inputsourcedatacontroller\" type=\"text\" placeholder=\"Détenteur *\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"name\"\u003E\u003Cinput id=\"inputname\" type=\"text\" placeholder=\"Inscrivez ici le nom de la donnée *\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"description\"\u003E\u003Ctextarea id=\"inputdescription\" type=\"text\" placeholder=\"Précisez ici\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"support\" title=\"Support\"\u003E\u003Cimg src=\"img\u002Fideationcard\u002Ffile.png\"\u002F\u003E\u003Cinput id=\"inputsupport\" type=\"text\" placeholder=\"support\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Ctextarea id=\"inputcomment\" type=\"text\" placeholder=\"Optionnel : un commentaires complémentaire sur la donnée.\"\u003E\u003C\u002Ftextarea\u003E\u003Cinput class=\"button\" type=\"submit\" name=\"submit\" id=\"submit_btn\" value=\"Send\"\u002F\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";}.call(this,"kind" in locals_for_with?locals_for_with.kind:typeof kind!=="undefined"?kind:undefined,"thematiques" in locals_for_with?locals_for_with.thematiques:typeof thematiques!=="undefined"?thematiques:undefined,"typologyColor" in locals_for_with?locals_for_with.typologyColor:typeof typologyColor!=="undefined"?typologyColor:undefined));;return pug_html;}