const todoForm = document.getElementById("todoForm");
const todoInput = document.querySelector("#todoForm input");
const todolist = document.getElementById("todoList");

//----------------------

const TODO_KEY = "todo";


/**
 * todo List Array
 * JSON.stringify(todoArray) : 배열로 저장한다고 해서 배열로 저장되지 않음. 새로고침 시 로컬스토리지에
 * 저장되어 있으나 화면에 나타나지 않음. 로컬 스토리지로 꺼내기 위해서는 문자열로 바꿔줄 필요가 있어 사용함.
 */

let todoArray = [];

//newTod 가 그려지며 그려진 텍스트를 배열에 밀어넣는다.

function storeTodoArray() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoArray))
    // 일반 문자열 배열로는 저장이 되지만 그대로 문자열로만 저장됨
    // javascript object로 변환 필요 (이럴 때 JSON.parse 이용하면 됨. )
}


/**
 * createBtn의 click eventListener (List delete)
 */

function deleteList(event) {
    const deleteLi = event.target.parentElement;
    deleteLi.remove();
    todoArray = todoArray.filter(toDo=>toDo.id !== parseInt(deleteLi.id));
    storeTodoArray();
}


/**
 *
 * recodeTodd = Painting List = 리스트를 그리는 역할을 하는 함수를 묶어두었다.
 */

function recodeTodo(newTodo) {
    const createLi = document.createElement("li");
    createLi.id=newTodo.id;
    const createSpan = document.createElement("span");
    const createBtn = document.createElement("button");

    // 이렇게만 작성하면 li 안에 span이 존재하지 않는다. 그저 각자의 객체로 생성되기
    // 때문에 appendChild로 넣어준다.

    createBtn.innerText = "⤫";
    createBtn.classList.add("todoBtn")
    createLi.appendChild(createSpan);
    createLi.appendChild(createBtn);
    createBtn.addEventListener("click", deleteList);
    createSpan.innerText = newTodo.text;// 생성된 span은 newTodo에서 작성한 글자가 된다.
    createSpan.classList.add("todoSpan")
    todolist.appendChild(createLi); // 그렇게 생성된 li를 붙여준다.
}


/**
 * form은 submit 이벤트를 가지고 있기 때문에 함수를 만들어 기본 동작을 막는 작업을 해주어야한다.
 * 이 작업을 해주지 않을 경우 page refresh가 일어난다.
 * -----------------------------------------------------
 * e : event
 */

function todoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value; // 1. input의 값을 저장한다.
    todoInput.value = ""; //2. input에 적힌 값을 비우는 역할
    const newTodoObj={
        text:newTodo,
        id:Date.now(),
    };
    todoArray.push(newTodoObj);
    recodeTodo(newTodoObj)// 3. 입력 값을 넣어 호출
    storeTodoArray();
}


todoForm.addEventListener("submit", todoSubmit);

const saveTodo = localStorage.getItem(TODO_KEY);

if (saveTodo !== null) {
    const parsedTodo = JSON.parse(saveTodo);
    // parsedTodo.forEach( function ());
    // parsedTodo가 가지고 있는 각각의 item에 대해 function을 실행하란 뜻 ;
    todoArray = parsedTodo;
    // todoArray를 가져온 뒤  배열에 복원 -> 이 배열은 더 이상 빈 값이 아니게 된다.
    // todoArray를 저장하게 되면 빈 배열을 저장하는게 아닌 이전의
    // 모든 요소들을 가지고 있는 배열을 저장하게 되는 것
    parsedTodo.forEach(recodeTodo);

}