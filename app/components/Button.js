import React from 'react';
import { Button } from 'react-native-elements';

const CustomButton = props =>
    <Button
        large
        fontFamily={ 'Oswald' }
        { ...props } />;

export default CustomButton;
