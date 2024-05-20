import { ImageBackground, StyleSheet, Text, View } from 'react-native';

/*interface HeaderProps {
  title: string;
}*/

interface HeaderProps {
  title: string;
}


const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <ImageBackground 
      source={require('./logo.png')} 
      style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

//<View styles={styles.container}>
//<Text styles={styles.title}>{title}</Text>
//</View>


export default Header;
