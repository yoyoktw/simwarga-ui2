export interface UserDto {
    username: string;
    id: string;
    email: string;
    isActive?: boolean;
    userLevel?: string;
    propinsi?: number;
    kabkota?: number;
    kecamatan?: number;
    desa?: number;
    rw?: number;
    rt?: number;
}
