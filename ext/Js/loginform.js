// const loginInput = document.querySelector("#loginForm input");
// const loginButton =document.querySelector("#loginForm button");
//
// function loginBtnClick() {
//     // console.dir(loginInput)
//     // value 값을 추출하기 위함, loginInput에 대한 정보 볼 수 있음
//     console.log(loginInput.value);
//     console.log("clicked")
//
//     const userInputValue = loginInput.value;
//
//     if (userInputValue === ""){
//         Swal.fire({
//             title: '이름이 비어있어요!🙄',
//             html:'이름을 다시 적어주세요',
//             confirmButtonColor:'black'
//         })
//     }else if(userInputValue.length > 15){
//         Swal.fire({
//             title: '이름이 너무 길어요😕',
//             html:'15자 이내로 기록해 주셔야해요!',
//             confirmButtonColor:'black'
//         })
//     }
// }
//
// loginButton.addEventListener("click",loginBtnClick);


const loginForm = document.querySelector("#loginFrom");
const loginInput = document.querySelector("#loginFrom input");
const greeting = document.querySelector("#greeting")

//--------------------
const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"


/**
 * loginSubmit : Login input button click event
 */
function loginSubmit(e) {
    e.preventDefault(); // button 눌러도 새로 실행치 않게 하기 위해 붙임. / page refresh방지
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName); // localStorage.setItem("저장될 아이템 이름", 변수)
    loginForm.classList.add(HIDDEN_CLASSNAME);
    paintGreeting(userName)
}

/**
 * paintGreeting : Login 사 나타나는 user 이름 함수 묶음
 */

function paintGreeting(userName){
    greeting.innerText = `안녕하세요, ${userName}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}




/**
 * saveUser = Local Storage에 사용자가 input에 입력한 값 저장
 */

const saveUser = localStorage.getItem(USERNAME_KEY);

if (saveUser === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", loginSubmit);
} else {
    paintGreeting(saveUser)
}

