function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)s=pug_classes(r[g]),s&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+="",";"!==r[r.length-1]?r+";":r}function doctypeTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (availability, description, id, index, label, mainProperties, secondaryProperties, sourceDataController, spirceDataController, typology, typologyColor, updateFrequency) {pug_mixins["row"] = pug_interp = function(d, cls){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Ctr" + (pug_attr("class", pug_classes(["subject",cls], [false,true]), false, false)+pug_attr("id", d.id, true, false)) + "\u003E\u003Ctd class=\"nom\"\u003E" + (pug_escape(null == (pug_interp = d.propName) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd class=\"description\"\u003E" + (pug_escape(null == (pug_interp = d.description) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd class=\"exemple\"\u003E" + (pug_escape(null == (pug_interp = d.exampleValue) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
};
pug_html = pug_html + "\u003Cli" + (" class=\"compact subject active\""+pug_attr("id", id, true, false)) + "\u003E\u003Cdiv class=\"toggle\"\u003E\u003Cdiv class=\"ideationcard\"\u003E\u003Cdiv" + (" class=\"typology\""+pug_attr("style", pug_style("background-color: rgb(" + typologyColor.r + "," + typologyColor.g + "," + typologyColor.b + ");"), true, false)) + "\u003E" + (pug_escape(null == (pug_interp = typology) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"name\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = label) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
if (sourceDataController) {
pug_html = pug_html + "\u003Cimg" + (" class=\"holder\""+pug_attr("src", "img/creationcard/logo_" + sourceDataController.toLowerCase() + ".png", true, false)+pug_attr("title", spirceDataController, true, false)) + "\u002F\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"description\"\u003E" + (pug_escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"frequency\"\u003E\u003Cimg src=\"img\u002Fcreationcard\u002Ffrequency_gauge.svg\"\u002F\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = updateFrequency) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
if (index) {
pug_html = pug_html + "\u003Cdiv class=\"index\"\u003E" + (pug_escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
if (availability =='soon') {
pug_html = pug_html + "\u003Cdiv class=\"soon\"\u003E\u003Cdiv\u003Edisponible prochainement\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"details\"\u003E\u003Ctable class=\"data\"\u003E\u003Cthead\u003E\u003Ctr\u003E\u003Cth\u003EDonnée\u003C\u002Fth\u003E\u003Cth\u003EDescription\u003C\u002Fth\u003E\u003Cth\u003EExemple\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E\u003Ctbody class=\"compact\"\u003E";
// iterate mainProperties
;(function(){
  var $$obj = mainProperties;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var d = $$obj[pug_index0];
if ((d)) {
pug_mixins["row"](d);
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var d = $$obj[pug_index0];
if ((d)) {
pug_mixins["row"](d);
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003Ctr class=\"showmetadata toggle\"\u003E\u003Ctd\u003EMetadata\u003C\u002Ftd\u003E\u003Ctd\u003E◢\u003C\u002Ftd\u003E\u003Ctd\u003E&nbsp;\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
// iterate secondaryProperties
;(function(){
  var $$obj = secondaryProperties;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var d = $$obj[pug_index1];
if ((d)) {
pug_mixins["row"](d, 'metadata');
}
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var d = $$obj[pug_index1];
if ((d)) {
pug_mixins["row"](d, 'metadata');
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";}.call(this,"availability" in locals_for_with?locals_for_with.availability:typeof availability!=="undefined"?availability:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"index" in locals_for_with?locals_for_with.index:typeof index!=="undefined"?index:undefined,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined,"mainProperties" in locals_for_with?locals_for_with.mainProperties:typeof mainProperties!=="undefined"?mainProperties:undefined,"secondaryProperties" in locals_for_with?locals_for_with.secondaryProperties:typeof secondaryProperties!=="undefined"?secondaryProperties:undefined,"sourceDataController" in locals_for_with?locals_for_with.sourceDataController:typeof sourceDataController!=="undefined"?sourceDataController:undefined,"spirceDataController" in locals_for_with?locals_for_with.spirceDataController:typeof spirceDataController!=="undefined"?spirceDataController:undefined,"typology" in locals_for_with?locals_for_with.typology:typeof typology!=="undefined"?typology:undefined,"typologyColor" in locals_for_with?locals_for_with.typologyColor:typeof typologyColor!=="undefined"?typologyColor:undefined,"updateFrequency" in locals_for_with?locals_for_with.updateFrequency:typeof updateFrequency!=="undefined"?updateFrequency:undefined));;return pug_html;}