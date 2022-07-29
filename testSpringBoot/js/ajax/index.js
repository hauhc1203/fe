let login=document.getElementById("loginButon")
let logged = document.querySelectorAll('.logged');

$.ajax({
    type: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    url: "http://localhost:8080/blogs",
    //xử lý khi thành công
    success: function (data) {
        show(data.content);
    },
    error: function (err) {
        console.log(err)
    }
})
function chuyen(){
    let page = $('#page').val();
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/blogs?page="+page,
        //xử lý khi thành công
        success: function (data) {
            show(data.content);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

 $.ajax({
    type: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    url: "http://localhost:8080/acc",
    //xử lý khi thành công
    success: function (data1) {
        console.log(data1.userName)
        checkAcc(data1)
    },
    error: function (err) {
        console.log(err)
    }
})
function checkAcc(data){
    if (data.userName!=undefined) {
        login.style.display='none' 
        logged[0].style.display='inline-block'
        logged[0].innerText='Xin chào '+data.userName
        logged[1].style.display='inline-block'

        
    }else{
        login.style.display='inline-block' 
        logged[0].style.display='none'
        logged[1].style.display='none'
        
    }
}
function logout(){
     $.ajax({
    type: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    url: "http://localhost:8080/acc/logout",
    //xử lý khi thành công
    success: function () {
      location.href = "index.html";
    },
    error: function (err) {
        console.log(err)
    }
})
}
function show(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `<div id="blog${data[i].id}" class="single-blog-area blog-style-2 mb-50 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1000ms" >
                        <div class="row align-items-center">
                            <div class="col-12 col-md-6">
                                <div class="single-blog-thumbnail">
                                    <img src="${data[i].img}" alt="">
                                    <div class="post-date">
                                        <a href="#">12 <span>march</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <!-- Blog Content -->
                                <div class="single-blog-content">
                                    <div class="line"></div>
                                    <h4> <a href="#" class="post-headline">${data[i].title}</a>
                                    </h4>
                                    <p>${data[i].content}</p>
                                    <div class="post-meta">
                                        <p>By <a href="#">${data[i].date}</a></p>
                                        <p>3 comments</p>
                                    </div>
                                    <div class="post-meta">
                                       <button onclick="showEdit(${data[i].id})">Edit</button>
                                       <button onclick="del(${data[i].id})">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
`
    }
    document.getElementById("show").innerHTML = str;
}

function  del(id){
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/blogs/"+id,
        //xử lý khi thành công
        success: function () {
            $('#blog${id}').remove();
        },
        error: function (err) {
            console.log(err)
        }
    })
}


