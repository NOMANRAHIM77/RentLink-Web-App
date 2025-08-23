let logout = document.getElementById("logout")
let members  =document.getElementById("mem")
let hom  =document.getElementById("home")
let topname = document.getElementById("show-name")
let building = document.getElementById("building")
let content  = document.getElementById("show")
let memberData  = document.getElementById("memberData")
let addmembers  = document.getElementById("m-number")
let addmembers1 = document.getElementById("addmembers")
let plus = document.getElementById("plus")
let minus  = document.getElementById("minus")
let rentspaid = document.getElementById("e-number")
let profit = document.getElementById("v-number")
let remove  = document.getElementById("remove")
let notice = document.getElementById("submitNotice")
let complain = document.getElementById("complain")  

let RentMembers = JSON.parse(localStorage.getItem("RentMembers")) || [];
let owner = JSON.parse(localStorage.getItem("Owner")) || []
let membersComplains = JSON.parse(localStorage.getItem("Complains")) || []


function updateRentMembers() {
    localStorage.setItem("RentMembers", JSON.stringify(RentMembers));
}
function updateComplains() {
    localStorage.setItem("Complains", JSON.stringify(membersComplains));
}

function rents() {
    let paid = 0
let unpaid = 0
for (let i = 0; i < RentMembers.length; i++) {
    RentMembers[i].rent==true ? paid++ : unpaid++
}
rentspaid.textContent = paid

let perRentAmount = 1000
let revenue = perRentAmount*paid
profit.textContent = `${revenue} $`

}
rents()





logout.addEventListener("click",()=>{
    window.location.href = "../index.html"
    localStorage.removeItem("loggedInAs");
localStorage.removeItem("currentUser");
})
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
        const index = e.target.getAttribute("data-index");
        RentMembers.splice(index, 1); 
        createMembers(); 
        rents(); 
    }
});
function createMembers() {
    updateRentMembers()
    let remove  = document.getElementById("remove")
    const memberData = document.getElementById("memberData");
    let htmlContent = "";
let counter  = 1
    for (let i=0;i<RentMembers.length;i++) {
        htmlContent += `
            <div class="member-bar">
                <div  id = "pic" ><img src="../images/${RentMembers[i].img}" alt="Profile Picture"  /></div>
                <div class="member-info">
                    <p>Name: ${RentMembers[i].name}</p>
                    <p>Flat: ${RentMembers[i].flatNo}-A</p>
                    <p>Rent: ${RentMembers[i].rent}</p>
                    <p>Complain: ${RentMembers[i].complain}</p>
                    <p>Password: ${RentMembers[i].password}</p>
                    <p  class = "remove" data-index="${i}" >Remove</p>
                </div>
            </div>
        `;
        counter++
    }

    memberData.innerHTML = htmlContent;
updateRentMembers();

    
}


function member() {
    content.innerHTML = `<div  id = "memberData" > </div>`
    topname.textContent = "MEMBERS DETAILS"
    createMembers();
}

function home() {
   
    topname.textContent = "ANALYTICS"
    content.innerHTML = `
     <div id="first">
                        <div id="rooms">
                            <p id="r-heading">Total Apartments</p>
                            <p id="r-number">74</p>
                        </div>
                        <div id="rents">
                            <p id="e-heading">Total Rents Paid</p>
                            <p id="e-number">16</p>
                        </div>
                        <div id="revenue">
                            <p id="v-heading">June Revenue</p>
                            <p id="v-number">12,55$</p>
                        </div>
                    </div>
                    <div id="second">

                      <div id="announce">
                          <textarea  id="notice"   placeholder="Enter notice here" >
                        </textarea>
                         <button  id="submitNotice" >Submit</button>
                      </div>

                        <div id="addmembers"   >
                         <p id="m-heading">Add Members</p>
                            <p id="m-number">ADD</p>
                    </div>
                    </div>
                </div>
                
    
    `

    let rentspaid = document.getElementById("e-number")
let profit = document.getElementById("v-number")
     document.getElementById("m-number")
        .addEventListener("click", addmember)
    let paid = 0
let unpaid = 0
for (let i = 0; i < RentMembers.length; i++) {
    RentMembers[i].rent==true ? paid++ : unpaid++
}
rentspaid.textContent = paid

let perRentAmount = 1000
let revenue = perRentAmount*paid
profit.textContent = `${revenue} $`

let notice = document.getElementById("submitNotice")
  notice.addEventListener("click",submitNotice)      
}


