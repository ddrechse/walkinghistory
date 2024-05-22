// Copyright (c) 2022, Oracle and/or its affiliates.
// Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

import React from "react";
import { useState, useEffect } from "react";
import { Text, PermissionsAndroid, Platform, Image, View, StyleSheet } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    columnContainer: {
      flexDirection: 'column',
    },
  });


const Location : React.FC = () => {


    const [loc, setLoc] = useState<String>();
    const [closest, setClosest] = useState<Parse.Object>();
    const [distance, setDistance] = useState<number>();
    const [watching, setWatching] = useState<boolean>(false);

    // This function asks for location permission on iOS and Android
    const requestLocationPermissions = async () => {
        if (Platform.OS === 'ios') {
            // iOS can be asked always, since the OS handles if user already gave permission
            await Geolocation.requestAuthorization('whenInUse');
        } else if (Platform.OS === 'android') {
            let permissionCheck = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            // Only asks for permission on Android if not given before
            if (permissionCheck !== true) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission Request',
                        message:
                            'This app needs you permission for using your location for querying GeoPoints in Parse!',
                        buttonPositive: 'OK',
                    },
                );
            }
        }
    };

    const getLocation = async () => {
        console.log("make sure we have location permission");
        await requestLocationPermissions();
        if (watching == false ) {
            console.log("about to call for current position");
            Geolocation.watchPosition(
                async (currentPosition) => {
                    console.log("in promise callback")
                    console.log(
                        "MARK:",
                        currentPosition.coords.latitude,
                        currentPosition.coords.longitude
                    );
                    setLoc(currentPosition.coords.latitude + " " +
                        currentPosition.coords.longitude)

                    // find the closest attraction and update the state
                    console.log("querying parse server for nearby attractions");
                    let query = new Parse.Query('POI');
                    query.near('location', new Parse.GeoPoint(currentPosition.coords.latitude,
                        currentPosition.coords.longitude));
                    let results:any = await query.find().catch((err: any) => console.log("OOPS " + JSON.stringify(err)));
                    if (results.length > 0) {
                        // loop through results
                        let closest = 0;
                        let shortestDistance = 999;

                        for (let i = 0; i < results.length; i++) {
                            // distance to each one
                            let distance = getDistance(
                                { 
                                    latitude: currentPosition.coords.latitude,
                                    longitude: currentPosition.coords.longitude
                                },
                                {
                                    latitude: results[i].get("location").latitude,
                                    longitude: results[i].get("location").longitude
                                }
                            );
                            if (distance < shortestDistance) {
                                shortestDistance = distance;
                                closest = i;
                            }
                        }

                        // choose closest
                        setClosest(results[closest]);
                        setDistance(shortestDistance);
                    }
                },
                error => {
                    console.log(error);
                },
                { enableHighAccuracy: true, /*timeout: 15000, maximumAge: 10*/ }
            );
            setWatching(true);
            console.log("after location call")
        } else {
            console.log("already watching location");
        }
        return true; 
    }

    const playAudio = async () => {
        console.log("play audio pressed");
        const params = { id: closest._id };
        await Parse.Cloud.run('record_listen', params);
    }

    useEffect(() => {
        console.log("MARK: in location.useEffect");
        Parse.setAsyncStorage(AsyncStorage); // AsyncStorage is used for storing session tokens
        Parse.initialize('APPLICATION_ID');
        Parse.serverURL = 'http://localhost:1338/parse';
        getLocation();
    });


    return (
        <View>
            <Text>Your location is {loc === null || loc === undefined ? "unknown" : loc} &nbsp;</Text>
            {closest === null || closest === undefined 
                ? <Text>No attraction within 2km</Text>
                : <View style={[styles.columnContainer, styles.container]}>
                    <Text>{"\nClosest attraction (within 2km) is:\n" + closest.get("name") + " at (" 
                    + closest.get("location").latitude + ',' 
                    + closest.get("location").longitude + ") \nabout "
                    + distance + " metres away."}</Text>
                    <Image
                        source={{
                            uri: closest.get("image")
                        }}
                        style={{
                            width: 250,
                            height: 250,
                            resizeMode: 'cover'
                        }} 
                    />
                </View>

            }
        </View>
    )

}

export default Location;
