if(typeof FileReader == "undefined") {
    alert("您的浏览器未实现FileReader接口！");
}
//给jQuery提供访问FileList对象的功能
Dom7.fn.files = function() {
    return this[0].files;
};

//传入的事件处理器函数代码
	var createTag = function(txt) {
		$$(".temp").append($$("<span>").text(txt+'<br/>'));
	};
	
	var handler = {
		load : function(event) {
			createTag("this is FileReader's onload event.");
			$$("<p>").append(event.target.result).appendTo("#fileContent");
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

Dom7.fn.readAsText = function(handler, encoding) {
	if (typeof encoding == "undefined") {
		encoding = "UTF-8";
	}
	var files = this.files();
	
	var reader = null;
	for ( var i = 0; i < files.length; i++) {
		
		reader = getFileReader(files[i]);
		
		if (!/text\/\w+/.test(files[i].type)) {
			reader.onload=createTag("Loading ..." + files[i].name);
			reader.loadEnd=createTag("Loading have  End!" + files[i].name);
		} else {
			reader.onload=createTag("Loading ..." + files[i].name);
			reader.readAsText(files[i], encoding);
			alert(reader.result);
			$$("#fileContent").append($("<span>" + files[i].name + "<br>" + reader.result +"<br/>"));
			
			reader.loadEnd=createTag("Loading have  End!" + files[i].name);
		}

	}
	return this;
};



Dom7.fn.addText= function(txt) {
	var createTag = function(txt) {
		$$("#console").append($$("<span>").text(txt).after("<br/>"));
	}
};



Dom7.fn.readAsBinaryString = function(handler) {
	var files = this.files();
	var reader = null;
	for ( var i = 0; i < files.length; i++) {
		reader = getFileReader(handler);
		reader.readAsBinaryString(files[i]);
	}
	return this;
};

Dom7.fn.readAsDataURL = function(handler,preEle,imgEle) {
	var files = this.files();
	var reader = null;
	var imageHandler = function(event) {
		$$(imgEle).attr("src", event.target.result).appendTo(preEle);
		$$("."+imgEle.replace("#","")+"_64").val(event.target.result);
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