function addmember() {
 const addmembers1 = document.getElementById("addmembers"); 
    addmembers1.innerHTML = `
    
                         <div  id = "newMemberForm" >
    <div id = "nameentry" ><label for="" id="labelName" >Name</label>
    <input type="text"  id="memName" placeholder="Enter member name"  ></div>
    <div  id = "flatentry" ><label for=""  id = "labelFlat" >flatNo</label>
    <input type="text" id="memFlat"  placeholder="Enter flat no" ></div>
        <div>
                <label for="memRent">Rent Paid</label>
                <input type="radio" id="memRent" name="rentStatus"> Yes
            </div>
    <div  id = "addbuttons" >
    <button  id = "plus" >Add</button>
    <button  id = "minus" >cancel</button>
    </div>
    </div>
    
    `
     document.getElementById("plus").addEventListener("click", confirmSubmission);
    document.getElementById("minus").addEventListener("click", cancelSubmission);
  updateRentMembers();

}



function confirmSubmission() {

    const name = document.getElementById("memName").value.trim();
    const flat = parseInt(document.getElementById("memFlat").value.trim(), 10); 
     const rentPaid = document.getElementById("memRent").checked; 
     const pass = Math.floor(Math.random()*8)+8
     const amount = Math.floor(Math.random()*5+1)*1000
     const img = Math.floor(Math.random()*11)+1
    

    if (name === "" || flat === "") {
        alert("Please fill all fields");
        return;
    }

    RentMembers.push({
        name: name,
        flatNo: flat,
        rent: rentPaid,       
        complain: false,
        password:pass,
        balance:amount,
        img : `m${img}.png`

    });
updateRentMembers();
rents();
    const addmembers1 = document.getElementById("addmembers"); 
    addmembers1.innerHTML = `<p  id = "added" >Added succesfully</p>`

 

    setTimeout(() => {
       cancelSubmission()
    }, 4000);

    colorHomes()
    home()
}

function cancelSubmission() {
    const addmembers1 = document.getElementById("addmembers");
    addmembers1.innerHTML = `
        <p id="m-heading">Add Members</p>
        <p id="m-number">ADD</p>
    `;

    
    document.getElementById("m-number")
        .addEventListener("click", addmember);
}


function colorHomes() {
    let counter = 10
      for (let i = 10; i < 74; i++) {
           let member = RentMembers.find(m => m.flatNo === i);
        let colour = member ? "red" : "green";
        fill+=`<div  class = "houses"   style="background-color:${colour};"   ><p  id = "name" >${counter}-A</p></div>`
        counter++
     }
}


function homesview() {
    content.innerHTML = `<div  id = "homesview" ></div>`
      topname.textContent = "APARTMENTS VIEW"
    let apartments = document.getElementById("homesview")
    fill = ""
    colorHomes()
  
     apartments.innerHTML = fill

}

function submitNotice() {
    let noticeinput = document.getElementById("notice")
    let notice  =noticeinput.value.trim()

     localStorage.setItem("ownerMessage",JSON.stringify(notice))
     noticeinput.value= " "
}
function complainView() {
    topname.textContent = "COMPLAINS SECTION"
    content.innerHTML = `<div id = "complainview" ></div>`


    let complainview = document.getElementById("complainview")

    console.log("Complains array:", membersComplains);
console.log("Length:", membersComplains.length);
     
if(membersComplains.length===0){
content.innerHTML = `<div id="complainview"><p id="noComplains">NO Complains</p></div>`;
}

    let filling = ""
    for (let i = 0; i < membersComplains.length; i++) {
        filling+=`<div id = "memcomplain" >
        <p  id = "actualComplain" >${membersComplains[i].complain}</p>
<div  id = "complainOptions" ><p  id = "complainFlatNo" >FlatNo : ${membersComplains[i].flatNo}-A</p><button  class="complainResolved"  data-flat="${membersComplains[i].flatNo}"  >Resolved</button>  </div>
        </div>`
       
    }
    complainview.innerHTML = filling
    let  complainResolved = document.getElementsByClassName("complainResolved")

for (let i = 0; i <membersComplains.length ; i++) {
        complainResolved[i].addEventListener("click",(e)=>{
                let flatValue = e.target.getAttribute("data-flat");
            for (let j =0 ; j < RentMembers.length; j++) {
                if(RentMembers[j].flatNo==flatValue){
                    RentMembers[j].complain = false
                     break;
                }
                
            }
              const index = membersComplains.findIndex(c => c.flatNo == flatValue);
        if (index !== -1) {
            membersComplains.splice(index, 1);
             complainView()
        }
              updateRentMembers();
              updateComplains()
             
    })
    
}
}


addmembers.addEventListener("click",addmember)
hom.addEventListener("click",home)
members.addEventListener("click",member)
building.addEventListener("click",homesview)
notice.addEventListener("click",submitNotice)
complain.addEventListener("click",complainView)