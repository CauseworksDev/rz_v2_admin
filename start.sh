#!/bin/bash
DOCKER_CONTAINER_NAME="rzV2Admin"
DOCKER_IMAGE_NAME="rzV2Admin/nodejs"
DOCKER_IMAGE_TAG="v1.0.0"
COMPOSE_FILE=docker-compose.yaml
echo "start ${DOCKER_CONTAINER_NAME} Server"


function restartContainers() {
  docker rm -f $(docker ps -aqf name="${DOCKER_CONTAINER_NAME}")
  docker-compose -f ${COMPOSE_FILE} up -d 2>&1
}

function rebuildDocker() {
    echo "Stop and Remove current ${DOCKER_CONTAINER_NAME} docker container..."
    docker rm -f $(docker ps -aqf name="${DOCKER_CONTAINER_NAME}")

    if [[ "$(docker images -q ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} 2> /dev/null)" != "" ]]; then
        echo "Remove ${DOCKER_CONTAINER_NAME} docker IMAGE!!.."
        docker rmi -f ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
    fi

    echo "Build ${DOCKER_CONTAINER_NAME} SERVER image.."
    docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} .
    docker-compose -f ${COMPOSE_FILE} up -d 2>&1
}

rebuildDocker

#function askProceed () {
#  # shellcheck disable=SC2162
#  read -p "Remove CA-Registry Server images and container to rebuild those items(Y) or just restart container(N) ? [Y/N] " ans
#  case "$ans" in
#    y|Y|"" )
#      echo "Remove and rebuild docker container of ${DOCKER_IMAGE_NAME} Server"
#      rebuildDocker
#    ;;
#    n|N )
#      echo "Restart docker container of ${DOCKER_IMAGE_NAME}..."
#      restartContainers
#    ;;
#    * )
#      echo "invalid response"
#      askProceed
#    ;;
#  esac
#}
#
#
#askProceed