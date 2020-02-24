const renderBooks = () => {
    const BASE_URL = 'http://localhost:3000/books'

    const ul = document.querySelector('#list')
    
    return fetch(BASE_URL).then(response => response.json()).then(data => data.forEach(book => {
        const li = document.createElement('li')
        li.dataset.id = book.id
        li.innerText = book.title
        ul.append(li);  
    })) 
}

const renderBook = (event) => {
    const BOOK_URL = `http://localhost:3000/books/${event.target.dataset.id}`
    const showPanel = document.querySelector('#show-panel')
    let userHTML = ''
    
    return fetch(BOOK_URL).then(response => response.json()).then(data => {
        data.users.forEach(user => {
            userHTML += `<p><strong>${user.username}</strong></p>`
        })

        showPanel.innerHTML = ''
        showPanel.innerHTML = `
            <div>
                <p><strong>${data.title}</strong></p>
                <img src='${data.img_url}'>
                <p>${data.description}</p>
                ${userHTML}
                <button data-button='read-book' >Read Book</button>
            </div>
        `        
    })
}

document.addEventListener("DOMContentLoaded", () => {
    renderBooks()

    document.addEventListener('click', event => {
        switch (true) {
            case event.target.tagName === 'LI':
                renderBook(event)
                break
            case event.target.dataset.button === 'read-book':
                alert('Thank you for reading this book')
                break
        }
    })
})