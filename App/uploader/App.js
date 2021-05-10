import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
export const mimetype = (name) => {
  let allow = { "png": "image/png", "pdf": "application/json", "jpeg": "image/jpeg", "jpg": "image/jpg" };
  let extention = name.split(".")[1];
  if (allow[extention] !== undefined) {
    return allow[extention]
  }
  else {
    return undefined
  }
}

const uploadDoc = async (data) => {
  const resp = await fetch("http://192.168.1.14:8000/api/upload", {
    method: "POST",
    body: data
  })
  if (resp.status != 200) {
    return alert(await resp.text())
  }
  return await resp.text()
}

export const BarCodeSection = ({ readyScan, scanned, mockScan }) => {
  if (!readyScan) return null;
  if(process.env.NODE_ENV == 'test' && mockScan) {
    scanned(mockScan)
  }
  return (
    <View> 
      <TextInput onChange={(text) => scanned({data: text})}/>
      <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned} accessibilityLabel="Barcode Scanner"/>
    </View>
  )
}


export default function App() {
  const [url, setUrl] = useState('')
  const [readyToScan, setReadyToScan] = useState(false)
  const readyScan = async () => {
    if (readyToScan) return setReadyToScan(false)
    const { status } = process.env.NODE_ENV == 'test' ? {status : 'granted'} : await BarCodeScanner.requestPermissionsAsync();
    if (status == 'granted') setReadyToScan(true)
  }
  const selectFile = async () => {
    const file = process.env.JEST_WORKER_ID ? { name: 'image.png' } : await DocumentPicker.getDocumentAsync()
    file.type = mimetype(file.name);
    if (file.type === undefined) {
      alert("not allowed extention");
      return null;
    }
    let formDat = new FormData();
    formDat.append("file", file);
    const resp = await uploadDoc(formDat);
    setUrl(resp)
  }
  const scanned = ({ data }) => {
    setUrl(data)
  }
  if (url) return (
    <View>
      <Text onPress={() => Linking.openURL(url.replace('localhost', '192.168.1.14'))}>{url}</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <Text style={styles.header} accessibilityLabel="Text">Select File</Text>
      <TouchableOpacity accessibilityLabel="Select File" onPress={selectFile} style={styles.selectFile}>
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
      <Text style={styles.header} accessibilityLabel="Text">OR</Text>
      <BarCodeSection scanned={scanned} readyScan={readyToScan} />
      <TouchableOpacity accessibilityLabel="Start Scanner" style={styles.scanCode} onPress={readyScan}>
        <Text style={styles.buttonText}>{readyToScan ? "Close" : "Scan Code"}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 10
  },
  selectFile: {
    backgroundColor: 'blue',
    padding: 10,
    width: 120,
    textAlign: 'center',
    alignItems: 'center'
  },
  scanCode: {
    backgroundColor: 'green',
    padding: 10,
    width: 120,
    textAlign: 'center',
    alignItems: 'center',
    // display: 'none'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});