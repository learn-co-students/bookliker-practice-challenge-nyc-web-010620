let books = []
let users = []

const bookNameList = document.getElementById("list")
const showPannel = document.getElementById("show-panel")

function renderBookNames(response){
    for(const book of response){
        let li =  document.createElement("li")
        li.innerText = book.title
        li.className = "books-on-list"
        li.id = book.id
        bookNameList.append(li)
    }
}

function populateShowDiv(foundBook){ 
    liHTMLArr = foundBook.users.map(user => `<li> ${user.username} </li>`)
    showPannel.innerHTML = `
        <img src = "${foundBook.img_url}">
        <h1> ${foundBook.title} </h1>
        <p> ${foundBook.description} <p>
        <button id= ${foundBook.id} class= "like-button" > Like </button>
        <h5> Liked By: </h5>
        ${liHTMLArr.join("")}
    `
}


document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(response => {
        books = response
        renderBookNames(response)
        console.log(response)
    })

    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(response => {
        users = response
        console.log(response)
    })

    document.addEventListener("click",function(event){
        if(event.target.className === "books-on-list"){
            const foundBook = books.find(book => book.id === parseInt(event.target.id))
            console.log(foundBook)
            populateShowDiv(foundBook)
        } else if(event.target.className === "like-button"){
            const foundBook = books.find(book => book.id === parseInt(event.target.id))
            const me = users.find(user => user.id === 1)
            const likedByArr = foundBook.users
            console.log(foundBook.users)
            if(likedByArr.includes(me)){
                window.alert("You have already liked this book!")
            } else {
                likedByArr.push(me)
                const jsonObj = {
                    users: likedByArr
                }
                fetch(`http://localhost:3000/books/${foundBook.id}`,{
                    method: "PATCH", 
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonObj)
                })
                populateShowDiv(foundBook)
            }
        }
    })
});
