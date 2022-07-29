function login() {
	let name=$('#name').val()
	let	passw=$('#pass').val()

	console.log(name)
	console.log(passw)
	let acc={
		userName:name,
		pass:passw
	}

	 $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/acc",
            data: JSON.stringify(acc),
            //xử lý khi thành công
            success: function (data) {
            	if (data) {
            		location.href = "index.html";
            	}else{
            		location.href = "login.html";  
            	}
            },
            error: function (err) {
				          }
        })
}

