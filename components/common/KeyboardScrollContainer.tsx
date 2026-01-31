import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ViewStyle } from 'react-native';

type KeyboardScrollContainerProps = {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  bounces?: boolean;
  keyboardVerticalOffset?: number;
  style?: ViewStyle;
};

export const KeyboardScrollContainer = ({ 
  children, 
  contentContainerStyle,
  bounces = false,
  keyboardVerticalOffset = 0,
  style
}: KeyboardScrollContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        bounces={bounces}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
