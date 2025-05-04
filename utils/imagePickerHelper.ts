import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export type ImagePickResult = {
  uri: string;
  base64: string;
  type: string;
} | null;

export const pickImage = (): Promise<ImagePickResult> => {
  return new Promise(async (resolve) => {
    const requestPermission = async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      return cameraPermission.granted && mediaPermission.granted;
    };

    const permissionGranted = await requestPermission();
    if (!permissionGranted) {
      Alert.alert('Quyền bị từ chối', 'Bạn cần cấp quyền để sử dụng chức năng này');
      resolve(null);
      return;
    }

    Alert.alert(
      'Chọn ảnh đại diện',
      'Bạn muốn chọn ảnh từ đâu?',
      [
        {
          text: 'Máy ảnh',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              base64: true,
              quality: 1,
            });

            if (!result.canceled) {
              const image = result.assets[0];
              resolve({
                uri: image.uri,
                base64: image.base64 || '',
                type: image.type || 'image',
              });
            } else {
              resolve(null);
            }
          },
        },
        {
          text: 'Thư viện',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              base64: true,
              quality: 1,
            });

            if (!result.canceled) {
              const image = result.assets[0];
              resolve({
                uri: image.uri,
                base64: image.base64 || '',
                type: image.type || 'image',
              });
            } else {
              resolve(null);
            }
          },
        },
        {
          text: 'Huỷ',
          style: 'cancel',
          onPress: () => resolve(null),
        },
      ],
      { cancelable: true }
    );
  });
};
