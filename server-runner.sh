#! /bin/bash -e

su - $(whoami)

source ~/.zshrc


AppTarFileType=$1
AppTarFileName=$2

AppTmpDir=${PWD}/app
AppTargetsDir=${HOME}/www

AppLog() {
    printf "\n  \033[36m%s\033[0m  \n\n" "$1"
}
AppWarn(){
    printf "\n  \033[31mWarn: %s\033[0m  \n\n" "$1"
}

AppUntar(){
    rm -rf ${AppTmpDir}
    mkdir -p ${AppTmpDir}
    tar -xzvf ${AppTarFileName} -C ${AppTmpDir}
}

AppUpdate(){
    cd ${AppTmpDir}
    chmod a+rw ${AppTargetsDir} -R
    if [[ -z "$AppTarFileType" ]];then
        rm -rf ${AppTargetsDir}/*
        cp -rf . ${AppTargetsDir}
    else
        rm -rf ${AppTargetsDir}/${AppTarFileType}/*
        cp -rf . ${AppTargetsDir}/${AppTarFileType}
    fi
    chmod a+rw ${AppTargetsDir} -R
}

AppUpdateClient(){
    AppUpdate
}
AppUpdateServer(){
    AppUpdate
    cd ${AppTargetsDir}/${AppTarFileType}/
    yarn && yarn build
    # cd ${AppTargetsDir}
    # docker build .
}
AppUpdateNginx(){
    cd ${AppTargetsDir}
    docker-compose down
    AppUpdate
    cd ${AppTargetsDir}
    docker-compose up -d
    AppLog "App down..."
}
AppUpdateAll(){
    cd ${AppTargetsDir}
    docker-compose down
    AppUpdate
    cd ${AppTargetsDir}
    docker build .
    docker-compose up -d
    cd ${AppTargetsDir}/server/
    yarn && yarn build
    AppLog "App down..."
}

AppRunner(){
    
    AppLog "App start to run..."
    
    AppUntar
    case "$AppTarFileType" in
        client)             AppUpdateClient
        ;;
        server)             AppUpdateServer
        ;;
        nginx)              AppUpdateNginx
        exit;;
        *)                  AppUpdateAll;
        exit;;
    esac
    cd ${AppTargetsDir}
    docker-compose up -d
    AppLog "App down..."
}

AppRunner