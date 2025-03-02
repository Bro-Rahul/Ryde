import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function TabsLayouts() {
  return (
    <Stack>
    <Stack.Screen name='chats' options={{ headerShown: false }} />
    <Stack.Screen name='profile' options={{ headerShown: false }} />
    <Stack.Screen name='rides' options={{ headerShown: false }} />
    <Stack.Screen name='home' options={{ headerShown: false }} />
  </Stack>
  )
}