# AIAdmin

Steps for running code on local machine:

1. Make sure you had grunt installed globally.

2. Take pull from release branch.

3. Change your folder path to your project folder path in command prompt.

4. Enter command 'npm install' so that all dependencies present in package.json file will be installed. (After completion, node_modules will be generated)

5. Enter command 'grunt' and your project will automatically run in your browser.

Steps for installing new dependency for your project:

1. Whenever you want to install new dependency, make sure you install it via npm install of directly giving its path in script.

2. You should enter command 'npm install <dependency name>' --save so that it will be installed in your node_modules folder. (--save will make a note of your dependency in package.json)

3. Enter your filename in src of jslib in Gruntfile.js 

Note: If you get " 'grunt' is not recognized as an internal or external command,
operable program or batch file."" error after entering command grunt then yoiu should check whether you had installed grunt globally or not.

