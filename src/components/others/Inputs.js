import React from 'react';
import {TextInput, View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const Inputs = props => {
  console.log(' props ', props);
  let InputElement;
  switch (props.elementType) {
    case 'input':
      InputElement = (
        <View style={[styles.viewStyle]}>
          <TextInput
            keyboardType={
              props.elementConfig.keytype
                ? props.elementConfig.keytype
                : 'default'
            }
            secureTextEntry={props.secureTextEntry}
            value={props.value}
            onChangeText={props.onChangeText}
            style={[styles.inputStyle, props.otherStyles]}
            {...props.elementConfig}
          />
        </View>
      );
      break;
    case 'HeadLabel':
      InputElement = (
        <View
          style={{
            minWidth: '100%',
            minHeight: 30,
            justifyContent: 'center',
            paddingTop: 30,
            marginTop: props.elementConfig.marginTop,
            paddingLeft: props.elementConfig.paddingLeft,
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            {props.elementConfig.headLabelText}{' '}
          </Text>
        </View>
      );
      break;
    case 'checkbox':
      InputElement = (
        <View
          style={{
            flexDirection: props.elementConfig.flexDirection,
            padding: 10,
            marginLeft: props.elementConfig.marginLeft,
          }}>
          <CheckBox
            tintColors={{true: 'white', false: 'white'}}
            style={styles.checkbox}
            value={props.isChecked}
            onValueChange={props.onChangeText}
          />
          <View style={{flexDirection: 'column', marginTop: 5}}>
            <Text
              style={{
                color: props.elementConfig.color,
                marginLeft: props.elementConfig.margin,
                fontSize: props.elementConfig.fontSize,
              }}>
              {props.elementConfig.label}{' '}
            </Text>
            {props.elementConfig.subDescription === null ? null : (
              <Text
                style={{
                  color: props.elementConfig.color,
                  marginLeft: props.elementConfig.margin,
                  fontSize: props.elementConfig.fontSizeSub,
                }}>
                {props.elementConfig.subDescription}
              </Text>
            )}
          </View>
        </View>
      );
      break;
    case 'radio':
      InputElement = (
        <View style={{width: '80%', flexDirection: 'column'}}>
          <View style={{width: '100%'}}>
            <Text
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {props.elementConfig.mainLabel}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <RadioForm
              title={props.title}
              style={{paddingLeft: props.elementConfig.RadioPadding}}
              animation={true}
              // value={props.value}
              labelHorizontal={true}
              formHorizontal={props.elementConfig.formHorizontal}
              radio_props={props.elementConfig.options}
              initial={0}
              onPress={value =>
                props.onChangeText({property: props.property, value: value})
              }
              buttonSize={15}
              buttonOuterSize={20}
              buttonColor={'white'}
              property={props.property}
              selectedButtonColor={'white'}
              labelStyle={{
                fontSize: props.elementConfig.RadioFontSize,
                color: 'white',
                paddingRight: props.elementConfig.RadioLabelPadding,
              }}
            />
          </View>
        </View>
      );

      break;
    default:
      InputElement = (
        <View style={styles.viewStyle}>
          <TextInput
            secureTextEntry={props.secureTextEntry}
            value={props.value}
            onChangeText={props.onChangeText}
            style={styles.inputStyle}
            {...props.elementConfig}
          />
        </View>
      );
  }
  return InputElement;
};

const styles = {
  inputStyle: {
    color: 'white',
    width: '100%',
    paddingRight: 5,
    paddingLeft: 0,
    fontSize: 15,
    lineHeight: 23,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  viewStyle: {
    width: '100%',
    height: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
};

export default Inputs;
