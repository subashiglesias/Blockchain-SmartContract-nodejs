var exports = module.exports = {};
var exec = require('child_process').exec,
	child
const fs = require('fs');
const fileExists = require('file-exists');
const os = require('os');
var cmd = require('node-cmd');

exports.rsyncFetch = function (filepath, destination, key, OS, instancelogin) {

	var OS = OS
	var filepath = filepath
	var destination = destination
	var key = key
	var hostname = instancelogin

	//Example

	//    var key = "c:/Work/Rsync/Rsync/uploadingserver.pem"

	//  var hostname = "ubuntu@ec2-54-237-212-163.compute-1.amazonaws.com"

	//  var filepath = "/opt/tmp"

	//   var destination = "c:/Work/Rsync/Rsync/"


	if (OS == "Mac") {

		//sample command
		//child = exec("rsync -Pav -e \"ssh -i "+key+"\" "+hostname+":"+filepath+ " "+destination)
		//rsync -avre "ssh -i uploadingserver.pem" ubuntu@ec2-54-80-249-39.compute-1.amazonaws.com:/opt/tmp /Users/rd/Desktop/Subash/Temp/

		var child = exec("rsync -avre --inplace \"ssh -i " + key + "\" " + hostname + ":" + filepath + " " + destination);
		console.log("rsync running");
		var result = '';

		child.stderr.on('data', function (data) {
			result += data;
		});

		child.stdout.on('data', function (data) {
			result += data;
		});

		child.on('close', function () {
			console.log('done');
			console.log(result);
			console.log("Done");
			// DownloadJar();


		});


	} else {

		var dat;

		fileExists(os.homedir() + '/syncFile.bat').then(exists => {
			console.log(exists)
			var output = exists // OUTPUTS: true or false
			if (output == false) {
				fs.writeFileSync(os.homedir() + '/syncFile.bat', "cd " + destination + "\n" + "C:/cygwin/bin/rsync.exe -avre --inplace \"C:/cygwin/bin/ssh.exe -o StrictHostKeyChecking=no -i " + key + "\" " + hostname + ":" + filepath + " .");


				cmd.get(
					"CMD /C \"" + os.homedir() + "\\syncFile.bat\"",
					function (err, data, stderr) {
						if (!err) {
							dat = dat + data
							console.log('Executing', data)

							if (dat.match("success")) {
								console.log("dat is " + dat)
							}
						} else {
							console.log('error', err)
							console.log('stderr', stderr)
						}
					}
				);
			} else {
				fs.unlinkSync(os.homedir() + '/syncFile.bat');
				
				fs.writeFileSync(os.homedir() + '/syncFile.bat', "cd " + destination + "\n" + "C:/cygwin/bin/rsync.exe -avre  --inplace \"C:/cygwin/bin/ssh.exe -o StrictHostKeyChecking=no -i " + key + "\" " + hostname + ":" + filepath + " .");


				cmd.get(
					"CMD /C \"" + os.homedir() + "\\syncFile.bat\"",
					function (err, data, stderr) {
						if (!err) {
							dat = dat + data
							console.log('Executing', data)

							if (dat.match("success")) {
								console.log("dat is " + dat)
							}
						} else {
							console.log('error', err)
							console.log('stderr', stderr)
						}
					}
				);
				
				
			}
		})


	}


	return result;
};


exports.rsyncCheck = function () {
	fileExists('C:/cygwin').then(exists => {
		console.log(exists)
		var output = exists // OUTPUTS: true or false
	})

	return output;
};


exports.rsyncInstall = function () {



	var dat;
	fs.writeFileSync(os.homedir() + '\\installcyg.bat', "bitsadmin /transfer wcb /download /priority high https://www.cygwin.com/setup-x86.exe " + os.homedir() + "\\setup.exe" + "\n" + "cd " + os.homedir() + "\n" + "setup.exe --quiet-mode --packages rsync,openssh --site http://cygwin.mirror.constant.com");



	cmd.get(
		"CMD /C \"" + os.homedir() + "\\installcyg.bat\"",
		function (err, data, stderr) {
			if (!err) {
				dat = dat + data
				console.log('Executing', data)

				if (dat.match("success")) {
					console.log("dat is " + dat)
				}
			} else {
				console.log('error', err)
				console.log('stderr', stderr)
			}
		}
	);

};




exports.rsyncWin = function (key, hostName, filepath, destination, windows) {



	var dat;
	fs.writeFileSync(os.homedir() + '/syncFile.bat', "C:/cygwin/bin/rsync.exe -avre \"C:/cygwin/bin/ssh -i " + key + "\" " + hostname + ":" + filepath + " " + destination);

	//var child = exec("rsync -avre \"ssh -i " + key + "\" " + hostname + ":" + filepath + " " + destination);



	cmd.get(
		"CMD /C \"" + os.homedir() + "\\syncFile.bat\"",
		function (err, data, stderr) {
			if (!err) {
				dat = dat + data
				console.log('Executing', data)

				if (dat.match("success")) {
					console.log("dat is " + dat)
				}
			} else {
				console.log('error', err)
				console.log('stderr', stderr)
			}
		}
	);

};
