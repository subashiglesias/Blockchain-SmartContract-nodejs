rem setting the working directory
Pushd C:\Users\SugunalakshmiG\
net use ////10.1.1.51\webdav /user:process 1234
rem example target:=path shortcut:=name for the shortcut 
mkshortcut /target:"////10.1.1.51\webdav" /shortcut:"PageMajik"
rem revoking the working directory
popd