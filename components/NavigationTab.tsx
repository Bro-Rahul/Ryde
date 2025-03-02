import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { useSelector,useDispatch } from 'react-redux'
import { getCurrentToggle } from '@/store/TabToggleSlice'
import { handleToggle } from '@/store/TabToggleSlice'


export default function NavigationTab() {
    const toggle = useSelector(getCurrentToggle);
    const dispatch = useDispatch();
    return (
        <View className='flex flex-row justify-around w-4/5 mx-auto mb-2 p-4 rounded-full gap-4 bg-black absolute bottom-0 left-[10%]'>
            <TouchableOpacity onPress={()=>dispatch(handleToggle({toggleTo:"Home"}))}>
                <Image source={icons.home} className={`w-[40px] h-[40px] ${toggle === "Home" ? "bg-green-400 rounded-full" : undefined}`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>dispatch(handleToggle({toggleTo:"Popular"}))}>
                <Image source={icons.list} className={`w-[40px] h-[40px] ${toggle === "Popular" ? "bg-green-400 rounded-full" : undefined}`} />
            </TouchableOpacity> <TouchableOpacity onPress={()=>dispatch(handleToggle({toggleTo:"Message"}))}>
                <Image source={icons.chat} className={`w-[40px] h-[40px] ${toggle === "Message" ? "bg-green-400 rounded-full" : undefined}`} />
            </TouchableOpacity> <TouchableOpacity onPress={()=>dispatch(handleToggle({toggleTo:"Profile"}))}>
                <Image source={icons.profile} className={`w-[40px] h-[40px] ${toggle === "Profile" ? "bg-green-400 rounded-full" : undefined}`} />
            </TouchableOpacity>
        </View>
    )
}