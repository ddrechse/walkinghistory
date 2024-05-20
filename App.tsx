/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, startTransition } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
//  DebugInstructions,
//  Header,
//  LearnMoreLinks,
//  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import  Parse  from 'parse/react-native';
import GetGameScore from './components/GetGameScore';
import Header from './components/Header'

/*
 <!--ReloadInstructions /-->
             <GetGameScore />
*/

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

/*const fetchDataFromParse = async () => {
  console.log("create GameScore ParseQuery");
  const parseQuery = new Parse.Query("GameScore");
  // Fetch the object by its objectId
  console.log("create GameScore ParseQuery");
  const parseObject = await parseQuery.get("vmzWOqaRGQ");


  // Access the object's properties
  console.log("access object properties");
  const playerName = parseObject.get('playerName');
  const score = parseObject.get('score');

  console.log('Fetched object:', { playerName, score});  
}*/

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';
  console.log("Beginning of App");
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Initialize Parse
//  console.log("set Async Storage");
//  Parse.setAsyncStorage(AsyncStorage); // AsyncStorage is used for storing session tokens
//  console.log("Initialize Parse");
//  Parse.initialize('APPLICATION_ID');
//  console.log("set Server Url");
//  Parse.serverURL = 'http://localhost:1338/parse';

//useEffect(() => {
    // Initialize Parse
//    console.log("CDD NEW");
//    console.log("set Async Storage");
//    Parse.setAsyncStorage(AsyncStorage); // AsyncStorage is used for storing session tokens
//    console.log("Initialize Parse");
//    Parse.initialize('APPLICATION_ID');
//    console.log("set Server Url");
//    Parse.serverURL = 'http://localhost:1338/parse';
//  }, []);

/*  startTransition(() => {
    setCount(count + 1);
    fetchDataFromParse();
  });*/

/*  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
            <GetGameScore />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );*/

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header title="Walking History"/>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Walk around, discover history!">
            <GetGameScore />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
