import { Token } from '../../../orm/entities/Token';
import CacheUtil from '../../../utils/cache.util';
import connection from '../../../configs/database.connect'

export async function updatePermission(roleId: string):Promise<void>{
    //update Permission of Role when assign new permission to role
}

export async function updateRole(userId: string):Promise<void>{
    //update Role of User when assign new role to user
}
