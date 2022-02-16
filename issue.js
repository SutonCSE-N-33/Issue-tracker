
const submitBtn = document.getElementById('submitBtn');
let count = -1;
submitBtn.addEventListener('click',function(e){
    e.preventDefault();
    count++;
    const issueDescription = document.getElementById('issueDescription').value;
    const issueSeverity = document.getElementById('issueSeverity').value;
    const assigned = document.getElementById('issueAssignedTo').value;
    const id = Math.floor(Math.random()*100000000) + '';
   const status = 'Open';
    const post = {
        description:issueDescription,
        severity:issueSeverity,
        assigned:assigned,
        id:id,
        status:status
    }
    createElement(post,count);
    updateStorage(post);
    totalElement()


    document.getElementById('issueDescription').value = '';
    document.getElementById('issueAssignedTo').value = '';
})


function createElement(post,count){
    const parent = document.getElementById('issuesList');
    const child = document.createElement('div');
    child.classList.add('well');
    child.innerHTML = `<h6 class="id">Issue ID: ${post.id} </h6>
                    <div class="bug-detail">
                    <p><span class="label label-info"> ${post.status} </span></p>
                    <h3 id="description"> ${post.description} </h3>
                    <p><span class="glyphicon glyphicon-time"></span> ${post.severity}</p>
                    <p><span class="glyphicon glyphicon-user"></span> ${post.assigned}</p>
                    <a href="#" id="closeBtn" class="btn line-through btn-warning">Close</a>
                    <a href="#" onClick="removeSingleItem(${count})" class="btn remove btn-danger">Delete</a>
                    </div>`;
                      parent.appendChild(child);
                      

}


function updateStorage(post){
    const storageItem = localStorage.getItem('postItems')?JSON.parse(localStorage.getItem('postItems')):[];
    storageItem.push(post);
    localStorage.setItem('postItems',JSON.stringify(storageItem));
}

function displayStorage(){
    const exist = localStorage.getItem('postItems');
    if(exist){
        const displayStorageItem = JSON.parse(localStorage.getItem('postItems'));
        displayStorageItem.map(element => createElement(element));
    }
    totalElement()
}
document.addEventListener('DOMContentLoaded',displayStorage);

function removeSingleItem(index){
    const mainParent = document.getElementById('issuesList');
    const parent = document.querySelector('.well');
    mainParent.removeChild(parent);
    editStorage(index);
    
}


function editStorage(index){
    const editStorageItem = JSON.parse(localStorage.getItem('postItems'));
    editStorageItem.splice(index,1);
    localStorage.setItem('postItems',JSON.stringify(editStorageItem));
    totalElement(editStorageItem)
}



const mainParent = document.getElementById('issuesList');
mainParent.addEventListener('click',function(e){
    e.preventDefault();
    const parent = e.target.parentNode;
    if(e.target.classList.contains('line-through')){
        const through = document.getElementById('description');
        through.style.textDecoration="line-through";
    }
})


function totalElement(index){
    const totalItem = JSON.parse(localStorage.getItem('postItems'));
    const totalValue = totalItem.length;
    const title = document.getElementById('title');
    if(index == undefined){
    title.innerText=totalValue;
    }else{
        const sub = index.length;
        title.innerText=sub;
    }
}