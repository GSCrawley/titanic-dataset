fetch('titanic-passengers.json')
  .then(res => res.json())
  .then(json => handleData(json))
  .catch(err => console.log(err.message))

function handleData(data) {
  const fields = data.map(passenger => passenger.fields)
  // console.log(fields)
  const fares = fields.map(({ fare }) => fare)
  // console.log(`Fares: ${fares}`)
  const ages = fields.map(({age}) => age)
  // console.log(`Ages: ${ages}`)
  const maxFare = Math.max(...fares)

  // *** Visualize Data ***
  showSurvived(fields)

}

function showSurvived(fields) {
  const rootSurvived = document.getElementById("root-survived")
  rootSurvived.style.display = "flex"
  rootSurvived.style.flexWrap = "wrap"
  let deathCount = 0
  let survivorCount = 0
  fields.forEach((passenger) => {
    if (passenger.survived === "Yes") {
      survivorCount += 1
    } else {
      deathCount += 1
    }
  })

  fields.forEach(passenger => {
    const el = document.createElement("div")
    rootSurvived.appendChild(el)
    el.style.backgroundColor = passenger.survived === "Yes" ? "#8edd67" : "#db5959"
    el.style.height = "10px"
    el.style.width = "10px"
    el.style.margin = "1px"
  })

  document.getElementById("survivor-count").innerHTML = `${survivorCount}`
  document.getElementById("death-count").innerHTML = `${deathCount}`

  // const survivorStat = document.createElement("p")
  // const survivorNode = document.createTextNode(`Number of survivors: ${survivorCount}`)
  // survivorStat.appendChild(survivorNode)
  // rootSurvived.appendChild(survivorStat)
  //
  // const deathStat = document.createElement("p")
  // const deathNode = document.createTextNode(`Number of fatalities: ${deathCount}`)
  // deathStat.appendChild(deathNode)
  // rootSurvived.appendChild(deathStat)
}

function showEmbarked(fields) {

}
