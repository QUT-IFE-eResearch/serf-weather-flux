### Flux Weather App

Start file is import-sql.sh.

Installed in `/scripts/fluxtower`

`import-sql.sh`

1. stop scripts
2. import all data tables to database so it can be read into website
3. start node.js server
4. logs are stored at `/scripts/fluxweather/fluxweather.log`


### Crontab

Main script is run with crontab as sudo.

It is running every day at 00:30 and every time a reboot happens.

### TODOs

- get monthly data
- previous next 100 points