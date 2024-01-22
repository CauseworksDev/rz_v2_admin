FROM node:18.16.1

# 앱 디렉터리 생성
RUN mkdir -p /usr/src/app

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
echo "Asia/Seoul" > /etc/timezone

# 앱 의존성 설치
COPY package*.json ./
RUN npm install