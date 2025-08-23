let memberName = document.getElementById("memName")
let memberimage = document.getElementById("memImg")
let logout = document.getElementById("logout")
let ownerMsg = document.getElementById("ownerMsg")
let balance = document.getElementById("e-number")
let flatNo  = document.getElementById("flatNo")
let complain = document.getElementById("complain")
let submitComplain = document.getElementById("submitComplain")
let payrent = document.getElementById("p-number")
let payRentForm = document.getElementById("payrent")
let plus = document.getElementById("plus")
let minus  = document.getElementById("minus")


let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let rentMembers = JSON.parse(localStorage.getItem("RentMembers"))
let membersComplains = JSON.parse(localStorage.getItem("Complains")) || []
console.log("Current User:", rentMembers);

logout.addEventListener("click",()=>{
    window.location.href = "../index.html"
    localStorage.removeItem("loggedInAs");
localStorage.removeItem("currentUser");
})


function memberDetails() {
    memberName.textContent = currentUser.name
    memberimage.innerHTML=`<img src="../images/${currentUser.img}" alt="">`
    balance.textContent = `${currentUser.balance} $`
    flatNo.textContent = `${currentUser.flatNo}-A`
}
memberDetails()

function ownermessage() {
    let message = JSON.parse(localStorage.getItem("ownerMessage")) || []
    ownerMsg.textContent = `Notice : ${message}`
}
function updateRentMembers() {
    localStorage.setItem("RentMembers", JSON.stringify(rentMembers));
}
function updateComplains() {
    localStorage.setItem("Complains", JSON.stringify(membersComplains));
}
function complainSubmitted() {
    let complainInput = document.getElementById("complain")
    let complain = complainInput.value.trim()

    localStorage.setItem("complain",JSON.stringify(complain))
    complainInput.value = ""

    for (let i = 0; i < rentMembers.length; i++) {
        if (currentUser.password==rentMembers[i].password) {
            rentMembers[i].complain = true
            membersComplains.push({
                complain : complain,
                flatNo : rentMembers[i].flatNo
            })
            updateComplains()
            updateRentMembers()
             break
        }
        
    }

}

function payRent() {
    payRentForm.innerHTML = `<div id = "rentForm"  >


    <div id="rentInfo" >
    <div><label for="">Rent Amount : </label>
    <input type="number"  value=1000  id="rentamount"  ></div>
    <div><label for="">Pay To : </label>
    <input type="text"  value = "owner" id="reciver"   ></div>
    </div>
       
    <div  id = "addbuttons" >
    <button  id = "plus" >Confirm </button>
    <button  id = "minus" >cancel</button>
    </div>
   
    
    
    </div>`

        document.getElementById("plus").addEventListener("click", confirmSubmission);
    document.getElementById("minus").addEventListener("click", cancelSubmission);
  updateRentMembers();
}


function confirmSubmission() {

    const name = document.getElementById("reciver").value.trim();
    const amount = parseInt(document.getElementById("rentamount").value.trim()); 
    

    if (amount === "" || name === "") {
        alert("Please fill all fields");
        return;
    }

        for (let i = 0; i < rentMembers.length; i++) {
        if(currentUser.password==rentMembers[i].password){
           rentMembers[i].balance-=1000
           rentMembers[i].rent= true
           updateRentMembers()
           balance.textContent = `${rentMembers[i].balance} $`

           break;
        }
        
    }
 
    payRentForm.innerHTML = `<p  id = "payed" >Paid ${amount} $ succesfully</p>`


    setTimeout(() => {
        cancelSubmission()
    }, 3000);

   
}


function cancelSubmission() {

    payRentForm.innerHTML = `
         <div id="payrent">
                    <p id="p-heading">Pay Rent</p>
                    <p id="p-number">pay</p>
                </div>
    `;

   
    document.getElementById("p-number").addEventListener("click", payRent);
}

ownermessage()

submitComplain.addEventListener("click",complainSubmitted)
payrent.addEventListener("click",payRent)
