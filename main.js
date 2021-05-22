window.onload = () => {
	const form = document.querySelector("addform");
	var submit = document.getElementById("submit");
	var input = document.getElementById("add_todo");
	var ul = document.getElementById("list-group")
	var itemInputed;
	var edits =  document.getElementById("edit");


	// input out the value of the input insde the function

	var todoItem = [];
	
	var getItems = JSON.parse(localStorage.getItem('items'));
	
	if(getItems !== null) {
		// todoItem.push(...getItems);

		getItems.forEach((item, index) => {

			todoItem.push(item);
			addTodo(item, index);
		})
	}

	submit.addEventListener("click", (e) => {
		e.preventDefault();

      	itemInputed = input.value;

     if(todoItem.length === 0) {
     	var pushItem = todoItem.push(itemInputed)
     } else if(todoItem.length > 0) {
     	
     	var pushItem = todoItem.push(itemInputed);
     }

     if(pushItem) {
     	localStorage.setItem("items", JSON.stringify(todoItem));

     	var index = todoItem[pushItem];
     	addTodo(itemInputed, index)
     }

   	});

   	edits.addEventListener("click", (e) => {
		e.preventDefault();

      	itemInputed = input.value;
      	itemIndex =document.getElementById('editable').value;
      	todoItem[itemIndex] = itemInputed;

     

     
     	localStorage.setItem("items", JSON.stringify(todoItem));

     	window.location.reload();
    

   	});


	function addTodo(item, index) {

		var list = document.createElement("li");
	   	var delet = document.createElement("button");
	   	var edit = document.createElement("button");
	   	var node = document.createTextNode("Delete");
	   	var innerText = document.createTextNode("Edit");

	   	list.className = "bg"
	   	list.appendChild(document.createTextNode(item));
	    ul.appendChild(list);
	    
	     
	   	delet.className = "btn btn-primary btn-sm delete"

	    edit.className = "btn btn-primary btn-sm edit"
	    
	    delet.appendChild(node);


	    edit.appendChild(innerText);
	    
	    list.appendChild(delet);
	    list.appendChild(edit);
	    
        
        edit.addEventListener("click", (e) => {
        	e.preventDefault();
        	input.value = item;
        	submit.style.display = 'none';
        	edits.style.display = 'block';

        	//check if the id exist in DOM already
        	var editables = !!document.getElementById('editable');
        	// console.log(editables);
        	if(editables == false){
	        	var DV = document.createElement('input');
	        	DV.setAttribute('type', 'hidden');
	        	DV.setAttribute('name', 'edit_index');
	        	DV.setAttribute('id', 'editable');
	        	DV.setAttribute('value', index);
	        	//input.appendChild(DV);
	        	edits.prepend(DV);
        	} else if (editables == true) {
        		// remove the old input tag first
        		document.getElementById('editable').remove();

        		// the add a new input tag 
	        	var DV = document.createElement('input');
	        	DV.setAttribute('type', 'hidden');
	        	DV.setAttribute('name', 'edit_index');
	        	DV.setAttribute('id', 'editable');
	        	DV.setAttribute('value', index);
	        	// add the new input tag
	        	edits.prepend(DV);
        	}
        	//select =document.getElementById("add_todo").value
        	//select = submit.value;
        	//itemInputed = input.value

        	console.log(index);

        })

	    delet.addEventListener("click", (e) => {
		   e.preventDefault();
		   e.currentTarget.parentNode.remove('li')
		   removeTodo(index)
		})
        
	}

	//if its not null, get item from local stofage,

// delet an li node from ul from array from the local storage without refreshing the page 
    function removeTodo(index) {
    	todoItem.shift(index);
    	localStorage.setItem("items", JSON.stringify(todoItem));     
	}

	 function editTodo(index) {
       //todoItem.
	    console.log(index);
    }

}

   
