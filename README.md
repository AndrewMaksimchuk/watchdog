# watchdog   

This program monitors the folder specified in the configuration file for changes in it and as soon as a new file (files) are added,   
it will automatically move them according to the file type to a specific address and distribute them in folders according to the file type.   
All addresses, file types are configured in a special configuration file "config.js".   

Types of files sorted by the program by folders when they are moved:   
- jpg   
- djvu   
- pdf   
- txt   
- zip   

All other file types will be placed in a folder named "others".   
