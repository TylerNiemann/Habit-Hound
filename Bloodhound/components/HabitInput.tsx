import React from 'react';
import { SafeAreaView, StyleSheet, TextInput,  Button, Alert} from 'react-native';

export default function TextInputExample(): JSX.Element {
    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');
  
    return (
      <SafeAreaView style={styles.container} >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    justifyContent: 'center',
      },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  