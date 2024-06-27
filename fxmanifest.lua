fx_version 'adamant'
game 'gta5'
lua54 'yes'

author 'sheen'
description 'bs menu'
version '1.0'

shared_scripts {
    'config.lua',
}

client_scripts {
    'client/client.lua',
}

ui_page 'html/index.html'
files { 
    'html/images/**.png',
    'html/images/**.jpg',
    'html/index.html', 
    'html/config.js',
    'html/particles-config.js',
    'html/script.js',
    'html/styles.css',
}

escrow_ignore {
    '**.lua',
}
