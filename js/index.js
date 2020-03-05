const BOOKS_URL = 'http://localhost:3000/books';
const showPanel = document.getElementById('show-panel');
const listPanel = document.getElementById('list-panel');
const bookList = document.getElementById('list');

document.addEventListener('DOMContentLoaded', function() {
	getBooks();
	showBook();
	// likeBook();
});

function getBooks() {
	fetch(BOOKS_URL)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.forEach(function(book) {
				listBook(book);
			});
		});
}

function listBook(book) {
	const bookLi = document.createElement('li');
	bookLi.dataset.bookId = book.id;
	bookLi.className = 'book-class';
	bookLi.innerHTML = `
   ${book.title}
   `;
	bookList.append(bookLi);
}

function showBook() {
	listPanel.addEventListener('click', function(event) {
		let bookId = event.target.dataset.bookId;

		fetch(`${BOOKS_URL}/${bookId}`)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				showPanel.innerHTML = `
            <h1>${data.title}</h1>
            <img src=${data.img_url}>
            <p>${data.description}</p>
            <button data-book-id=${data.id} type="button" id="like-btn">Like this Book! ♥</button>
            <ul id="book_fans">Fans of the Book</ul>
            `;
				data.users.forEach(function(user) {
					let bookFanUl = document.getElementById('book_fans');
					let bookFanLi = document.createElement('li');
					bookFanLi.innerHTML = `
               ${user.username}
               `;
					bookFanUl.append(bookFanLi);
				});
				likeBook(); //scoping, we have to invoke this function here to have access to the like button
			});
	});
}

function likeBook() {
	const likeButton = document.getElementById('like-btn');
	likeButton.addEventListener('click', function(event) {
		let newArrayOfUsers = undefined;
		let finalArrayOfUsers = undefined;
		let bookToLikeId = event.target.dataset.bookId;
		let bookFanUl = document.getElementById('book_fans');
		let newBookFanLi = document.createElement('li');
		newBookFanLi.innerText = 'pouros';
		bookFanUl.appendChild(newBookFanLi);

		fetch(`${BOOKS_URL}/${bookToLikeId}`)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				let arrayOfUsers = data.users;
				newArrayOfUsers = [ ...arrayOfUsers ];
				finalArrayOfUsers = newArrayOfUsers.push({ id: 1, username: 'pouros' });
				//console.log(newArrayOfUsers);
				//return arrayOfUsers;
			});

		fetch(`${BOOKS_URL}/${bookToLikeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(finalArrayOfUsers)
		});
	});
}
