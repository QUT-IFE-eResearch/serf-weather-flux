#!/bin/bash
# IMPORT SCRIPT

DBDIR=/weather/scripts/serf-weather-db
DROPBOX=/home/debian/Dropbox/OzFlux_Raw_Uploads/SERF
APP=/weather/scripts/serf-weather-flux
APPLOG=/weather/scripts/logs/serf-weather-flux.log

cd $DBDIR

sudo forever stopall

#################  DATA IMPORT #######################################

################## CR3000_slow_core

sudo cp ${DROPBOX}/CR3000_slow_core.dat ${DBDIR}

sudo sed -i '1d' CR3000_slow_core.dat
sudo sed -i '1d' CR3000_slow_core.dat
sudo sed -i '1d' CR3000_slow_core.dat
sudo sed -i '1d' CR3000_slow_core.dat

sudo sqlite3 ozflux_serf "DROP TABLE CR3000_slow_core;"

sudo sqlite3 ozflux_serf "CREATE TABLE CR3000_slow_core ('TIMESTAMP',RECORD INTEGER,'Fsd_CNR1_Avg','Fsu_CNR1_Avg','Fld_CNR1_Avg','Flu_CNR1_Avg','Fn_NRL_Avg','Fg_CN3_01_Avg','Fh_Avg','Fe_raw_Avg','Fc_raw_Avg','Fm_Avg','Cc_7500_Avg','Ah_7500_Avg','ps_7500_Avg','Ux_CSAT_Avg','Uy_CSAT_Avg','Uz_CSAT_Avg','Tv_CSAT_Avg','Ta_HMP_01_Avg','RH_HMP_01_Avg','Ts_TCAV_01_Avg','Sws_616_01_raw_Avg','Rain_Tot');"

sudo echo -e ".mode csv\n.import CR3000_slow_core.dat CR3000_slow_core" | sudo sqlite3 ozflux_serf
################## CR3000_slow_flux

sudo cp ${DROPBOX}/CR3000_slow_flux.dat ${DBDIR}

sudo sed -i '1d' CR3000_slow_flux.dat
sudo sed -i '1d' CR3000_slow_flux.dat
sudo sed -i '1d' CR3000_slow_flux.dat
sudo sed -i '1d' CR3000_slow_flux.dat

sudo sqlite3 ozflux_serf "DROP TABLE CR3000_slow_flux;"

sudo sqlite3 ozflux_serf "CREATE TABLE CR3000_slow_flux ('TIMESTAMP',RECORD INTEGER,'Fh_Avg','Fe_Avg','Fe_raw_Avg','Fc_Avg','Fc_raw_Avg','Fg_CN3_01_Avg','Fg_CN3_02_Avg','Fg_CN3_03_Avg','Fm_Avg','ustar_Avg','covUzUz','covUzUx','covUzUy','covUzCc','covUzAh','covUzTv','covUxUx','covUxUy','covUxCc','covUxAh','covUxTv','covUyUy','covUyCc','covUyAh','covUyTv','covCcCc','covCcAh','covCcTv','covAhAh','covAhTv','covTvTv','n_Tot','CSAT_Warn','DelT_CSAT_Tot','Track_CSAT_Tot','Amph_CSAT_Tot','Ampl_CSAT_Tot','7500_Warn','Chopper_7500_Tot','Detector_7500_Tot','Pll_7500_Tot','Sync_7500_Tot','AGC_7500_Avg');"

echo -e ".mode csv\n.import CR3000_slow_flux.dat CR3000_slow_flux" | sudo sqlite3 ozflux_serf

################## CR3000_slow_met

sudo cp ${DROPBOX}/CR3000_slow_met.dat ${DBDIR}

sudo sed -i '1d' CR3000_slow_met.dat
sudo sed -i '1d' CR3000_slow_met.dat
sudo sed -i '1d' CR3000_slow_met.dat
sudo sed -i '1d' CR3000_slow_met.dat

sudo sqlite3 ozflux_serf "DROP TABLE CR3000_slow_met;"

sudo sqlite3 ozflux_serf "CREATE TABLE CR3000_slow_met ('TIMESTAMP',RECORD INTEGER,'Ux_CSAT_Avg','Uy_CSAT_Avg','Uz_CSAT_Avg','WS_CSAT_Avg','WD_CSAT_Avg','WD_CSAT_Compass_Avg','WD_CSAT_Sd','WS_WS4_Avg','WD_WS4_Avg','WD_WS4_Sd','Diag_WS4_Tot','Cc_7500_Avg','Ah_7500_Avg','ps_7500_Avg','Tv_CSAT_Avg','Ta_HMP_01_Avg','RH_HMP_01_Avg','Ah_HMP_01_Avg','rho_a_Avg','Ts_TCAV_01_Avg','Ts_TCAV_02_Avg','Ts_TCAV_03_Avg','Sws_616_01_Avg','Sws_616_02_Avg','Sws_616_03_Avg','Sws_616_04_Avg','Sws_616_05_Avg','Sws_616_06_Avg','Sws_616_07_Avg','Sws_616_08_Avg','Sws_616_09_Avg','Sws_616_10_Avg','Sws_616_11_Avg','Sws_616_12_Avg','Sws_616_13_Avg','Sws_616_14_Avg','Sws_616_15_Avg','Sws_616_16_Avg','Rain_Tot','Tpanel_Avg','Vbat_Avg');"

echo -e ".mode csv\n.import CR3000_slow_met.dat CR3000_slow_met" | sudo sqlite3 ozflux_serf

################## CR3000_slow_rad

sudo cp ${DROPBOX}/CR3000_slow_rad.dat ${DBDIR}

sudo sed -i '1d' CR3000_slow_rad.dat
sudo sed -i '1d' CR3000_slow_rad.dat
sudo sed -i '1d' CR3000_slow_rad.dat
sudo sed -i '1d' CR3000_slow_rad.dat

sudo sqlite3 ozflux_serf "DROP TABLE CR3000_slow_rad;"

sudo sqlite3 ozflux_serf "CREATE TABLE CR3000_slow_rad ('TIMESTAMP',RECORD INTEGER,'Fsd_CNR1_Avg','Fsu_CNR1_Avg','Fld_CNR1_Avg','Flu_CNR1_Avg','Fld_CNR1_raw_Avg','Flu_CNR1_raw_Avg','Rs_CNR1_Avg','Fn_NRL_Avg');"

echo -e ".mode csv\n.import CR3000_slow_rad.dat CR3000_slow_rad" | sudo sqlite3 ozflux_serf

#################  START #######################################

sudo rm ${APPLOG}

sudo forever -l ${APPLOG} start ${APP}