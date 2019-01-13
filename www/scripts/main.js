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

U.putInManyGroupsBy = (list, key) => {
  const groupItem = (groupKey, item, res) => {
    if (!(groupKey in res)) {
      res[groupKey] = []
    }
    res[groupKey].push(item)
  }
  return list.reduce((res, item) => {
    if (Array.isArray(item[key])) {
      item[key].forEach((groupKey) => groupItem(groupKey, item, res))
    } else {
      groupItem(item[key], item, res)
    }

    return res
  }, {})
}

///////////////////////////////////////////////////////////

const typologiesColors = {
  // label:
  "TEE":
  //   color:
    {r: 80, g: 141, b: 129},

  // label:
  "Mobilité" :
   // color:
  {r: 78, g: 54, b: 188},
  //
  // label:
  "Ados":
  // color:
  {r: 74, g: 56, b: 199},
}

// prototype for metaobject deserialized from json-ld read-only data.
class MetaObject {
  constructor(attrs) {
    $.extend(this, attrs)
  }

  serializeData() {
    const data = $.extend({}, this)
    data.id = data['@id']
    data.typologyColor = typologiesColors[data.thematique] || {r: 0x99, g: 0x99, b: 0x99}
    const nature2NatureImgUrl = (it) => {
      if (it && it.toLowerCase().indexOf("personnelle") != -1) {
        return "img/ideationcard/personal.png"
      } else {
        return "img/ideationcard/notpersonal.png"
      }
    }
    data.kindImgUrl = nature2NatureImgUrl(data.kind)
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
  // Prepare filters
  M.filters = {
    thematique: {
      tee: true,
      ados: true,
      mobilite: true
    },
    q: null,
    personal: true,
    notpersonal: true,
  }


  return Promise.all([
    //$.getJSON('http://mesinfos.fing.org/cartographies/wikiapi/items.json'),
    $.getJSON('data/items.json'),
    $.getJSON('data/indexes/sdt_datasets.json'),
    $.getJSON('data/contrib_items.json'),
    // $.getJSON('http://localhost:8081/items.json'),
    //$.getJSON('http://mesinfos.fing.org/cartographies/wikiapi/indexes/mesinfos_datasets.json'),
    //$.getJSON('http://mesinfos.fing.org/cartographies/wikiapi/indexes/cozy_datasets.json'),
  ])
  .then((res) => {
    PLD.allItems = res[0]
    $.extend(PLD.allItems, res[2])


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
  })
}

M.attachEvents = () => {
  $('.word_filter').on('input', (e) => {
    console.log(e)
    M.filters.q = $(e.target).val()
    M.updateView()
  })
  $('input:checkbox').change((e) => {
    e.preventDefault()
    M.filters.thematique[e.target.value] = !M.filters.thematique[e.target.value]
    M.updateView()
  })
  $('.personal_filter').click((e) => {
    e.preventDefault()
    M.filters.personal = !M.filters.personal
    M.updateView()
  })
  $('.notpersonal_filter').click((e) => {
    e.preventDefault()
    M.filters.notpersonal = !M.filters.notpersonal
    M.updateView()
  })
  $('.add_data').click(M.initForm)
}

M.updateView = () => {
  if (M.isUpdating) {
    M.shouldRefresh = true
  } else {
    M.isUpdating = true
    M.shouldRefresh = false
    M.prepareRender()
    M.render()
    M.isUpdating = false
    if (M.shouldRefresh) {
      M.updateView()
    }
  }

}

M.prepareRender = () => {
  M.toDisplayDatasets = M.datasets.slice()
  console.log(M.toDisplayDatasets)

  // Filter by keyword
  console.log('toto')
  let q = M.filters.q
  if (q) {
    q = q.toLowerCase()
    M.toDisplayDatasets = M.toDisplayDatasets.filter((it) => {
      return it.description && it.description.toLowerCase().indexOf(q) != -1 ||
        it.label && it.label.toLowerCase().indexOf(q) != -1
    })
  }

  // filter by kind
  M.toDisplayDatasets = M.toDisplayDatasets.filter((it) => {
      const personal = it.kind && it.kind.toLowerCase().indexOf("personnelle") != -1
      return M.filters.personal && personal || M.filters.notpersonal && !personal
  })


  // Filter by thematique
  if ($('input:checked').length > 0) {
    const checked = {
      "TEE": M.filters.thematique['tee'],
      "Ados": M.filters.thematique['ados'],
      "Mobilité": M.filters.thematique['mobilite'],
    }
    M.toDisplayDatasets = M.toDisplayDatasets.filter((it) => {
      return checked[it.thematique] == true
    })
  }
}

M.render = () => {
  // render filters

  Object.entries(M.filters.thematique).forEach((it) =>
      $('input[value="' + it[0] + '"]').prop('checked', it[1]))

  $('.word_filter').val(M.filters.q)

  $('.notpersonal_filter').toggleClass('active', M.filters.notpersonal)
  $('.personal_filter').toggleClass('active', M.filters.personal)

  // render list
  console.log("1")
  $('#documentation').empty()
  const byThematique = U.groupBy(M.toDisplayDatasets.map((id) => PLD.getItem(id)), "thematique")
  let autres = []
  autres = autres.concat(byThematique[undefined] || [])
  delete byThematique[undefined]
  autres = autres.concat(byThematique[""] || [])
  delete byThematique[""]
  byThematique["~"] = autres

  console.log("2")
  console.log(byThematique)
  Object.keys(byThematique).sort().forEach((thematique) => {
    const thematiqueElem = $(thematiqueTemplate({ thematique }))
    $('#documentation').append(thematiqueElem)
    console.log("3")

    const byDefi = U.putInManyGroupsBy(byThematique[thematique].sort((a, b) => a.label < b.label ? -1 : 1 ), "defi")
    Object.keys(byDefi).sort().forEach((defi) => {
      const defiElem = $(defiTemplate({ defi }))
      thematiqueElem.find('ul.defis').append(defiElem)
      console.log("4")

      byDefi[defi].forEach((dataset) => {
        const data = dataset.serializeData()
        defiElem.find('ul.datasets').append(ideationcardTemplate(data))
        console.log("5")

      })
    })

  })
  $('.name').textfill({ maxFontPixels: 30, });

  //
  //
  // let sorter = $('input:radio:checked').val()
  // sorter = sorter || 'typology'
  // const byTypology = U.groupBy(
  //   M.datasets.map((id) => PLD.getItem(id)).sort((a, b) => a.label < b.label ? -1 : 1 ), sorter)
  //
  // let index = 0
  // byTypology['zAutre'] = byTypology[undefined]
  // delete byTypology[undefined]
  //
  // byTypology['zAutre2'] = byTypology[""]
  // delete byTypology[""]
  //
  // Object.keys(byTypology).sort().forEach((typology) => {
  //   const typologyElem = $(typologyTemplate({ typology }))
  //   $('#documentation').append(typologyElem)
  //
  //   byTypology[typology].forEach((dataset) => {
  //     const data = dataset.serializeData()
  //     typologyElem.find('ul').append(doctypeTemplate(data))
  //   })
  // })
  // M.attachEvents()
  // $('.name').textfill({ maxFontPixels: 30, });
}

// M.updateFilter = () => {
//   console.log('toto')
//   let q = $('#word_filter').val()

//   let listItem = 'q:Q650'//$('input:radio:checked').val() == 'cozycloud' ? 'q:Q524' : 'q:Q143'

//   let highlights = PLD.getItem(listItem)['schema:itemListElement']

//   if (q) {
//     q = q.toLowerCase()
//     highlights = M.treeHighlight((item) => Object.values(item).some((value) => PLD.testOnObject(value,
//       (v) => {
//         if (typeof v !== "string") return false
//         return v.toLowerCase().indexOf(q) !== -1
//       }))
//     , highlights)
//   }

//   if ($('input:checked').length > 0) {
//     const checked = {
//       "TEE": $('input[value="tee"]').is(':checked'),
//       "Ados": $('input[value="ados"]').is(':checked'),
//       "Mobilité": $('input[value="mobilite"]').is(':checked'),
//     }
//     highlights = highlights.filter((id) => {
//       console.log(id)
//       let item = PLD.allItems[id]

//       return item != null && checked[item.thematique] == true
//     })
//   }


//   $('.subject').toggleClass('active', false)
//   highlights.forEach((id) =>  $(`[id='${id}']`).toggleClass('active', true))
// }


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

M.initForm = () => {
  const formValues = {
    natures: [
      "personnelle", "open data", "référentiels", "statistiques"
    ],
    thematiques: [
      "TEE", "Mobilité", "Ados"
    ],
    typologyColor: typologiesColors["TEE"],

  }
  const formElem = $(adddatasetTemplate(formValues))

  $('body').append(formElem)
  formElem.find('.close').click((e) => { formElem.remove() })

  $('#inputthematique').change((e) => {
    console.log(e)
    let thematique = $('#inputthematique').val()
    const typologyColor = typologiesColors[thematique]
    $('#adddataset .typology').css("background-color", "rgb(" + typologyColor.r + "," + typologyColor.g + "," + typologyColor.b + ")")
  })

  $('form#adddataset').submit((e) => {
    e.preventDefault()
// $('#submit_btn').click = () => {
    const id = "q:Q" + uuidv4()
// generate UUID in browser : https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     const dataset = {
        "@id": id,
        "@type": [
          "object",
          "wq:Q1397073"
        ],
        "description": $('#inputdescription').val(),
        "label": $('#inputname').val(),
        "access": "",
        "accessMediator": "",
        "defi": "",
        //"defi": $('#inputdefi').val(),,
        "information": "",
        "kind": "",
        "portable": "",
        "sourceDataController": $('#inputsourcedatacontroller').val(),
        "thematique": $('#inputthematique').val(),
        "typology": ""
      }

      $.ajax({
        type: "POST",
        url: "./php/add_dataset.php",
        data: JSON.stringify(dataset),
        success: (err) => {
          console.log("success body")
          formElem.remove()
          // PLD.allItems[id] = dataset
          console.log(err)
        },
        contentType: "application/json",
        dataType: 'json'
      })
      // post the dataset !?
      // function php, qui sauvegarde dans un fichier stand alone,
      // puis qui concat à un fichier json unique ?
      // append to ...
  })

}


M.prepare()
.then(M.prepareRender)
.then(M.render)
// .then(M.updateFilter)
.then(M.attachEvents)


// TO move in lib.
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

console.log(uuidv4());
