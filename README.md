# flux tower application for SERF

[node.js api](./flux-api)

[react dashboard](./dashboard)


### Certififate


'./certbot-auto certonly --webroot -w /weather/scripts/serf-weather-flux/dashboard/dist/ -d weather.serf.net.au'

`sudo ln -s /etc/letsencrypt/live/weather.serf.net.au/fullchain.pem /etc/nginx/conf.d/weather.serf.net.au.crt`

`sudo ln -s /etc/letsencrypt/live/weather.serf.net.au/privkey.pem /etc/nginx/conf.d/weather.serf.net.au.key`


#### Nginx

edit: `/etc/nginx/sites-enabled/local`

```
# the IP(s) on which your node server is running. I chose port 3000.
upstream app_yourdomain {
    server 127.0.0.1:3000;
}

# the nginx server instance
server {
    listen              80;
    listen              443 ssl;
    server_name         weather.serf.net.au;
    ssl_certificate     /etc/nginx/conf.d/weather.serf.net.au.crt;
    ssl_certificate_key /etc/nginx/conf.d/weather.serf.net.au.key;

    #listen 0.0.0.0:80;
    #server_name 130.102.155.60 local;
    access_log /var/log/nginx/local.log;

    # pass the request to the node.js server with the correct headers and much more can be added, see nginx config options
    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://app_yourdomain/;
      proxy_redirect off;
    }
 }
```

