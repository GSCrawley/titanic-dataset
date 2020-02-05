
(function() {


  // Passenger data field
  const passengerCard = document.getElementById("passenger-card")
  const passengerName = document.getElementById("passenger-name")
  const passengerEmbarked = document.getElementById("passenger-embarked")
  const passengerAge = document.getElementById("passenger-age")
  const passengerSex = document.getElementById("passenger-sex")
  const passengerSurvived = document.getElementById("passenger-survived")




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

      // "Show" buttons
      const buttonGender = document.getElementById("button-gender")
      const buttonSurvived = document.getElementById("button-survived")
      const buttonEmbarked = document.getElementById("button-embarked")

      // "Sort" buttons
      const sortGender = document.getElementById("sort-gender")
      const sortSurvived = document.getElementById("sort-survived")
      const sortEmbarked = document.getElementById("sort-embarked")

      // Parent of passengers: main-data
      const mainData = document.getElementById("main-data")


      // let showGender = false
      // let showSurvived = false
      // let showEmbarked = false

      // *** Visualize Data ***
      showAll(fields)

      console.log(elements)

      // *** Event Handlers ***
      // Show data buttons
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

      // Sort buttons
      sortGender.addEventListener("click", (e) => {
        console.log("Sort gender")
        passengerData.sort((a, b) => {
          return a.sex === "male" ? -1 : 1
        })
        displayByGender()
        displayBySurvived()
        displayByEmbarked()
      })

      // Show passenger on hover
      mainData.addEventListener("mouseover", (e) => {
        const index = e.target.dataset.index
        showPassengerData(index)
      })

      // Hide passenger when hover off
      mainData.addEventListener("mouseout", (e) => {
        passengerCard.style.display = "none"
      })

    }

  function showAll(fields) {
    const rootData = document.getElementById("main-data")
    rootData.style.display = "flex"
    rootData.style.flexWrap = "wrap"


    fields.forEach((passenger, i) => {
      const el = document.createElement('div')
      rootData.appendChild(el)
      elements.push(el)             // store the element
      passengerData.push(passenger) // Store the passenger
      el.style.width = "25px"
      el.style.height = "25px"
      el.style.backgroundColor = "black"
      el.style.margin = "1px"
      el.style.transition = "200ms"
      el.style.boxSizing = "border-box"

      el.dataset.index = i

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

  // Helper function: show data for one passenger
  function showPassengerData(index) {
    passengerCard.style.display = "block"
    const passengerInfo = passengerData[index]
    console.log(passengerInfo)
    if (passengerInfo != undefined) {
      passengerName.innerHTML = passengerInfo.name
      passengerEmbarked.innerHTML = passengerInfo.embarked
      passengerAge.innerHTML = passengerInfo.age
      passengerSex.innerHTML = passengerInfo.sex
      passengerSurvived.innerHTML = passengerInfo.survived

    }

  }



})()
