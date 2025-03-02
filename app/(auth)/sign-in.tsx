import {
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { router } from 'expo-router';

const SignInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Enter a valid email'),
  password: z
    .string()
    .min(3, { message: 'Password should be at least 4 characters long' }),
});

type SignInType = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: SignInType) => {
    // Handle form submission here
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[200px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
          <Text className="text-2xl px-5 text-black font-JakartaBold absolute bottom-3 left-0">
            Welcome
          </Text>
        </View>
        <View className="flex flex-col px-5 w-full h-full justify-between">
          <View className="flex flex-col w-full gap-5 mt-8">
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <View className="flex flex-col w-full gap-2">
                  <Text className="font-JakartaSemiBold text-lg">Email</Text>
                  <View className="flex flex-row items-center px-4 py-3 overflow-hidden bg-[#F6F8FA] rounded-full font-Jakarta">
                    <Image source={icons.person} className="w-6 h-6 mr-2 opacity-50" />
                    <TextInput
                      placeholder="Email"
                      className="flex-1 font-Jakarta text-base"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                  {errors.email && (
                    <Text className="text-red-500 text-xs">{errors.email.message}</Text>
                  )}
                </View>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <View className="flex flex-col w-full gap-2">
                  <Text className="font-JakartaSemiBold text-lg">Password</Text>
                  <View className="flex flex-row items-center px-4 py-3 overflow-hidden bg-[#F6F8FA] rounded-full font-Jakarta">
                    <Image source={icons.lock} className="w-6 h-6 mr-2 opacity-50" />
                    <TextInput
                      placeholder="Password"
                      className="flex-1 font-Jakarta text-base"
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                      <Image
                        source={showPassword ? icons.openEye : icons.eyecross}
                        className="w-6 h-6 opacity-50"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="text-red-500 text-xs">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <TouchableOpacity
              className="bg-blue-500 py-3 rounded-full mt-6"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white text-center font-JakartaBold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
            <View className="flex flex-col items-center w-full px-5 gap-7 mb-8">
              <View className="flex flex-row justify-center items-center w-full">
                <View className="w-1/3 h-[1px] bg-gray-300" />
                <Text className="mx-2">Or</Text>
                <View className="w-1/3 h-[1px] bg-gray-300" />
              </View>
              <TouchableOpacity className="flex flex-row items-center gap-4">
                <Image source={icons.google} className="w-[30px] h-[30px]" />
                <Text className="font-JakartaBold text-lg">Login with Google</Text>
              </TouchableOpacity>
              <Text className="text-center font-JakartaMedium">
                Don't have an account?{' '}
                <Text
                  onPress={() => router.push('/(auth)/sign-up')}
                  className="font-JakartaBold text-teal-700"
                >
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}