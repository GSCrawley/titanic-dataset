fetch('titanic-passengers.json')
  .then(res => res.json())
  .then(json => handleData(json))
  .catch(err => console.log(err.message))

const elements = []
const passengerData = []

let showGender = false
let showSurvived = false
let showEmbarked = false

  function handleData(data) {

    const fields = data.map(passenger => passenger.fields)
    const fares = fields.map(({ fare }) => fare)
    const ages = fields.map(({age}) => age)
    const maxFare = Math.max(...fares)


    const buttonGender = document.getElementById("button-gender")
    const buttonSurvived = document.getElementById("button-survived")
    const buttonEmbarked = document.getElementById("button-embarked")

    // let showGender = false
    // let showSurvived = false
    // let showEmbarked = false

    // *** Visualize Data ***
    showAll(fields)

    console.log(elements)

    // *** Callbacks ***
    buttonGender.addEventListener("click", (e) => {
      showGender = !showGender
      if (showGender) {
        e.target.classList.add("button-selected")
      } else {
        e.target.classList.remove("button-selected")
      }
      displayByGender()
    })

    buttonSurvived.addEventListener("click", (e) => {
      showSurvived = !showSurvived
      displayBySurvived()
      if (showSurvived) {
        e.target.classList.add("button-selected")
      } else {
        e.target.classList.remove("button-selected")
      }
    })

    buttonEmbarked.addEventListener("click", (e) => {
      showEmbarked = !showEmbarked
      displayByEmbarked()
      if (showEmbarked) {
        e.target.classList.add("button-selected")
      } else {
        e.target.classList.remove("button-selected")
      }
    })

  }

  function showAll(fields) {
    const rootData = document.getElementById("main-data")
    rootData.style.display = "flex"
    rootData.style.flexWrap = "wrap"


    fields.forEach(passenger => {
      const el = document.createElement('div')
      rootData.appendChild(el)
      elements.push(el)             // store the element
      passengerData.push(passenger) // Store the passenger
      el.style.width = "15px"
      el.style.height = "15px"
      el.style.backgroundColor = "black"
      el.style.margin = "1px"
      el.style.transition = "200ms"
      el.style.boxSizing = "border-box"

    })
  }

  function displayByGender() {
    passengerData.forEach((object, i) => {
      const el = elements[i]
      const color = object.sex === "male" ? "#0080ff" : "#ffc0cb"
      el.style.backgroundColor = showGender ? color : "black"
    })
  }

  function displayBySurvived() {
    passengerData.forEach((object, i) => {
      const el = elements[i]
      const rounded = object.survived === "Yes" ? "50%" : "0%"
      el.style.borderRadius = showSurvived ? rounded : "0%"
    })
  }

  function displayByEmbarked() {
    passengerData.forEach((object, i) => {
      const el = elements[i]
      const embarked = object.embarked
      console.log(embarked)
      if (showEmbarked) {
        el.style.borderStyle = "solid"
        el.style.borderWidth = "2px"
        if (embarked === "S") {
          el.style.borderColor = "#738D37"
        } else if (embarked === "C") {
          el.style.borderColor = "#FBC00E"
        } else if (embarked === "Q")
          el.style.borderColor = "#D62B83"
      }
      else {
        el.style.borderWidth = "0px"
        el.style.borderColor = "white"
      }

    })
  }
