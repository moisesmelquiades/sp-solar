#!/bin/bash
# Deploy — sergiopessoasolar.com.br (EasyPanel + Docker Swarm)

VPS="root@72.61.130.166"
VOLUME_PATH="/etc/easypanel/projects/sp-solar/web/volumes/dist"
SERVICE="sp-solar_web"

echo "==> Building..."
npm run build

echo "==> Uploading to VPS..."
ssh $VPS "mkdir -p /tmp/sp-solar-dist"
scp -r dist/* $VPS:/tmp/sp-solar-dist/

echo "==> Copying to EasyPanel volume..."
ssh $VPS "rm -rf $VOLUME_PATH/assets && cp -r /tmp/sp-solar-dist/. $VOLUME_PATH/ && chmod -R 755 $VOLUME_PATH/ && rm -rf /tmp/sp-solar-dist"

echo "==> Redeploying service..."
ssh $VPS "docker service update --force $SERVICE"

echo "==> Deploy complete! https://sergiopessoasolar.com.br"
