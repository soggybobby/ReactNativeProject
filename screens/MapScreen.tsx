// MapScreen.tsx
import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

export default function MapScreen() {
  const [location, setLocation] = useState({
    latitude: 10.3173,   // Ayala Center Cebu (dummy fixed starting point)
    longitude: 123.9050,
  });

  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      Geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setHasLocation(true);
        },
        (err) => console.log("GPS error:", err),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={hasLocation}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Ayala Cebu Dummy Pins */}
        <Marker 
          coordinate={{ latitude: 10.3176, longitude: 123.9053 }}
          title="Ayala Center Cebu"
        />

        <Marker 
          coordinate={{ latitude: 10.3183, longitude: 123.9062 }}
          title="Terraces"
        />

        <Marker 
          coordinate={{ latitude: 10.3166, longitude: 123.9044 }}
          title="Cebu Business Park"
        />
      </MapView>
    </View>
  );
}
