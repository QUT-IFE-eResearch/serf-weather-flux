## Dropbox to SQL Script

This script will run every X times in a crontab and updates data from a .DAT file into a table

Add to cron:

`crontab -e`

```sh
script=/weather/scripts/serf-weather-flux/flux-api/scripts/import-sql.sh
@reboot $script

# Minute   Hour   Day of Month       Month          Day of Week        Command
# (0-59)  (0-23)     (1-31)    (1-12 or Jan-Dec)  (0-6 or Sun-Sat)
   30       0          *             *                *            $script
```

## Mount Drive
```sh
lsblk
sudo file -s /dev/xvdb
sudo mkfs -t ext4  /dev/xvdb
sudo mkdir /weather
sudo mount /dev/xvdb /weather
sudo cp /etc/fstab /etc/fstab.orig

sudo apt-get update
sudo apt-get install vim

sudo file -s /dev/xvdb
sudo vim /etc/fstab
```

```sh
UUID=5874dc38-5cc8-49d5-be14-9816618bacb7 /weather ext4          defaults,nofail        0       2
```

And check if all good with
```sh
sudo mount -a
```