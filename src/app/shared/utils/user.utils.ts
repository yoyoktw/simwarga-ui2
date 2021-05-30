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
}
