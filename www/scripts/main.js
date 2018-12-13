'use-strict'

///////////////////////////////////////////////////////////

const U = {}

U.groupBy = (list, key) => {
  return list.reduce((res, item) => {
    if (!(item[key] in res)) {
      res[item[key]] = []
    }
    res[item[key]].push(item)
    return res
  }, {})
}

///////////////////////////////////////////////////////////

const typologiesColors = {
  // label:
  "Déplacement":
  //   color:
    {r: 0x3F, g: 0xA8, b: 0x7B},

  // label:
  "Domicile" :
   // color:
  {r: 0xB7, g: 0xDB, b: 0x6C},
  //
  // label:
  "Finance":
  // color:
  {r: 0x75, g: 0xCB, b: 0x82},
  //
  // label:
  "Communication":
  // color:
  {r: 0x9B, g: 0xDB, b: 0x6C},
  //
  // label:
  "Profil":
  // color:
  {r: 0x59, g: 0xB3, b: 0x60},
  //
  // label:
  "Loisir":  // color:
  {r: 0x2C, g: 0x85, b: 0x6D},
}

// prototype for metaobject deserialized from json-ld read-only data.
class MetaObject {
  constructor(attrs) {
    $.extend(this, attrs)
  }

  serializeData() {
    const data = $.extend({}, this)
    data.id = data['@id']
    data.typologyColor = typologiesColors[data.typology] || {r: 0x99, g: 0x99, b: 0x99}
    //data.updateFrequency = moment.duration(data.updateFrequency).humanize()
    const flatPropTree = (item, prefix = '') => {
      return item.allProperties
      .map(prop => PLD.getItem(prop, M.items)).reduce((res, prop) => {
        if (PLD.isType(prop, 'object')) {
          return res.concat(flatPropTree(prop, `${prefix}${prop.propName}/`))
        }

        if (PLD.isType(prop, 'array')) {
          return res.concat(flatPropTree(PLD.getItem(prop.items, M.items), `${prefix}${prop.propName}/`))
        }

        res.push({
          propName: `${prefix}${prop.propName}`,
          description: prop.description,
          exampleValue: prop.exampleValue,
          kind: prop.kind,
          id: prop['@id']
        })

        return res
      }, [])
    }

  //  let props = flatPropTree(this)

    // data.mainProperties = props.filter(prop => prop.kind !== 'Metadata')
    // data.secondaryProperties = props.filter(prop => prop.kind === 'Metadata')

    return data
  }

  get allProperties () {
    let props = []
    if (this.hasProperty) {
      PLD.mapOnObject(this.hasProperty, (prop) => props.push(prop))
    }

    if (this.hasOptionalProperty) {
      PLD.mapOnObject(this.hasOptionalProperty, (prop) => props.push(prop))
    }
    return props
  }
}


const M = {}

M.prepare = () => {
  return Promise.all([
    //$.getJSON('http://mesinfos.fing.org/cartographies/wikiapi/items.json'),
    $.getJSON('data/items.json'),
    $.getJSON('data/indexes/sdt_datasets.json'),
    // $.getJSON('http://localhost:8081/items.json'),
    //$.getJSON('http://mesinfos.fing.org/cartographies/wikiapi/indexes/mesinfos_datasets.json'),
    //$.getJSON('http://mesinfos.fing.org/cartographies/wikiapi/indexes/cozy_datasets.json'),
  ])
  .then((res) => {
    PLD.allItems = res[0]

    const addList = (listItem) => {
      // listItem['schema:itemListElement'] = listItem['schema:itemListElement']
      // .map(item => PLD.fillTreeForPredicates(item, ['hasProperty', 'hasOptionalProperty', 'items']))
      PLD.allItems[listItem['@id']] = listItem
    }
    addList(res[1])
    //addList(res[2])


    PLD.mapClassOnType['q:Q102'] = MetaObject

    PLD.mapClassOnType["wq:Q1397073"] = MetaObject
    PLD.mapClassOnType['object'] = MetaObject

    M.datasets = PLD.listInstanceOf("wq:Q1397073")
    M.updateFilter()
  })
}

M.attachEvents = () => {
  $('.toggle').click((ev) => {
    $(ev.currentTarget.parentElement)
    .toggleClass('compact')
    .toggleClass('expanded')
  })

  $('#word_filter').on('input', M.updateFilter)
  $('input:radio').change(M.render)
}

M.render = () => {
  $('#documentation').empty()
  let sorter = $('input:radio:checked').val()
  sorter = sorter || 'typology'
  const byTypology = U.groupBy(
    M.datasets.map((id) => PLD.getItem(id)).sort((a, b) => a.label < b.label ? -1 : 1 ), sorter)

  let index = 0
  byTypology['zAutre'] = byTypology[undefined]
  delete byTypology[undefined]

  byTypology['zAutre2'] = byTypology[""]
  delete byTypology[""]

  Object.keys(byTypology).sort().forEach((typology) => {
    const typologyElem = $(typologyTemplate({ typology }))
    $('#documentation').append(typologyElem)

    byTypology[typology].forEach((dataset) => {
      const data = dataset.serializeData()
      typologyElem.find('ul').append(doctypeTemplate(data))
    })
  })
  M.attachEvents()
  $('.name').textfill({ maxFontPixels: 30, });
}

M.updateFilter = () => {
  let q = $('#word_filter').val()

  let listItem = 'q:Q650'//$('input:radio:checked').val() == 'cozycloud' ? 'q:Q524' : 'q:Q143'

  let highlights = PLD.getItem(listItem)['schema:itemListElement']
  if (q) {
    q = q.toLowerCase()
    highlights = M.treeHighlight((item) => Object.values(item).some((value) => PLD.testOnObject(value,
      (v) => {
        if (typeof v !== "string") return false
        return v.toLowerCase().indexOf(q) !== -1
      }))
    , highlights)
  }

  $('.subject').toggleClass('active', false)
  highlights.forEach((id) =>  $(`[id='${id}']`).toggleClass('active', true))
}


// Return a set of item ids to highlight
M.treeHighlight = (q, items) => {
  const highlight = new Set()

  items.forEach((dataset) => {
    PLD.forEachOnTreeOfPredicates((item => {
      if (q(item)) {
        highlight.add(item['@id'])
      }
    }), dataset, ['items', 'hasProperty', 'hasOptionalProperty'])
  })

  return highlight
}


M.prepare()
.then(M.render)
.then(M.updateFilter)
