import React from 'react';
import { StyleSheet, Text, View,  Modal, TouchableWithoutFeedback } from 'react-native';

type WeeklyOverlayProps = {
  modalVisible: boolean;
  handleClose: () => void;
 };

const WeeklyOverlay: React.FC<WeeklyOverlayProps> = ({
  modalVisible,
  handleClose,
  }) => {
  
  const handleOverlayPress = () => {
      handleClose();
    };

  
  

  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
    </TouchableWithoutFeedback>
  </Modal>
);
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 100,
  },
  overlayContent: {
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingTop: 30,
    alignItems: 'center',
  },
});

export default WeeklyOverlay;