let selectedgame= 0;
let bin=document.getElementById('bin');
let linkinbox=document.getElementById('inbox');
let linkcompose=document.getElementById('compose');

bin.addEventListener('click',function(e){
    e.preventDefault();
    let del=games.filter(game=>game.deleted);
    selectedgame=0;
    render(del);
    });
    
    
    linkinbox.addEventListener('click',function(e){
        e.preventDefault();
        let inbox=games.filter(game=> !game.deleted);
        selectedgame=0;
        render(inbox);
        });

      linkcompose.addEventListener('click',composeform);
      function composeform(e){   
      e.preventDefault();
         let html_composeform = `
         <form id="new" class="pure-form pure-form-aligned">
         <fieldset>
             <div class="pure-control-group">
                 <label for="name">Game Title</label>
                 <input id="name" type="text">
                
             </div>
     
             <div class="pure-control-group">
                 <label for="publisher">publisher</label>
                 <input id="publisher" type="text">
             </div>
     
             <div class="pure-control-group">
                 <label for="year">Published in</label>
                 <input id="year" type="text" placeholder="Year">
             </div>
     
             <div class="pure-control-group">
                 <label for="foo">Description</label>
                 <input id="foo" type="text" placeholder="Enter description...">
             </div>
             <div class="pure-control-group">
             <label for="avtar">Avatar Url:</label>
             <input id="avtar" type="text" placeholder="Paste the Avatar url">
         </div>
         <div class="pure-control-group">
         <label for="ifrm">iframe Url:</label>
         <input id="ifrmsrc" type="text" placeholder="Paste the iframe url">
     </div>
     
             
                 <button id="send" type="submit" class="pure-button pure-button-primary">Submit</button>
             </div>
         </fieldset>
     </form>
         `;
      let main=document.getElementById('main');
      main.innerHTML=html_composeform;    

      let send=document.getElementById('new');
      send.addEventListener('submit',function(e){
            e.preventDefault();
        let obj_new={
            subject:document.forms.new.name.value,
            publisher:document.forms.new.publisher.value,
            date:document.forms.new.year.value,
            body:document.forms.new.foo.value,
            avatar:document.forms.new.avtar.value,
            ifrmsrc:document.forms.new.ifrmsrc.value,
        }
        games.unshift(obj_new);
        setlocalStorage();
        
        let inbox=games.filter(game=> !game.deleted);
        selectedgame=0;
        render(inbox);
      });
        } 

function render(games){
let cp = `
${games.map((game, index) => `
<div class="email-item email-item-selected pure-g" data-id="${index}">
            <div class="pure-u">
                <img width="64" height="64" alt="Tilo Mitra&#x27;s avatar" class="email-avatar" src="${game.avatar}">
            </div>

            <div class="pure-u-3-4">
                <h5 class="email-name">${game.publisher}</h5>
                <h4 class="email-subject">${game.subject}</h4>
                <p class="email-desc">
                   ${game.body}
                </p>
            </div>
        </div>
        `).join(``)}
`;
let cpl = document.getElementById('list');
cpl.innerHTML=cp;

initialize(games);
}
function initialize(games){
let gameli=[...(document.querySelectorAll('[data-id]'))];
gameli.map((game,index)=>game.addEventListener('click', function(e){
gameli[selectedgame].classList.remove('email-item-selected');
game.classList.add('email-item-selected');
selectedgame=index;
showgamebody(index,games);
}));
if (games.length){
    gameli[selectedgame].classList.add('email-item-selected');
    showgamebody(selectedgame,games);
} else{

let main=document.getElementById('main');
main.innerHTML='<h1>No games</h1>';
}
}



function showgamebody(idx,games){
    let gb=`    
    <div class="email-content">
    <div class="email-content-header pure-g">
        <div class="pure-u-1-2">
            <h1 class="email-content-title">${games[idx].subject}</h1>
            <p class="email-content-subtitle">
           Published by ${games[idx].publisher}     ${games[idx].date}</span>
            </p>
        </div>
    
        <div class="email-content-controls pure-u-1-2">
            <button id="del" class="secondary-button pure-button"data-id="${idx}">Delete</button>
            <button class="secondary-button pure-button">Archieve</button>
            <button class="secondary-button pure-button">Unread</button>
        </div>
    </div>
    
    <div class="email-content-body">
        
      <iframe width=800 height=500 seamless src="${games[idx].ifrmSrc}">    
    </div>
    </div>
      `;
      let main=document.getElementById('main');
      main.innerHTML=gb;
      

      let btn_del=document.getElementById('del');
      btn_del.addEventListener('click',() => deletemail(btn_del.dataset.id,games));
    }
    function deletemail(index,games){
        if(!games[index].deleted){
             games[index].deleted=true; 
           
             setlocalStorage();
        
             let inbox=games.filter(game=> !game.deleted);
             selectedgame=0;
             render(inbox);
        } else{

            delete games[index].deleted;
            let del=games.filter(game=>game.deleted);
            selectedgame=0;
            render(del);
        }

 }
 function setlocalStorage(){
     localStorage.setItem('items',JSON.stringify(games));

 }



if (localStorage.getItem('items')){
games=JSON.parse(localStorage.getItem('items'));
let del=games.filter(game=> !game.deleted);
render(del);
} else {
    render (games);
}

