#!/bin/bash
# ********************************************************************************
# *
# *         Script Author: Christopher Martello
# *           Create Date: May 2nd, 2014
# *    Last Modified Date:  
# *
# * Project / Application: Master Build Script for QuotationApp
# *   Objective / Purpose: joint build script
# *
# *  Script / Action Name: Build
# *
# **********************************************************************************

#-------------------------------------------------------
#-- Functions Section
#-------------------------------------------------------

function build(){
	echo "#-----   B U I L D I N G    -----"
	rm -rf node_modules .bower-cache .bower-registry .bower-tmp/;
	npm --version;
	npm install -f;
	grunt --version;
	grunt build;
}

function server(){
	echo "#-----   L A U N C H I N G   S E R V E R -----"
	grunt server;
}

function exit_code_check() {
    rc=$?
    if [[ $rc != 0 ]] ; then
        echo "";
        echo "#-----     Exit Code ERROR FOUND      -----";
        exit $rc;
    fi
}

# -- Check for arguments --
if [ $# -gt 0 ]; then
    #continue on your merry way 
    echo "";
else
	echo "";
    echo "Your command line contains no arguments";
    echo "Please indicate -b for Build and/or -s for Launch Server.";
    echo "";
    exit 0;
fi
#-------------------------------------------------------
#-- Handle arguments
#-------------------------------------------------------
while getopts "bs" OPTION ;do
    case $OPTION in
        b)
            build
            ;;
        s)
			server 
            shift
            ;;
        ?)
			echo "";
			echo "Incorrect parameter passed. Parameters are:" ;
			echo "-b for Build";
			echo "-s for Launch Server";
            echo "";
            exit 1
            ;;
    esac
    exit_code_check
    echo "#-----   C O M P L E T E D    -----"
done