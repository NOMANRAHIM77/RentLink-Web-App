let owner = document.getElementById("owner")
let member = document.getElementById("member")
let login = document.getElementById("login")




let RentMembers = [

    {name : "shahid",rent : true,complain : false,flatNo : 10,password : 1,img : "m1.png",balance : 2000},
    {name : "ali",rent : false,complain : false,flatNo : 22,password : 2,img : "m2.png",balance : 3000},
    {name : "hashir",rent : true,complain : true,flatNo : 12,password : 3,img : "m3.png",balance : 4000},
    {name : "noman",rent : false,complain : false,flatNo : 33,password : 4,img : "m4.png",balance : 1500},
    {name : "junaid",rent : true,complain : true,flatNo : 14,password :5,img : "m5.png",balance : 2500 },
     {name : "girl1",rent : true,complain : true,flatNo : 15,password :6,img : "m6.png",balance : 5500 },
      {name : "girl2",rent : true,complain : true,flatNo : 70,password :7,img : "m7.png",balance : 3500 },       
]
let ownerDetails = [
    {name:"noman",password:"77"}
]
let complains = [
   
]

if (!localStorage.getItem("RentMembers")) {
    localStorage.setItem("RentMembers", JSON.stringify(RentMembers));
    localStorage.setItem("Owner",JSON.stringify(ownerDetails))
    localStorage.setItem("Complains",JSON.stringify(complains))
}

let rentmembers = JSON.parse(localStorage.getItem("RentMembers"))||[]
function updateRentMembers() {
    localStorage.setItem("RentMembers", JSON.stringify(rentmembers));
}



function refresh() {
    location.reload()
}

function ownerLogin() {
    
login.innerHTML = `
<i class="ri-arrow-left-line"  id="back" onclick="refresh()" style="color: white; font-size: 24px;"></i>
<div id = "title"  >OWNER LOGIN</div>
                  <div id="ownerloging" >

        <input id = "username" type="text" placeholder="Enter your name" required>
        <input  id = "password" type="password" placeholder="Enter your password" required>
        <button  id = "btn" >Log In</button>
         <div  id="invalid" >Invalid credentials Entered</div>
                    </div>`
     let username = document.getElementById("username")
     let password = document.getElementById("password")
     let btn = document.getElementById("btn")
     let invalid = document.getElementById("invalid")
 function access() {
    let inputName = username.value.trim()
    let inputPassword = password.value.trim()
    
    if(inputName == ownerDetails[0].name && inputPassword == ownerDetails[0].password ){
       localStorage.setItem("loggedInAs","owner")
       localStorage.setItem("currentUser",JSON.stringify(ownerDetails))
       window.location.href = `./owner/ownerDashboard.html`
    }
    else{
           username.value = ""
           password.value = ""
           invalid.style.opacity = "1"
           setTimeout(()=>{
            invalid.style.opacity = "0"
           },2000)
    }
 }    
    
 
 btn.addEventListener("click",access)

}
function memberLogin() {
   login.innerHTML = `
<i class="ri-arrow-left-line"  id="back" onclick="refresh()" style="color: white; font-size: 24px;"></i>
<div id = "title"  >RENT MEMBER LOGIN</div>
                   <div  id="memberloging" >

        <input id = "username" type="text" placeholder="Enter your name" required>
        <input  id = "password" type="password" placeholder="Enter your password" required>
        <button  id = "btn" >Log In</button>
 <div  id="invalid" >Invalid credentials Entered</div>
                    </div->`


function access() {
 let username = document.getElementById("username")
     let password = document.getElementById("password")
     let btn = document.getElementById("btn")
     let invalid = document.getElementById("invalid")


    let inputName = username.value.trim()
    let inputPassword = password.value.trim()
    let userCheck = true
   for (let i = 0; i < rentmembers.length; i++) {
     if(inputName == rentmembers[i].name && inputPassword == rentmembers[i].password){
       localStorage.setItem("loggedInAs","RentMember")
       localStorage.setItem("currentUser",JSON.stringify(rentmembers[i]))
       window.location.href = `./member/member.html`
       userCheck=false
       break
    }}
    if(userCheck){
           username.value = ""
           password.value = ""
           invalid.style.opacity = "1"
           setTimeout(()=>{
            invalid.style.opacity = "0"
           },3000)
    }
    
   
 }

 btn.addEventListener("click",access)

}




owner.addEventListener("click",ownerLogin)
member.addEventListener("click",memberLogin)
