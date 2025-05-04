import { PermissionsAndroid, Platform, Alert } from 'react-native';

export async function requestLibraryPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Quyền truy cập ảnh',
          message: 'Ứng dụng cần quyền truy cập ảnh để chọn avatar.',
          buttonPositive: 'Đồng ý',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể xin quyền truy cập ảnh');
      return false;
    }
  }
  return true;
}
