let getCookie = (name) =>  {
	var cookieValue = null
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';')
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim()
		    // Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
		    	cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
		        break
			}
		}
	}
	return cookieValue
}

// Change todo item from complete to incomplete and vice-versa
let changeStatus = async (id) => {
    let csrftoken = getCookie('csrftoken')
    let url = `http://127.0.0.1:8000/todo/${id}/`
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    })
	location.reload()
}

// Put item in edit field
let editTodo = (id, text) =>{
	let pk_input = document.getElementById("pk")
	pk_input.value = id
	let text_input = document.getElementById("text")
	text_input.value = text
}

// Submit form
let submitForm = async () => {
	let csrftoken = getCookie('csrftoken')
	let pk = document.getElementById("pk").value
	let text = document.getElementById("text").value
    let url = `http://127.0.0.1:8000/todo/`
	let method = 'POST'

	// If form has 'pk' is it edit functionality
	if (pk) {
		url = `http://127.0.0.1:8000/todo/${pk}/`
		method = 'PUT'
	}

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'text': text})
    })

	location.reload()
}

// Delete a todo item
let deleteTodo = async (id) => {
	let csrftoken = getCookie('csrftoken')
	let url = `http://127.0.0.1:8000/todo/${id}/`

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    })

	location.reload()
}