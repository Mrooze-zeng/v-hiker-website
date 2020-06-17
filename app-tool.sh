#! /bin/bash -e

VERSION="v1.0.0"
AppName=$0

Host=139.199.159.79

AppCurrentDir=${PWD}
AppServerDir=${PWD}/server
AppClientDir=${PWD}/client
AppNginxDir=${PWD}/nginx/remote

AppDistDir=${PWD}/dist
AppServerDistDir=${AppDistDir}/server
AppClientDistDir=${AppDistDir}/client
AppNginxDistDir=${AppDistDir}/nginx

AppTarFileName=dist.`date "+%Y-%m-%d-%H-%M-%S"`.tar.gz
AppTarFileReg=dist.*.tar.gz

ServerRunner=server-runner.sh

AppInfo(){
  cat <<EOF
  Version: ${VERSION}

  Usage: ${AppName} [COMMAND]

  Commands:
    ${AppName} upload       Upload project
    ${AppName} dev          Run docker locally
    ${AppName} tunnel       ssh tunnel to demo.v-hiker.cn
    ${AppName} killTunnel   Kill ssh tunnel
  Options
    -h,--help           Display help information
    -v,--version        Output version of ${AppName}
EOF
}

AppLog() {
    printf "\n  \033[36m%s\033[0m  \n\n" "$1"
}
AppWarn(){
    printf "\n  \033[31mWarn: %s\033[0m  \n\n" "$1"
}

AppCleanTarFile() {
    find ${PWD} -iname ${AppTarFileReg} -exec rm '{}' +
}

AppTarFile(){
    tar -zcvf ${AppCurrentDir}/${AppTarFileName} .
    cd ${AppCurrentDir}
}

AppResetDist(){
    rm -rf ${AppDistDir}
    mkdir -p $AppServerDistDir $AppClientDistDir $AppNginxDistDir
}

AppSetDevEnv(){
    Old_IFS="$IFS"
    IFS=" "
    Source_File=`sed -e "/LOCAL_IP/d" .env`
    LocalIP=`ifconfig -a | grep inet | grep -v 127.0.0.1 | grep -v inet6 | awk '{print $2}' | tr -d "addrs"`
    echo LOCAL_IP=$LocalIP > .env
    array=($Source_File)
    IFS="$OLD_IFS"
    
    for i in ${array[@]}
    do
        echo $i>>.env
    done
    docker-compose up -d
}

AppTunnel() {
    Port=$1
    Username=$2
    if [ -z "$Port" ];then
        Port=80
    fi
    if [ -z "$Username" ];then
        Username=ubuntu
    fi
    AppLog "已经把/etc/ssh/sshd_config 内的 GatewayPorts 设置为yes，可以用${Host}:8001访问"
    ssh -i ~/.ssh/id_rsa -R 8001:127.0.0.1:${Port} ${Username}@${Host}
    AppLog "Tunnel running.... "
    AppLog "Click on the link(https://demo.v-hiker.cn) to visit."
}

AppKillTunnel(){
    Pid=$(ps aux | grep "ssh -i /Users/mrooze/.ssh/id_rsa -NTf -R 8001:127.0.0.1:80 ubuntu@${Host}" | grep -v grep | awk '{print $2}')
    AppLog "The Pid of the running tunnel is ${Pid}"
    kill ${Pid}
    AppLog "Process killed"
}

AppUpload(){
    AppWarn "Removing old tar file....."
    AppCleanTarFile
    AppResetDist
    case "$1" in
        server)
            PackServer
            AppTarFile
        ;;
        client)
            PackClient
            AppTarFile
        ;;
        nginx)
            PackNignx
            AppTarFile
        ;;
        -h|--help)
            UploadInfo
        ;;
        *)
            PackAll
            AppTarFile
        ;;
    esac
    UploadTarFile
    ExecServerRunner "$1" "$AppTarFileName"
}

UploadInfo() {
  cat <<EOF
  Usage: ${AppName} upload [options]
  Options
    -h,--help           Display help information
    server              Pack and Upload server folder
    client              Pack and Upload client folder
    nginx               Pack and Upload nginx folder
EOF
}

UploadTarFile() {
sftp -i ~/.ssh/id_rsa ubuntu@${Host}<<EOF
  mkdir tmp
  rm tmp/*
  cd tmp/
  lcd ${AppCurrentDir}
  put ${AppCurrentDir}/${AppTarFileName}
  put ${AppCurrentDir}/${ServerRunner}
  bye
EOF
}

ExecServerRunner(){
ssh -i ~/.ssh/id_rsa ubuntu@${Host}<<EOF
  cd tmp/
  source ${ServerRunner} "$1" "$2"
  exit
EOF
    AppCleanTarFile
}

PackServer(){
    AppLog "Start pack server files..."
    cd $AppServerDir
    yarn build
    cp -rf . ${AppServerDistDir}
    rm -rf lib
    cd ${AppServerDistDir}
    rm -rf node_modules/
}

PackClient(){
    AppLog "Start pack client files..."
    cd $AppClientDir
    rm -rf build/
    yarn && yarn build
    cd build
    cp -rf . ${AppClientDistDir}
    cd ${AppClientDistDir}
}

PackNignx(){
    AppLog "Start pack nginx files..."
    cd $AppNginxDir
    cp -rf . ${AppNginxDistDir}
    cd ${AppNginxDistDir}
}

PackAll(){
    cd ${AppCurrentDir}
    cp ${AppCurrentDir}/dockerfile ${AppDistDir}
    cp ${AppCurrentDir}/docker-compose.prod.yml ${AppDistDir}/docker-compose.yml
    
    PackClient
    
    PackServer
    
    PackNignx
    
    cd ${AppDistDir}
    
}




if test $# -eq 0;then
    AppInfo
else
    while test $# -ne 0;do
        case "$1" in
            upload) shift;  AppUpload $1 $2;exit;;
            dev)            AppSetDevEnv;exit;;
            tunnel) shift;  AppTunnel $1 $2 $3;exit;;
            killTunnel)     AppKillTunnel;exit;;
            -v|--version)   AppLog $VERSION && exit 0;;
            -h|--help)      AppInfo;exit;;
            *)              AppInfo;exit;;
        esac
        shift
    done
fi