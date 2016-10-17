FROM docker.registry2.mgmt.local:80/bauer/node-lite-base

ARG node_ver=v0.12.8

ADD ./deployment/nginx/custom_404.html /usr/share/nginx/html/custom_404.html
ADD ./deployment/nginx/custom_50x.html /usr/share/nginx/html/custom_50x.html
ADD ./deployment/nginx/site.conf /etc/nginx/conf.d/site.conf

ADD ./src /app

WORKDIR /app

EXPOSE 80 9001

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
