import {api} from "./api";
import {User, UserPasswordData, UserProfileData} from "./types";
import {AxiosResponse} from 'axios';

class UsersAPI {

  static changeUserProfile = async (data: UserProfileData) => {
    return await api.put<string, AxiosResponse<User>>(`/user/profile`, data);
  }

  static changeUserAvatar = async (data: FormData) => {
    return await api.put<string, AxiosResponse<User>>(`/user/profile/avatar`, data);
  }

  static changeUserPassword = async (data: UserPasswordData) => {
    return await api.put<string, AxiosResponse<string>>(`/user/password`, data);
  }

  static getUserById = async (id: number) => {
    return await api.get<string, AxiosResponse<User>>(`/user/${id}`);
  }

}

export default UsersAPI;
