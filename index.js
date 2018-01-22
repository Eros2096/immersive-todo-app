// Requires
import generator from './generator'

var yo = require('yo-yo')
const uuidv1 = require('uuid/v1')
const EventEmitter = require('events');

// Global variables
var numbers = []; // start empty 
var el = list(numbers, update, deleteTodo);

const bus = new EventEmitter;

generator(bus);

// Generate Markup
function list (items, onclick, deleteTodo){
 return yo`<main role="main">
   <h1>Things ToDo:</h1>
   <div class="ctas">
     <input type="text" id="todoVal">
     <button id="addTodoButt" class="button-secondary pure-button" onclick=${onclick}>Add To-do</button>
   </div>
   <ul id="todoList">     
    ${items.map(function(item){
      if(item.status === 'pending'){
        generateTD(item);                      
       }
     })}
   </ul>
   <h1>Done:</h1>
   <ul id="doneList">
   ${items.map(function(item){
      if(item.status === 'done'){        
        return deleteLiDN(item);                      
       }
     })}     
   </ul>
 </main>`
}

// Return List items using Jojo with delete checkbox
function generateTD(item){
  console.log("Emmit: todo");
  bus.emit('todo', item)
}

// Return List items Using Jojo with delete button
function generateDN(item){
  bus.emit('done', item);
}

// Change status of state objects
function deleteTodo(ev){
  bus.emit('delete', ev);
}

// Create state object and updates markup
function update () {
 // add a new random number to our list
 var todo = {};
   todo.id = uuidv1();
   todo.value = document.getElementById("todoVal").value;
   todo.status = 'pending';
   // state = Object.assign(state, { todos: [... state.todos, todo]})

 numbers.push(todo)

 // construct a new list and efficiently diff+morph it into the one in the DOM
 var newList = list(numbers, update, deleteTodo)
 yo.update(el, newList)
}

function generateDone(){
  bus.emit('done');
}

// construct a new list and efficiently diff+morph it into the one in the DOM
 var newList = list(numbers, update, deleteTodo)
 yo.update(el, newList)


// Append Markup
document.body.appendChild(el)