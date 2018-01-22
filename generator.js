// this is the main reducer of the app
// it's job is to update the state
// this is the single source of truth for the state

var yo = require('yo-yo')
const uuidv1 = require('uuid/v1')

function generator(bus) {  

  // Create List Items for TODO
  bus.on('todo', function(item) {
  	console.log("Listen: todo");
  	return yo`<div><li id=${item.id}>
      ${item.value}
      <input type="checkbox" class="btn">
      </li></div>`
  })

  // Create List Items for DONE
  bus.on('done', function(item) {
  	return yo`<li id=${item.id}>
    ${item.value}
    <button onclick=${deleteTodo} class="btn">Pending</button>
    </li>`
  })

  // Delete List Item
  bus.on('delete', function(ev) {
  	var id = ev.target.parentNode.getAttribute('id');

	 numbers = numbers.filter(function(el){
	   if(el.id === id){
	     if(el.status === "pending"){
	       el.status = "done";
	     }
	     else{
	       el.status = "pending";
	     }
	   }
	   return true;
	  })
	})

  bus.on('update', function(ev) {
  	
  })

}

export default generator
