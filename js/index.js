document.addEventListener("DOMContentLoaded", () => {
    
    fetch('http://localhost:3000/books')
        .then(resp => resp.json())
            .then(books => getBooks(books))

    function getBooks(books){
        let ul = document.getElementById("list")
        for (let i = 0; i < books.length; i++) {
            let li = document.createElement('li')
            li.id = `${books[i].id}-li`
            li.innerHTML = books[i].title
        ul.append(li)

        li.addEventListener('click', (e) => {
            displayDiv()
        })
        
    function displayDiv(){
        let div = document.getElementById('show-panel')
        let readBtn = document.createElement('button')
        readBtn.innerText = "Read Book"
        readBtn.id = books[i].id
        const foundBook = books[i]
        let bookHTMLarr = foundBook.users.map(user => {
            return `<li> ${user.username} </li>`
        })
        div.innerHTML = `
        <h1>${books[i].title}</h1>
        <img src="${books[i].img_url}">
        <p>${books[i].description}</p>
        ${bookHTMLarr.join("")}
        `
        div.append(readBtn)

        readBtn.addEventListener('click', ()=>{
            fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(users => {
                bookHTMLarr.push(`<li> ${users[0].username} </li>`)
                div.innerHTML = `
                <h1>${books[i].title}</h1>
                <img src="${books[i].img_url}">
                <p>${books[i].description}</p>
                ${bookHTMLarr.join("")}
                `
                div.append(readBtn)
            })  
        })
    }


        }
    }
});
