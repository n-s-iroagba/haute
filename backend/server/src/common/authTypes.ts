export interface DecodedVerificationToken{
    timeOfCreation:Date,
    email:string,
    role:Role
    type:TokenType

}
export  enum Role {
    INVESTOR = 'investor',
    ADMIN = 'admin'
    
    }

    export enum TokenType{
        VERIFICATION_TYPE = 'verification',
        LOGIN_TYPE = 'login',
        CHANGE_PASSWORD = 'changePassword'
    }

    export interface DecodedLoginToken {
        id: number;
        role:Role;
        username:string
        verificationStatus:boolean
        email:string
      }  

