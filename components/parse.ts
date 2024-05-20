import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageShim = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  },
};

console.log("set Async Storage");
Parse.setAsyncStorage(AsyncStorageShim);
console.log("Initialize Parse");
Parse.initialize('APPLICATION_ID');
console.log("set Server Url");
Parse.serverURL = 'http://localhost:1338/parse';

export default Parse;