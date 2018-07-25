rem setting the working directory
Pushd C:\Users\SugunalakshmiG\
net use \\spc.pagemajik.net\webdav /user:process 1234
rem example target:=path shortcut:=name for the shortcut 
mkshortcut /target:"\\spc.pagemajik.net\webdav" /shortcut:"PageMajik"
rem revoking the working directory
popd
