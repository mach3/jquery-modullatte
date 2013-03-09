(function($){

	/**
	 * Modullatte
	 *
	 * @class Simple HTML module
	 */
	var Modullatte = function(){

		var my = this;

		my.length = 0;

		/**
		 * Initialize
		 *
		 * @constructor
		 * @return Modullatte
		 */
		my.init = function(){
			$("[data-module-src]").each($.proxy(this.load, this));
			return this;
		};

		/**
		 * Load module content and pass it to build()
		 * 
		 * @param Integer index
		 * @param HTMLElement node
		 */
		my.load = function(index, node){
			var $node, onComplete;

			$node = $(node);
			onComplete = function(data, status){
				if(status === "success"){
					my.build(data.responseText, $node);
				}
				my.length --;
				if(! my.length){
					$(document).trigger("moduleload");
				}
			};
			this.length += 1;
			$.ajax({
				url : $node.data("moduleSrc"),
				complete : onComplete
			});
		};

		/**
		 * Build module contents ( update relative paths )
		 * and pass it to append()
		 * 
		 * @param String src
		 * @param jQuery $node
		 */
		my.build = function(src, $node){
			var moduleDir, updatePath;

			moduleDir = this.getDir($node.data("moduleSrc"));
			updatePath = function(a, header, c, url, footer, f){
				if(! url.match(/^(\/|http:\/\/|https:\/\/)/)){
					url = my.normalizePath(moduleDir + url);
				}
				return header + url + footer;
			};
			src = src.replace(/((src|href)=\")(.+?)(\")/g, updatePath);
			this.append(src, $node);
		};

		/**
		 * Append the module content and remove unused elements
		 *
		 * @param String src
		 * @param jQuery $node
		 */
		my.append = function(src, $node){
			var $con, $nodes;

			$con = $("<div>").css("display", "none").html(src);
			$nodes = $con.children().hide().insertBefore($node);
			if($node.data("moduleFadein")){
				$nodes.fadeIn();
			} else {
				$nodes.show();
			}
			$con.remove();
			$node.remove();
		};

		/**
		 * Get directory string from path
		 * 
		 * @param String path
		 * @return String
		 */
		my.getDir = function(path){
			return path.replace(/\?.+?$/, "").replace(/[^\/]*?$/, "");
		};

		/**
		 * Get normalized path
		 * 
		 * @param String url
		 * @return String
		 */
		my.normalizePath = function(url){
			var path = [];

			$.each(url.split("/"), function(i, value){
				if(value === "."){
					return;
				} else if(value === ".." && path.length && path[path.length - 1] !== ".."){
					path.pop();
				} else {
					path.push(value);
				}
			});
			return path.join("/");
		};

		my.init.apply(this, arguments);
	};

	$(function(){
		$.modullatte = new Modullatte();
	});

}(jQuery));