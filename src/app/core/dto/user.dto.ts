export interface UserDto {
    username: string;
    id?: string;
    email: string;
    isActive?: boolean;
    userLevel?: string;
    propinsi?: number;
    namaPropinsi?: number;
    kabkota?: number;
    deskripsiKabKota?: number;
    kecamatan?: number;
    namaKecamatan?: number;
    desa?: number;
    namaDesa?: number;
    rw?: number;
    namaRW?: number;
    rt?: number;
    namaRT?: number;
    password?: string;
}

export interface ActivateUserDto {
    username: string;
}

export interface RegistrationStatus {
    success: boolean;
    message: string;
}

export interface ChangePasswordUserDto {
    username: string;
    password: string;
}
