const URL= 'https://api.github.com/users';
const inputEl = document.querySelector('#search')
const button = document.querySelector('.btn')
const error = document.querySelector('#error')
const displayUI=document.querySelector('.display-area')
const darkMode = document.querySelector('.dark')

button.addEventListener('click',getUser)

darkMode.addEventListener('click',()=>{
    document.body.classList.toggle('darkMode')
})

async function getUser(){
    const user = inputEl.value;
    error.textContent=''
    if(user!==''){
    let res = await fetch(`${URL}/${user}`)
    let data = await res.json();
    console.log(data)
    if(data.message){
        console.log('not found')
    } else{
        displayUser(data)
    }
    } else{
        validate()
    }
    inputEl.value=''
}



function displayUser(user){
    if(user){
        displayUI.innerHTML=`
        <img src=${user.avatar_url} class="avatar" />
        <p>@${user.login}</p>
        <p>${user.name}</p>
        <p>${user.bio}</p>
        
       `
    }
}

function userNotFound(user){

}

function validate(){
    console.log('enter username')
    error.textContent='Enter Username First'
}