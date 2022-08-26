/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
const form = document.querySelector("form")
console.log("form", form)
const parseInterface = document.getElementById("address-results")
console.log("parseInterface", parseInterface)
const errorInterface = document.getElementsByTagName("h4")

form.addEventListener("submit", async event => {
  event.preventDefault()
  const itemValue = form.address.value
  await userAction(itemValue)
  console.log("itemValue", itemValue)
  return itemValue
})

const userAction = async itemValue => {
  fetch("http://172.17.0.1:8080/api/parse?address=" + itemValue, {
    method: "GET",
    //   body: {itemValue}, // string or object
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json()
        // return response.json()
      }
      displayError()
      // throw new Error('Something went wrong');
    })
    .then(myJson => {
      displayResult(myJson)
      // console.log("myJson", myJson)
    })
    .catch(error => {
      // displayError()
    })
  // const myJson = await response.json() //extract JSON from the http response
  // displayResult(myJson)
  // console.log("myJson", myJson)
  // do something with myJson
}

const displayResult = (response, tag) => {
  parseInterface.style.display = "block"
  const tbody = parseInterface.querySelector("tbody")
  address_type = parseInterface.querySelector("#parse-type")
  address_type.textContent = response["address_type"]
  console.log("tbody", tbody)
  Object.keys(response["address_components"]).forEach(setValue => {
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")

    td1.textContent = setValue
    td2.textContent = response["address_components"][setValue]

    tr.appendChild(td1)
    tr.appendChild(td2)

    tbody.appendChild(tr)
    console.log("setValue", setValue)
  })
}

const displayError = () => {
  errorInterface.style.display = "block"
}
