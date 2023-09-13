fx_version("cerulean")
game("gta5")

description("Text UI")
author("Lyre Scripts")
version("1.0.0")
lua54("yes")

files({
	"web/index.html",
	"web/css/*.css",
	"web/js/*.js",
})

ui_page({
	"web/index.html",
})

client_scripts({
	"client/*.lua",
})
