function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function adddatasetTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (natures, thematiques) {pug_html = pug_html + "\u003Cform class=\"ideationcard\" id=\"adddataset\" method=\"post\" name=\"theform\" action=\"\"\u003E\u003Cselect class=\"typology\" id=\"inputthematique\"\u003E";
// iterate thematiques
;(function(){
  var $$obj = thematiques;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var t = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var t = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003Cinput class=\"name\" id=\"inputname\" type=\"text\" placeholder=\"Inscrivez ici le nom de la donnée\"\u002F\u003E\u003Cinput class=\"description\" id=\"inputdescription\" type=\"text\" placeholder=\"Précisez ici\"\u002F\u003E\u003Cinput id=\"inputsourcedatacontroller\" type=\"text\" placeholder=\"Détenteur\"\u002F\u003E\u003Cinput id=\"inputsupport\" type=\"text\" placeholder=\"support\"\u002F\u003E\u003Cselect id=\"inputnature\"\u003E";
// iterate natures
;(function(){
  var $$obj = natures;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var t = $$obj[pug_index1];
pug_html = pug_html + "\u003Coption\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var t = $$obj[pug_index1];
pug_html = pug_html + "\u003Coption\u003E" + (pug_escape(null == (pug_interp = t) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003Cinput id=\"inputcomment\" type=\"text\" placehoolder=\"support\"\u002F\u003E\u003Cinput class=\"button\" type=\"submit\" name=\"submit\" id=\"submit_btn\" value=\"Send\"\u002F\u003E\u003C\u002Fform\u003E";}.call(this,"natures" in locals_for_with?locals_for_with.natures:typeof natures!=="undefined"?natures:undefined,"thematiques" in locals_for_with?locals_for_with.thematiques:typeof thematiques!=="undefined"?thematiques:undefined));;return pug_html;}