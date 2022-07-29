let formData=document.getElementById("formData")

function showform(status){
	if (status) {
		formData.style.display='block'
		showCate()
	}else{
		formData.style.display='none'
	}
}



function showCate() {
	$.ajax({
	type: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    url: "http://localhost:8080/blogs/category",
    //xử lý khi thành công
    success: function (data) {
    	let str = "";
    	for (let i = 0; i < data.length; i++) {
        str += `<option value="${data[i].id}">${data[i].name}</option>`
    }
    document.getElementById("idCategory").innerHTML = str;
    },
    error: function (err) {
        console.log(err)
    }
})
    
}


function showEdit(id1){
    showform(true)
    let id = document.getElementById("id")
    let title =document.getElementById("title")
    let content = document.getElementById("content")
    let date = document.getElementById("date")
    let img = document.getElementById("img")
    let idCategory = document.getElementById("idCategory")
    $.ajax({

            type: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/blogs/showEdit?id="+id1,
            //xử lý khi thành công
            success: function (data) {
                id.value=id1

                title.value=data.title

                content.value=data.content
                date.value=data.date
                img.value=data.img
                idCategory.value=data.category.id

            },
            error: function (err) {
                console.log(err)
            }

    })
}



function save(){
    let id = $('#id').val();

    let title = $('#title').val();
    let content = $('#content').val();
    let date = $('#date').val();
    let img = $('#img').val();
    let idCategory = $('#idCategory').val();
    formData.style.display='none'

        let obj = {
        	id:id,
            title: title,
            content: content,
            date: date,
            img: img,
            category: {
                id: idCategory
            }
        }
    console.log(obj)
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/blogs",
            data: JSON.stringify(obj),
            //xử lý khi thành công
            success: function () {
                location.reload()
            },
            error: function (err) {
                console.log(err)
            }
        })
}