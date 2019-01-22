function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function menuTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (datacontroller, q, sortBy, thematic) {pug_html = pug_html + "\u003Cul class=\"filters\"\u003E\u003Cli\u003E\u003Cinput" + (" class=\"word_filter\""+" title=\"Filtrer les données\" type=\"text\" placeholder=\"Filtrer par mot-clé\""+pug_attr("value", q, true, false)) + "\u002F\u003E\u003Cbutton class=\"word_filter_submit\"\u003EQ\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Cimg class=\"personal_filter\" title=\"Données personnelles\" src=\".\u002Fimg\u002Fideationcard\u002Fpersonal.png\"\u002F\u003E\u003Cimg class=\"notpersonal_filter\" title=\"Données personnelles\" src=\".\u002Fimg\u002Fideationcard\u002Fnotpersonal.png\"\u002F\u003E\u003Cli\u003E\u003Clabel\u003E\u003Cinput" + (" type=\"radio\" name=\"sort\" value=\"random\""+pug_attr("checked", sortBy.random, true, false)) + "\u002F\u003ENon-classé\u003C\u002Flabel\u003E\u003C\u002Fli\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Clabel\u003E\u003Cinput" + (" type=\"radio\" name=\"sort\" value=\"thematic\""+pug_attr("checked", sortBy.thematic, true, false)) + "\u002F\u003EClasser par thématiques\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
// iterate thematic
;(function(){
  var $$obj = thematic;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var val = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Clabel class=\"thematique_filter\"\u003E\u003Cinput" + (" name=\"thematique\""+pug_attr("value", val.label, true, false)+" type=\"checkbox\""+pug_attr("checked", val.checked, true, false)) + "\u002F\u003E" + (pug_escape(null == (pug_interp = val.label) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var val = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Clabel class=\"thematique_filter\"\u003E\u003Cinput" + (" name=\"thematique\""+pug_attr("value", val.label, true, false)+" type=\"checkbox\""+pug_attr("checked", val.checked, true, false)) + "\u002F\u003E" + (pug_escape(null == (pug_interp = val.label) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cli\u003E\u003Clabel\u003E\u003Cinput" + (" type=\"radio\" name=\"sort\" value=\"datacontroller\""+pug_attr("checked", sortBy.datacontroller, true, false)) + "\u002F\u003EClasser par détenteur de données\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
// iterate datacontroller
;(function(){
  var $$obj = datacontroller;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var val = $$obj[pug_index1];
pug_html = pug_html + ("\u003Clabel class=\"thematique_filter\"\u003E\u003C\u002Flabel\u003E\u003Cinput" + (" name=\"datacontroller\""+pug_attr("value", val.label, true, false)+" type=\"checkbox\""+pug_attr("checked", val.checked, true, false)) + "\u002F\u003E" + (pug_escape(null == (pug_interp = val.label) ? "" : pug_interp)));
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var val = $$obj[pug_index1];
pug_html = pug_html + ("\u003Clabel class=\"thematique_filter\"\u003E\u003C\u002Flabel\u003E\u003Cinput" + (" name=\"datacontroller\""+pug_attr("value", val.label, true, false)+" type=\"checkbox\""+pug_attr("checked", val.checked, true, false)) + "\u002F\u003E" + (pug_escape(null == (pug_interp = val.label) ? "" : pug_interp)));
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cli\u003E\u003Cbutton class=\"add_data\"\u003Eajouter une donnée\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";}.call(this,"datacontroller" in locals_for_with?locals_for_with.datacontroller:typeof datacontroller!=="undefined"?datacontroller:undefined,"q" in locals_for_with?locals_for_with.q:typeof q!=="undefined"?q:undefined,"sortBy" in locals_for_with?locals_for_with.sortBy:typeof sortBy!=="undefined"?sortBy:undefined,"thematic" in locals_for_with?locals_for_with.thematic:typeof thematic!=="undefined"?thematic:undefined));;return pug_html;}