document.addEventListener("DOMContentLoaded", function() {

    let booksURL = "http://localhost:3000/books/"
    let bookUl = document.getElementById("list-panel")

    fetch(booksURL)
    .then(resp=> resp.json())
    .then(books => books.forEach(renderBooks))

    function renderBooks(book){

      let bookLi = document.createElement("li")
      bookLi.innerText =`${book.title}`
      bookLi.dataset.id = book.id
      bookUl.appendChild(bookLi)
    }

    let showPannel = document.getElementById("show-panel")

      bookUl.addEventListener("click", e=>{

        let bookId = parseInt(e.target.dataset.id)
        fetch(booksURL+bookId)
        .then(resp=>resp.json())
        .then(book => showBook(book))        
          
      })
      
      function showBook(book){
        showPannel.innerHTML =`
        <img src=${book.img_url}>
        <p>${book.description}<p/>
        <ul id="list-of-users"><ul/>
        `
        let button = document.createElement('button')
        button.innerText="Read book"
        button.dataset.id = book.id
        showPannel.appendChild(button)

        function getUsers(){
          let ul = document.getElementById("list-of-users")
           book.users.forEach(user=>{
             let userLi = document.createElement('li')
             userLi.innerText=`${user.username}`
             ul.appendChild(userLi)
           })
          }
          getUsers()

          let likeButton = document.getElementsByTagName('button')[0]

          likeButton.addEventListener("click", e=>{
            let ul = document.getElementById("list-of-users")
            
            let bookID = parseInt(e.target.dataset.id)
            
            let userIds = book.users.map(user => user.id)  
            let arr = []
            debugger 
            arr.push(book.users) 
            arr[0].push({id:1, username:"pouros"})
            // debugger
            let userOBJ = arr[0]

            console.log(userOBJ)
            
            if( userIds.includes(1)){
              alert("already read!")}
            else{
                
                ul.innerHTML=""

              let options ={
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({users: userOBJ})
              }
               console.log("fetch")
              // debugger
                fetch(`http://localhost:3000/books/${bookID}`, options)
                .then(resp =>resp.json())
                // .then(console.log)
                .then(data=> getUsers(data))
                  

                
                
            }//f SHowbook

          })
          
        }//f showBook
        
        // debugger


    
})//DOMLoaded