
module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");

	var component = grunt.file.readJSON("./component.json");

	var options = {
		splitBanners : true,
		banner : grunt.file.read("./src/banner.js").replace("{{version}}", component.version)
	};

	grunt.initConfig({
		concat : {
			options : options,
			dist : {
				src : ["<banner>", "./src/jquery-modullatte.js"],
				dest : "./dist/jquery-modullatte.js"
			}
		},
		uglify : {
			options : options,
			dist : {
				src : ["<banner>", "./src/jquery-modullatte.js"],
				dest : "./dist/jquery-modullatte.min.js"
			}
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};