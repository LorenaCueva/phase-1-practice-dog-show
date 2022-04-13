fetchDogs()

function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => dogs.forEach((dog,i) => fillTable(dog, i)))
    .catch(error => window.alert(error.message))
}

function fillTable(dog, i){
    const dogTableRow = document.createElement('tr')
    dogTableRow.id = i + 1
    dogTableRow.style = "text-align: center"
    const dogName = createRow(dog, "name")
    const dogBreed = createRow(dog, "breed")
    const dogSex = createRow(dog, "sex")
    const editBtn = document.createElement('button')
    editBtn.innerText = "Edit Dog"
    editBtn.addEventListener('click', e => editDog(e))
    dogTableRow.append(dogName, dogBreed, dogSex, editBtn)
    document.getElementById("table-body").append(dogTableRow)
}

function createRow(dog, data, element){
    const dogData = document.createElement('td')
    dogData.innerText = dog[data]
    dogData.id = `dog_${data}`
    return dogData
}

function editDog(e){
    const dogForm = document.getElementById('dog-form')
    const dogId = e.target.parentElement.id
    dogForm.name.value = e.target.parentElement.childNodes[0].innerText
    dogForm.breed.value =  e.target.parentElement.childNodes[1].innerText
    dogForm.sex.value = e.target.parentElement.childNodes[2].innerText
    dogForm.submit.addEventListener('click', (e, id) => patchData(e, dogId))

}

function patchData(e, id){
    console.log(e.target.parentElement)
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": e.target.parentElement.name.value,
            "breed": e.target.parentElement.breed.value,
            "sex": e.target.parentElement.sex.value,
        })
    })
    .then(fetchDogs())
    .catch(error => window.alert(error.message))
}