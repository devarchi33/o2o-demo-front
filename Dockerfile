FROM pangpanglabs/nginx-gzip:alpine

ARG DIST_DIR=./build
ADD $DIST_DIR /usr/share/nginx/html
