$(function() {
 
   $("#searchUser").on('keyup', function(e) {
      let username = e.target.value;
      
      
       $.ajax({
           url: 'https://api.github.com/users/' + username,
           data: {
               client_id: '43eb5e356e2e8b6eda2a',
               client_secret: 'f5f204d755891afe334fed8479b72c1ea384cc41'
           }
       }).done(function(user){
           
           $.ajax({
             url: 'https://api.github.com/users/' + username + '/repos',
               data: {
               client_id: '43eb5e356e2e8b6eda2a',
               client_secret: 'f5f204d755891afe334fed8479b72c1ea384cc41',
               sort: 'created: asc',
               per_page: 5
               }
                   
           }).done(function(repos){
               
           $.each(repos, function(i, repo) {
                   $("#repos").append(`
                    <div class="panel panel-default">
                    <div class="panel-body">
                        <h4>${repo.name}</h4>

                    <div class="col-md-12 spantop">
                                <span class="label label-default">Forks: ${repo.forks_count}</span>
                                <span class="label label-primary">Obserwujących: ${repo.watchers}</span>
                                <span class="label label-success">Gwiazdki: ${repo.stargazers_count}</span>
                            </div>

                            <div class="col-md-12">
                                <a target="_blank" href="${repo.html_url}">Link do Projektu</a>
                            </div>
                    </div>
                    </div>
        
                `)   
      
           });
           });
           
           
           $('.show').html(`
            
        
            <div class="panel panel-default">
             
              <div class="panel-body">

                <div class="col-md-12">
                <h2>${user.name}</h2>
                </div>
                
                <div class="col-md-3">
                    <img class="thumbnail" src="${user.avatar_url}" alt="Avatar">
                    <a href="${user.html_url}" target="_blank" class="btn btn-danger btn-block">Zobacz Profil</a>
                </div>

                <div class="col-md-9">
                        <span class="label label-default">Publiczne Repozytoria: ${user.public_repos}</span>
                        <span class="label label-success">Obserwujący: ${user.followers}</span>
                        <span class="label label-info">Obserwuje: ${user.following}</span>
                        <br><br>

                        <ul class="list-group">
                            <li class="list-group-item">Firma: ${user.company}</li>
                            <li class="list-group-item">Strona/Blog: <a target="_blank" href="${user.blog}"> ${user.blog}</a></li>
                            <li class="list-group-item">Lokalizacja: ${user.location}</li>
                            <li class="list-group-item">Członek od: ${user.created_at}</li>
                    </div>
                
                    <div class="col-md-12">
                        <button id="moreinfo" class="btn btn-success">Zobacz więcej</button>
                    </div>
              </div>
            </div>

            `)
           
                $('#moreinfo').on('click', function(e) {
                         e.preventDefault();
                       $('.showmore').fadeToggle();
                   });
           
          $('.showmore').html(`  
           
            <div id="info">
              <div class="panel panel-default">
              <div class="panel-body">
                <div class="col-md-12">
                 <h3>Informacje</h3>
                </div>

                <div class="col-md-12">
                 <h4>ID</h4>
                </div>

                <div class="col-md-12">
                 <p>${user.id}</p>


                <div class="col-md-12">
                 <h4>O sobie</h4>
                </div>

                <div class="col-md-12">
                 <p>${user.bio}</p>
                </div>
                
              </div>
              </div>

        <div id="repos">
                <hr />
                <h3>Ostatnie Projekty</h3>
                
            </div>
            </div>

        `)
       });
       
   });
    
    
    
});

