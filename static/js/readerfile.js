if(typeof FileReader == "undefined") {
    alert("您的浏览器未实现FileReader接口！");
}


//给jQuery提供访问FileList对象的功能
jQuery.fn.files = function() {
    return this[0].files;
};



//“显示文件信息”按钮的click事件代码
$(function() {
	$("#showInfoBtn").click(function(event) {
		$("#clearBtn").click();
		var fileObjs = $("#selectFiles").files();
		var sum = 0, count = 1;
		var tbody = $("<tbody>");
		for ( var index = 0; index < fileObjs.length; index++) {
			$("<tr>").append($("<td>").append("<meter>").val(count).text(count))
				.append($("<td>").text(fileObjs[index].name))
				.append($("<td>").text(fileObjs[index].type))
				.append($("<td>").append($("<meter>").val(fileObjs[index].size).text(fileObjs[index].size / 1024)))
				.append($("<td>").text(fileObjs[index].lastModifiedDate)).appendTo(tbody);
			sum += fileObjs[index].size;
			count++;
		}
		$("td>meter, #sum").attr("max", 5 * 1024 * 1024);
		$("#info>thead").after(tbody);
		$("#count").attr("max", "10").val(fileObjs.length).text(fileObjs.length);
		$("#sum").val(sum).text(sum / 1024);
	});
});




$(function() {
	$("#clearBtn").click(function(event) {
		$("#info>tbody, #fileContent, #console").empty();
		$("#count, #sum").val(0).text(0);
	});
});



//三个按钮的click事件代码
$(function() {
	$("#txtBtn").click(function(event) {
		$("#selectFiles").readAsText(handler);
		//$("#selectFiles").readAsText($("#selectFiles").files(),"UTF-8");
	});

	$("#binBtn").click(function(event) {
		$("#selectFiles").readAsBinaryString(handler);
	});

	$("#urlBtn").click(function(event) {
		$("#selectFiles").readAsDataURL(handler);
	});
});


////////


//传入的事件处理器函数代码
	var createTag = function(txt) {
		$("#console").append($("<span>").text(txt).after("<br/>"));
	};

	var handler = {
		load : function(event) {
			createTag("this is FileReader's onload event.");
			$("<p>").append(event.target.result).appendTo("#fileContent");
		},
		loadStart : function(event) {
			createTag("this is FileReader's onloadstart event.");
		},
		loadEnd : function(event) {
			createTag("this is FileReader's onloadend event.");
		},
		abort : function(event) {
			createTag("this is FileReader's onabort event.");
		},
		error : function(event) {
			createTag("this is FileReader's onerror event.");
		},
		progress : function(event) {
			createTag("this is FileReader's onprogress event.");
		}
	};
	
	
	var getFileReader = function(handler) {
	var reader = new FileReader();
	//var reader = FileReader(handler);
	
	reader.onloadstart = handler.loadStart;
	reader.onprogress = handler.progress;
	reader.onload = handler.load;
	reader.onloadend = handler.loadEnd;
	reader.onabort = handler.abort;
	reader.onerror = handler.error;
	return reader;
	};


////////////

jQuery.fn.readAsText = function(handler, encoding) {
	if (typeof encoding == "undefined") {
		encoding = "UTF-8";
	}
	var files = this.files();
	
	var reader = null;
	for ( var i = 0; i < files.length; i++) {
		

		//alert(files[i].name);
		reader = getFileReader(files[i]);
		
		
		if (!/text\/\w+/.test(files[i].type)) {
			reader.onload=createTag("Loading ..." + files[i].name);
			reader.loadEnd=createTag("Loading have  End!" + files[i].name);
		} else {
			reader.onload=createTag("Loading ..." + files[i].name);
			reader.readAsText(files[i], encoding);
			alert(reader.result);
			$("#fileContent").append($("<span>" + files[i].name + "<br>" + reader.result +"<br/>"));
			
			reader.loadEnd=createTag("Loading have  End!" + files[i].name);
		}

	}
	return this;
};



jQuery.fn.addText= function(txt) {
	var createTag = function(txt) {
		$("#console").append($("<span>").text(txt).after("<br/>"));
	}
};



jQuery.fn.readAsBinaryString = function(handler) {
	var files = this.files();
	var reader = null;
	for ( var i = 0; i < files.length; i++) {
		reader = getFileReader(handler);
		reader.readAsBinaryString(files[i]);
	}
	return this;
};

jQuery.fn.readAsDataURL = function(handler) {
	var files = this.files();
	var reader = null;
	var imageHandler = function(event) {
		$("<img>").attr("src", event.target.result).appendTo("#fileContent");
	};
	for ( var i = 0; i < files.length; i++) {
		reader = getFileReader(handler);
		if (!/image\/\w+/.test(files[i].type)) {
			reader.readAsDataURL(files[i]);
		} else {
			reader.onload = imageHandler;
			reader.readAsDataURL(files[i]);
		}
	}
	return this;
};