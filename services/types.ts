// types.ts (hoặc ở nơi bạn khai báo navigation params)
export type RootStackParamList = {
    AllContacts: undefined;
    ContactDetail: { id: string };
  };

  export type RootStackAvatarParamList = {
    Profile: undefined;
    ConfirmAvatar: { image: { uri: string; base64: string; type: string } };
    Login: undefined;
  };
  
  export type RootStacFavoritekParamList = {
    Favorites: undefined;
    ContactDetail: { id: string };
  };
  