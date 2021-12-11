import { Constants } from '../constants/constants';

export class UserUtils {
    public static isSuperUser(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_SUPERUSER) {
            result = true;
        }

        return result;
    }

    public static isPengurusRT(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_PENGURUS_RT) {
            result = true;
        }

        return result;
    }

    public static isBendaharaRT(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_BENDAHARA_RT) {
            result = true;
        }

        return result;
    }

    public static isKetuaRT(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_KETUA_RT) {
            result = true;
        }

        return result;
    }

    public static isSekretarisRT(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_SEKRETARIS_RT) {
            result = true;
        }

        return result;
    }

    public static isPengurusRW(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_PENGURUS_RW) {
            result = true;
        }

        return result;
    }

    public static isAdminRT(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_ADMIN_RT) {
            result = true;
        }

        return result;
    }

    public static isWarga(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_WARGA) {
            result = true;
        }

        return result;
    }
}
