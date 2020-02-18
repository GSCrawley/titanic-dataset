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

  const onlyWomen = fields.filter(({sex}) => sex == "female")
  const onlyMen = fields.filter(({sex}) => sex == "male")
  const onlyFirstClass = fields.filter(({pclass}) => pclass == 1)


  // *** Visualize Data ***
  showSurvived(fields)
  showGender(fields)
  showClass(fields)
  // showEmbarked(fields)
  showOnlyWomen(onlyWomen)
  showOnlyMen(onlyMen)
  showOnlyFirstClass(onlyFirstClass)

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

function showGender(fields) {
  const rootGender = document.getElementById("root-gender")
  rootGender.style.display = "flex"
  rootGender.style.flexWrap = "wrap"
  let maleCount = 0
  let femaleCount = 0
  fields.forEach((passenger) => {
    if (passenger.sex == "male") {
      maleCount += 1
    } else {
      femaleCount +=1
    }
  })

  fields.forEach((passenger) => {
    const el = document.createElement("div")
    rootGender.appendChild(el)
    el.style.backgroundColor = passenger.sex === "male" ? "#0080ff" : "#ffc0cb"
    el.style.borderRadius = passenger.sex === "female" ? "50%" : "0%"
    el.style.height = "10px"
    el.style.width = "10px"
    el.style.margin = "1px"
  })

  document.getElementById("male-count").innerHTML = `${maleCount}`
  document.getElementById("female-count").innerHTML = `${femaleCount}`

}

function showClass(fields) {
  const rootClass = document.getElementById("root-class")
  rootClass.style.display = "flex"
  rootClass.style.flexWrap = "wrap"
  let firstCount = 0
  let secondCount = 0
  let thirdCount = 0
  // fields.forEach(passenger => {
  //   if (passenger.pclass = 1) {
  //     firstCount += 1
  //   }
  //   else if (passenger.pclass = 2) {
  //     secondCount += 1
  //   }
  //   else if (passenger.pclass = 3) {
  //     thirdCount += 1
  //   }
  // })

  fields.forEach((passenger) => {
    const el = document.createElement("div")
    rootClass.appendChild(el)
    if (passenger.pclass == 1) {
      firstCount += 1
      el.style.backgroundColor = "#738D37"
    }
    else if (passenger.pclass == 2) {
      secondCount += 1
      el.style.backgroundColor = "#FBC00E"
    }
    else if (passenger.pclass == 3) {
      thirdCount += 1
      el.style.backgroundColor = "#D62B83"
    }
    el.style.height = "10px"
    el.style.width = "10px"
    el.style.margin = "1px"
  })

  document.getElementById("first-class-count").innerHTML = `${firstCount}`
  document.getElementById("second-class-count").innerHTML = `${secondCount}`
  document.getElementById("third-class-count").innerHTML = `${thirdCount}`


}

// Filter: Women Survival Stats
function showOnlyWomen(onlyWomen) {
  const rootOnlyWomen = document.getElementById("root-only-women")
  rootOnlyWomen.style.display = "flex"
  rootOnlyWomen.style.flexWrap = "wrap"
  let menSurvivedCount = 0
  let menDiedCount = 0

  onlyWomen.forEach((passenger) => {
    const el = document.createElement("div")
    rootOnlyWomen.appendChild(el)
    el.style.height = "10px"
    el.style.width = "10px"
    el.style.margin = "1px"
    if (passenger.survived == "Yes") {
      el.style.backgroundColor = "#ffc0cb"
    }
    else {
      el.style.backgroundColor = "#db5959"
    }
  });
}

// Filter: Men Survival Stats
function showOnlyMen(onlyMen) {
  const rootOnlyMen = document.getElementById("root-only-men")
  rootOnlyMen.style.display = "flex"
  rootOnlyMen.style.flexWrap = "wrap"
  let firstClassSurvivedCount = 0
  let firstClassDiedCount = 0

  onlyMen.forEach((passenger) => {
    const el = document.createElement("div")
    rootOnlyMen.appendChild(el)
    el.style.height = "10px"
    el.style.width = "10px"
    el.style.margin = "1px"
    if (passenger.survived == "Yes") {
      el.style.backgroundColor = "#0080ff"
    }
    else {
      el.style.backgroundColor = "#db5959"
    }
  });
}

// Filter: First Class Survival Stats
function showOnlyFirstClass(onlyFirstClass) {
  const rootOnlyFirstClass = document.getElementById("root-only-first-class")
  rootOnlyFirstClass.style.display = "flex"
  rootOnlyFirstClass.style.flexWrap = "wrap"
  let firstClassSurvivedCount = 0
  let firstClassDiedCount = 0

  onlyFirstClass.forEach((passenger) => {
    const el = document.createElement("div")
    rootOnlyFirstClass.appendChild(el)
    el.style.height = "10px"
    el.style.width = "10px"
    el.style.margin = "1px"
    if (passenger.survived == "Yes") {
      el.style.backgroundColor = "#738D37"
    }
    else {
      el.style.backgroundColor = "#db5959"
    }
  });
}

function showEmbarked(fields) {
  const rootFirstC = document.getElementById("embarked-firstC")
  const rootFirstQ = document.getElementById("embarked-firstQ")
  const rootFirstS = document.getElementById("embarked-firstS")
  const rootSecondC = document.getElementById("embarked-secondC")
  const rootSecondQ = document.getElementById("embarked-secondQ")
  const rootSecondS = document.getElementById("embarked-secondS")
  const rootThirdC = document.getElementById("embarked-thirdC")
  const rootThirdQ = document.getElementById("embarked-thirdQ")
  const rootThirdS = document.getElementById("embarked-thirdS")
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
  // console.log(`Total first class: ${firstClassCount}`)
  // console.log(`First class C: ${firstC}`)
  // console.log(`First class Q: ${firstQ}`)
  // console.log(`First class S: ${firstS}`)
  // console.log(`Total second class: ${secondClassCount}`)
  // console.log(`Second class C: ${secondC}`)
  // console.log(`Second class Q: ${secondQ}`)
  // console.log(`Second class S: ${secondS}`)
  // console.log(`Total third class: ${thirdClassCount}`)
  // console.log(`Third class C: ${thirdC}`)
  // console.log(`Third class Q: ${thirdQ}`)
  // console.log(`Third class S: ${thirdS}`)

  rootFirstC.style.backgroundColor = "red"
  rootFirstC.style.height = `${normalize(firstC, firstClassCount)}px`

}

function normalize(value, maxValue) {
  return value / maxValue
}
