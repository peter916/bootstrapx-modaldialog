/**
 * peter916
 * 2013-03-18
 */
(function($) {
	
	var ModalDialog = function (element, options) {
		this.dialog(element, options);
	};

	ModalDialog.prototype = {
			constructor: ModalDialog,
			
			dialog : function(element,options){
				//兼容iframe弹出对话框 显示在top页面
				if(!(window.top===window)){
					var elementid = $(element).attr("id");
					var topelement = window.top.$("#"+elementid);
					if(topelement.length==0){
						$(element).clone().appendTo(window.top.$("body"));
					}
					topelement = window.top.$("#"+elementid);
					this.$element = topelement;
					//等待对话框加载
					window.top.$("body").modalmanager('loading');
				}else{
					this.$element = $(element);
					//等待对话框加载
					$("body").modalmanager('loading');
				}
				
				this.options = options;
				
				//this.$element = $(element);
				this.$element.removeClass('modal').addClass('modal');
				this.$element.removeClass('hide').addClass('hide');
				this.$element.removeClass('fade').addClass('fade');
				this.$element.attr('tabindex','-1');
				
				var dialog = this.joinDialogHtml(this.options);
				this.$element.empty();
				$(dialog).appendTo(this.$element);
				
				var $modal = this.$element;
				var $content = $modal.find('.modal-body');
				var $footer = $modal.find('.modal-footer');
				//设置等待时间
			    setTimeout(function(){
			    	//显示对话框_modal
			    	var url = options.url;
			    	url = url.indexOf('?') > 0 ? url+'&sitemesh=false' : url = url+'?sitemesh=false';
			    	
			    	$content.load(url,function(){
			    		$modal.modal(options);
			    	});
			    	//设置关闭事件
			    	$modal.on('hidden',function(e){
			    		//清空对话框内容
			    		$modal.empty();
			    		$modal.remove();
		    		});
			    }, options.delay);
			    this.$element.data('modaldialog', this);
			},
		//拼接按钮html
		joinButtonsHtml : function(buttons){
			if ( buttons.length > 0 ){
				var buttonsArr = new Array();
				buttonsArr.push('<div class="modal-footer">');
				for ( var i = 0; i < buttons.length; i++ ){
					var button = buttons[i];
					buttonsArr.push('<button type="button" id="'+button.id+'" ');
					if ( button.close == true ){
						buttonsArr.push('data-dismiss="modal" aria-hidden="true"');
					}
					
					buttonsArr.push('class="btn ');
					//设置按钮style
					buttonsArr.push(' '+button.style+' ');
					
					buttonsArr.push('">'+button.name+'</button>');
				}

				buttonsArr.push('</div>');
				return buttonsArr.join('');
			}
		},
		//拼接对话框html
		joinDialogHtml : function (opts){
				
				var dialog = new Array();
//				dialog.push('<div class="modal hide fade" tabindex="-1">');
				dialog.push('<div class="modal-header">');
				if ( opts.close == true ){
					dialog.push('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
				}
				dialog.push('<h3 id="myModalLabel">');
				dialog.push(opts.title);
				dialog.push('</h3></div>');
				dialog.push('<div class="modal-body" style="overflow:hidden;"></div>');
				
				dialog.push(this.joinButtonsHtml(opts.buttons));
				
//				dialog.push('</div>');
				
				return dialog.join('');
			},
		//设置对话框按钮
		setDialogButtons:function(buttons){
				var buttonshtml = this.joinButtonsHtml(buttons.buttons);
				if ( buttonshtml != '' ){
					this.$element.find('.modal-footer').remove();
					this.$element.append(buttonshtml);
				}
			},
		//关闭对话框
		close:function(params){
			if ( $.isFunction(this.options.callback) ){
				this.options.callback(params);
			}
			this.$element.modal('hide');
		},
		//动态改变对话框url
		loadUrl:function(url){
			
	    	if (url.indexOf('?') > 0 )
	    		url = url+'&sitemesh=false';
	    	else
	    		url = url+'?sitemesh=false';
			var $element = this.$element;
			$element.modal('loading');
			$element.find('.modal-body').load(url,function(){
				$element.modal('loading');
			});
		},
		//父页面向对话框传数据
		setData:function(data){
			this.data = data;
		},
		getData:function(){
			return this.data;
		}
	};
	
	
	$.fn.modalDialog = function (option, args) {
//		return this.each(function () {
			var $this = $(this),
				data = (top==window)?$this.data('modaldialog'):window.top.$("#"+$this.attr("id")).data('modaldialog'),
				options = $.extend({}, $.fn.modalDialog.defaults, $this.data(), typeof option == 'object' && option);
			//if (!data) $this.data('modaldialog', (data = new ModalDialog(this, options)));
			if (!data){
				data = new ModalDialog(this, options);
			} 
			if (typeof option == 'string') return data[option].apply(data, [].concat(args));
//			else if (options.show) data.show()
//		})
	};
	
	$.fn.modalDialog.defaults ={ 
			title:"对话框", 
			width:500,
			height:400,
			close:true,		   //是否显示右上角的x
			backdrop: 'static',//模态
			keyboard: false,   //esc键关闭对话框
			url:'',		   	   //对话框加载的页面
			callback:null,	   //对话框关闭的回调函数
			manager: 'body',
			delay: 50,		   //对话框延迟打开时间 ms
			buttons:[]
		  };
	
	
})(jQuery);
