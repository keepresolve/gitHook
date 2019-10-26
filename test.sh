#!/bin/bash
function log_info ()
{
        if [  -d ./log  ]
        then
                mkdir -p ./log
        fi
                DATE_N=`date "+%Y-%m-%d %H:%M:%S"`
                USER_N=`whoami`
                echo "${DATE_N} ${USER_N} execute $0 [INFO] $@" >>./log/info #执行成功日志打印路径

}

log_info '123123123'