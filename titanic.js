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
  showEmbarked(fields)

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

}

function showEmbarked(fields) {
  const rootSurvived = document.getElementById("root-survived")
  let firstClassCount = 0
  let firstC = 0
  let firstQ = 0
  let firstS = 0
  let secondClassCount = 0
  let secondC = 0
  let secondQ = 0
  let secondS = 0
  let thirdClassCount = 0
  let thirdC = 0
  let thirdQ = 0
  let thirdS = 0
  fields.forEach((passenger) => {
    if (passenger.pclass === 1) {
      firstClassCount += 1
      if (passenger.embarked === "C") {
        firstC += 1
      }
      else if (passenger.embarked === "Q") {
        firstQ += 1
      }
      else if (passenger.embarked === "S") {
        firstS += 1
      }
    }
    else if (passenger.pclass === 2) {
      secondClassCount += 1
      if (passenger.embarked === "C") {
        secondC += 1
      }
      else if (passenger.embarked === "Q") {
        secondQ += 1
      }
      else if (passenger.embarked === "S") {
        secondS += 1
      }
    }
    else if (passenger.pclass === 3) {
      thirdClassCount += 1
      if (passenger.embarked === "C") {
        thirdC += 1
      }
      else if (passenger.embarked === "Q") {
        thirdQ += 1
      }
      else if (passenger.embarked === "S") {
        thirdS += 1
      }
    }
  })
  console.log(`Total first class: ${firstClassCount}`)
  console.log(`First class C: ${firstC}`)
  console.log(`First class Q: ${firstQ}`)
  console.log(`First class S: ${firstS}`)
  console.log(`Total second class: ${secondClassCount}`)
  console.log(`Second class C: ${secondC}`)
  console.log(`Second class Q: ${secondQ}`)
  console.log(`Second class S: ${secondS}`)
  console.log(`Total third class: ${thirdClassCount}`)
  console.log(`Third class C: ${thirdC}`)
  console.log(`Third class Q: ${thirdQ}`)
  console.log(`Third class S: ${thirdS}`)
}

function normalize(value, maxValue) {
  return value / maxValue
}
