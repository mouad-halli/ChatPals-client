import { RelationshipType } from "./relationship"

export interface userType {
    firstname: string
    lastname: string
    email: string
    imgUrl: string
}

export interface updateUsertype extends Partial<Omit<userType, 'imgUrl'> & {password: string}> {}

export interface userDto extends userType { _id: string }

export interface userDtoWithfilter extends userDto { display: boolean }

export interface userAndRelationship extends Omit<userDto, 'email'> { relationship: RelationshipType }

export interface userAndRelationshipWithFilter extends userAndRelationship { display: boolean }
