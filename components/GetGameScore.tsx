import React, { useEffect, useState } from 'react';
//import { Text, View } from 'react-native';
import Parse from './parse';
//import Parse from 'parse/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const GetGameScore: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  let playerName;
  let score;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("GameScore set Async Storage");
        Parse.setAsyncStorage(AsyncStorage); // AsyncStorage is used for storing session tokens
        console.log("GameScore Initialize Parse");
        Parse.initialize('APPLICATION_ID');
        console.log("GameScore set Server Url");
        Parse.serverURL = 'http://localhost:1338/parse';
        console.log("create GameScore ParseQuery");
        const parseQuery = new Parse.Query("GameScore");
        // Fetch the object by its objectId
        console.log("get GameScore");
        const parseObject = await parseQuery.get("HAOuHCqGAB");
      
      
        // Access the object's properties
        console.log("access object properties");
        playerName = parseObject.get('playerName');
        score = parseObject.get('score');
      
        console.log('Fetched object:', { playerName, score});  
        setData(playerName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  console.log("Data = " + JSON.stringify(data));
  return (data);
};


export default GetGameScore;

