#!/bin/bash
COUNTER=0

until(curl --fail $URL/version); do
	echo "Pinging Homes Version Page...\n";
	sleep 5;
	COUNTER=$(( $COUNTER + 5));
	if [ "$COUNTER"==60 ]; then
		echo "Could not ping after allocated time, review your deployment" >&2
  		exit 1
	fi
done
