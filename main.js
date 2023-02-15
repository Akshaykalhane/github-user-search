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
        userNotFound()
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
        const twitter = user.twitter_username==null ? 'Twitter Not Available' : user.twitter_username
        const blog= user.blog=='' ? 'No Blog' : user.blog
        const company = user.company==null ? 'No Company' : user.company
        displayUI.innerHTML=`
        <div class="profile-head">
        <img src=${user.avatar_url} class="profile-img" />
        <div class="info">
        <h2>${user.name}</h2>
        <p class="username">@${user.login}</p>
        <p class="bio">${user.bio}</p>
        </div>
        <p class="join-date">Joined ${user.created_at.slice(0,10).split('-').join(' ')}</p>
        </div>
        <div class="profile-stat">
            <div class="stat-box">
                <p>Repos</p>
                <h3>${user.public_repos}</h3>
            </div>
            <div class="stat-box">
                <p>Followers</p>
                <h3>${user.followers}</h3>
            </div>
            <div class="stat-box">
                <p>Following</p>
                <h3>${user.following}</h3>
            </div>
        </div>
        <div class="more-info">
            <div class="more-info-box">
                <p>${user.location}</p>
            </div>
            <div class="more-info-box">
                <p>${twitter}</p>
            </div>
            <div class="more-info-box">
                <p>${blog}</p>
            </div>
            <div class="more-info-box">
                <p>${company}</p>
            </div>
        </div>
       `
    }
}

function userNotFound(){
    // error.textContent='user not found'
    displayUI.innerHTML=`
    <h2 class="welcome-msg">user not found</h2>
    `
}

function validate(){
    console.log('enter username')
    error.textContent='Enter Username First'
}


