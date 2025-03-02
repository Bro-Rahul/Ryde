import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import NavigationTab from './NavigationTab'



export default function TabsLayout({children}:{children:ReactNode}) {
  return (
    <View className='flex flex-col w-full h-full px-2 relative'>
        {children}
      <NavigationTab/>
    </View>
  )
}