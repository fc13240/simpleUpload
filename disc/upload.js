(function(e,t){var a=~navigator.appName.indexOf("Microsoft"),n=/debug/.test(location.search);t=t||"Upload";var i=(new Date).getTime(),l=[t,i,"cb"].join("_"),s={};s.slice=function(e,t){return[].slice.call(e,t||0)},s.initNull=function(e,t){for(var a=t.length;a>0;a--)e[t[a-1]]=null;return e},s.isEmpty=function(e,t,a){var n=e?a:t;n&&n()},s.getFlashHtml=function(e,t,a,n){var i=n.swf+(n.swfVersion||""),l=$.param(s.getFlashParam(e,n)),o='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="'+e+'">'+'<param name="allowScriptAccess" value="sameDomain" />'+'<param name="movie" value="'+i+'" />'+'<param name="quality" value="high" />'+'<param name="bgcolor" value="#ffffff" />'+'<param name="wmode" value="transparent">'+'<param name="flashvars" value="'+l+'">'+'<embed src="'+i+'" name="'+e+'" quality="high" bgcolor="#ffffff" name="'+e+'" swLiveConnect="true" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" flashvars="'+l+'"/> '+"</object>";return o},s.getFlashParam=function(e,t){for(var a=["minWidth","minHeight","thumbnailWidth","thumbnailHeight","thumbnailQuality","fileType","allowFileSize","allowFileSize","noCompressUnderSize","allowFileNum","fileName","uploadUrl"],n={movieName:e,cb:l},i=a.length-1;i>0;i--){var s,o=a[i];o in t&&(s=t[o])&&(n[o]=s)}return n},s.log=function(){return"undefined"!=typeof console&&n?function(){console.log.apply(console,s.slice(arguments))}:function(){}}(),s.getUploadTmpl=function(e,t){for(var a='<ul class="upload_progress" id="'+e+'_progress">',n=0,i=t.length;i>n;n++){var l=t[n],s=l.index,o=l.name;a+='<li class="upload_file"><span class="upload_filename" title="'+o+'">'+o+"</span>"+'<span class="upload_close" data-name="'+e+'" data-index="'+s+'">X</span>'+'<span class="upload_status">等待..</span>'+'<span class="upload_progressbar"></span>'+"</li>"}return a+='<li><input class="upload_cancel_btn" type="button" value="取消所有上传"/></li></ul>',$(a)};var o=function(e,t){this.msg=t,this.type=e};o.TYPE_CONFIG="01";var r=s.initNull({swf:"../flash/upload.swf",checkFile:function(e){return e}},["btn","uploadUrl","swfVersion","fileType","allowFileSize","noCompressUnderSize","allowFileNum","fileName","minWidth","minHeight","thumbnailWidth","thumbnailHeight","thumbnailQuality"]),c={length:0},u=function(e){var a=this,n=[t,i,c.length++].join("_");c[a.name=n]=a,a.config(e).initEvent(),a.uploadedFiles=[]},p=u.prototype;p.initEvent=function(){this.on({toMaxSize:function(e){alert("最大可上传大小为 "+e+" 的文件")},toMaxNum:function(e){alert("最多可上传"+e+"个文件")},illegalFileType:function(){alert("请选择正确的文件类型")},cancel:function(e){this.getFlash().cancel(e)},cancelSuccess:function(e){var t=this,a=!0;if(e){var n=t.processFiles[e];n&&n.remove(),a=--t.processFiles.length}a&&(delete t.processTmpl.remove(),delete t.processFiles)},startUpload:function(){this.uploadedFiles=[]},getFiles:function(e){var t=this,a=t.flashObj,n=a.position(),i=t.processTmpl=s.getUploadTmpl(t.name,e).css({left:n.left,top:n.top+a.height()}).find(".upload_close").click(function(){t.emit("cancel",$(this).data("index"))}).end().find(".upload_cancel_btn").click(function(){t.emit("cancel")}).end().appendTo(t.container),l={length:0};i.find(".upload_file").each(function(e,t){l[e]=$(t),l.length++}),t.processFiles=l},uploadProcess:function(e,t){t=Number(t)||0;var a=this,n=a.processFiles[e];n.find(".upload_status").html((100*t).toFixed(2)+"%"),n.find(".upload_progressbar").css("width",function(){var e=$(this),a=e.data("tW");return a||(a=e.parent().width()-2*parseFloat(e.css("left")),e.data("tW",a)),a*t})},uploadComplete:function(e,t){var a=this;e?(t=$.parseJSON(t),a.setting.checkFile(t)?(a.uploadedFiles.push(t),a.emit("uploadProgress",e,1),a.uploadedFiles[e]=t,a.processFile[e].find(".upload_status").html("成功").end().find(".upload_progressbar").css("width",function(){var e=$(this);return e.parent().outerWidth()-$(e).css("left")}).end().find(".upload_close").remove()):a.emit("cancelSuccess").emit("error",t)):a.emit("cancelSuccess").emit("uploadCompleteAll",a.uploadedFiles)},uploadError:function(e,t,a){this.failedNum++,this.emit("error",{type:t,msg:a})}})},p.config=function(e){var t=$.extend,a=this;a.setting||(a.setting=t(!0,{},r));var n=arguments;if("string"==typeof e&&2==n.length){var i={};i[e]=n[1],e=i}return t(!0,a.setting,e),a},p.on=function(e,t){var a={};t?a[e]=t:a=e;var n=this.events||(this.events={});for(var i in a)(n[i]||(n[i]=[])).push(a[i]);return this},p.off=function(e,t){if(t)for(var a=this.events[e],n=a.length;n>0;n--)a[n-1]==t&&a.splice(n-1,1);else delete this.events[e];return this},p.emit=function(e){for(var t=this.events[e]||[],a=s.slice(arguments,1),n=0,i=t.length;i>n;n++)t[n].apply(this,a);return this},p.appendTo=function(e){var t=this,a=t.setting;if(e=$(e),e&&e.length)if(a.uploadUrl){var n=$(s.getFlashHtml(t.name,0,0,a)).css({position:"absolute","z-index":99});t.container=$(e).append(this.flashObj=n).css("position","relative"),t.resetPos()}else f.call(t,"uploadUrl");else f.call(t,"appendTo1");return t};var f=function(e){this.emit("error",new o(o.TYPE_CONFIG,e))};p.resetPos=function(){var e=this,t=e.setting,a=$(t.btn);if(a&&a.length)if(t.uploadUrl)if(e.container){var n=a[~e.container.find(a).length?"position":"offset"]();e.flashObj.css(n).add(e.flashObj.find("embed")).css({width:a.outerWidth(),height:a.outerHeight()})}else f.call(e,"appendTo");else f.call(e,"uploadUrl");else f.call(e,"btn");return e},p.getFlash=function(){return(a?window:document)[this.name]},e[l]=function(e){s.log.apply(null,s.slice(arguments));var t=c[e];t&&t.emit.apply(t,s.slice(arguments,1))},e[t]=u,e.Util=s,e.uploadCache=c})(this);