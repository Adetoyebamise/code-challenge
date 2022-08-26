/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
const form = document.querySelector("form")
const parseInterface = document.getElementById("address-results")
const errorInterface = document.getElementsByTagName("h4")

form.addEventListener("submit", async event => {
  event.preventDefault()
  const itemValue = form.address.value
  await userAction(itemValue)
  return itemValue
})

const userAction = async itemValue => {
  fetch("http://172.17.0.1:8080/api/parse?address=" + itemValue, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      displayError()
    })
    .then(myJson => {
      displayResult(myJson)
    })
    .catch(error => {
    })

}

const displayResult = (response, tag) => {
  parseInterface.style.display = "block"
  const tbody = parseInterface.querySelector("tbody")
  address_type = parseInterface.querySelector("#parse-type")
  address_type.textContent = response["address_type"]
  Object.keys(response["address_components"]).forEach(setValue => {
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")

    td1.textContent = setValue
    td2.textContent = response["address_components"][setValue]

    tr.appendChild(td1)
    tr.appendChild(td2)

    tbody.appendChild(tr)
  })
}

const displayError = () => {
  errorInterface.style.display = "block"
}
