import {
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { router } from 'expo-router';
import useAuth from '@/hook/useAuth';

const SignUpSchema = z.object({
  name: z
    .string({ required_error: 'Name field is required' })
    .min(4, 'Name should be at least 4 characters!'),
  email: z
    .string({ required_error: 'Email is required!' })
    .email({ message: 'Enter a valid email address' }),
  password: z.string({ required_error: 'Password is required' }),
});

type SignUpType = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { signUpWithOTP } = useAuth();

  const onSubmit = (data: SignUpType) => {
    if (isValid) {
      //signUpWithOTP({ email: data.email,password:data.password });
      setModalVisible(true);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[200px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
          <Text className="text-2xl px-5 text-black font-JakartaBold absolute bottom-3 left-0">
            Create Your Account
          </Text>
        </View>
        <View className="flex flex-col px-5 w-full h-full gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <View className="flex flex-col w-full gap-2">
                <Text className="font-JakartaSemiBold text-lg">Name</Text>
                <View className="flex flex-row items-center px-4 py-3 overflow-hidden bg-[#F6F8FA] rounded-full font-Jakarta">
                  <Image source={icons.person} className="w-6 h-6 mr-2 opacity-50" />
                  <TextInput
                    placeholder="Name"
                    className="flex-1 font-Jakarta text-base"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
                {errors.name && (
                  <Text className="text-red-500 text-xs">{errors.name.message}</Text>
                )}
              </View>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <View className="flex flex-col w-full gap-2">
                <Text className="font-JakartaSemiBold text-lg">Email</Text>
                <View className="flex flex-row items-center px-4 py-3 overflow-hidden bg-[#F6F8FA] rounded-full font-Jakarta">
                  <Image source={icons.email} className="w-6 h-6 mr-2 opacity-50" />
                  <TextInput
                    placeholder="Email"
                    className="flex-1 font-Jakarta text-base"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col items-center w-full px-5 gap-7">
            <View className="flex flex-row justify-center items-center w-full">
              <View className="w-1/3 h-[1px] bg-gray-300" />
              <Text className="mx-2">Or</Text>
              <View className="w-1/3 h-[1px] bg-gray-300" />
            </View>
            <TouchableOpacity className="flex flex-row items-center gap-4">
              <Image source={icons.google} className="w-[30px] h-[30px]" />
              <Text className="font-JakartaBold text-lg">Login with Google</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-center font-JakartaMedium">
            Already have an account?{' '}
            <Text
              onPress={() => router.push('/(auth)/sign-in')}
              className="font-JakartaBold text-teal-700"
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
      <OTPModal show={modalVisible} setShow={setModalVisible} name="Rahul" />
    </ScrollView>
  );
}

interface MyModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  name: string
}


const OTPModal = ({ show, setShow, name }: MyModalProps) => {
  const { varifyEmailOTP } = useAuth();
  const [otp, setOtp] = useState<string>('');

  const handleVerify = () => {
    if (otp.length === 6) {
      // const data = varifyEmailOTP({ email: "mr.goku.0619@gmail.com", name: name, token: otp });
      setShow(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-80 items-center shadow-lg">
          <Image source={icons.otpicon} className="w-16 h-16 mb-4" />
          <Text className="font-JakartaBold text-black text-lg mb-2">Enter OTP</Text>
          <Text className="text-gray-600 text-sm mb-4">
            We've sent an OTP to your email
          </Text>
          <TextInput
            placeholder="OTP"
            className="border border-gray-300 rounded-full px-4 py-2 mb-4 w-full text-center text-lg"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity
            className={`py-3 rounded-full w-full ${otp.length === 6 ? 'bg-blue-500' : 'bg-gray-300'}`}
            onPress={handleVerify}
            disabled={otp.length !== 6}
          >
            <Text className="text-white text-center font-JakartaBold text-lg">
              Verify
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow(false)} className="mt-3">
            <Text className="text-gray-500 text-sm">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
