import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { lighterWhite } from '../../constants';

const DeleteListButton = ({ deleteAllItems }) => (
  <TouchableOpacity onPress={deleteAllItems}>
    <MaterialIcons name="delete-sweep" size={24} color={lighterWhite} />
  </TouchableOpacity>
);

export default DeleteListButton;
