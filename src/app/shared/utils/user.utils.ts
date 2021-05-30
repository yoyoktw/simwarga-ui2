import { Constants } from '../constants/constants';

export class UserUtils {
    public static isSuperUser(userLevel?: String): boolean {
        let result = false;
        if (userLevel && userLevel.toLowerCase() === Constants.USER_SUPERUSER) {
            result = true;
        }

        return result;
    }
}
