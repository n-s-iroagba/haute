
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { AdminWallet, Manager } from './adminTypes';
import sequelize from '../orm_setup';


export class Investor extends Model<InferAttributes<Investor>, InferCreationAttributes<Investor>>{
declare id: CreationOptional<number>;
declare lastName: string;
declare firstName: string;
declare dateOfBirth: Date;
declare email: string;
declare bank: string;
declare password: string;
declare gender: string;
declare country: string;
declare referralCode: number | null;
declare verificationFeeAccount: string|null
declare verificationFee: number | null;
declare verificationFeeAccountType: string|null;
declare verificationToken: string | null;
declare referrerId: number | null;
declare isVerified: boolean | null;
declare changePasswordToken: string | null;
declare investment: NonAttribute<Investment>;
declare referrals: NonAttribute<Referral[]>;
}
  
export class Investment extends Model<InferAttributes<Investment>, InferCreationAttributes<Investment>> {
  declare id: CreationOptional<number>;
  declare amount: number;
  declare earnings: number;
  declare amountDeposited: number
  declare investmentDate: Date | null;
  declare isPaused: boolean;
  declare investorId:ForeignKey<Investor['id']>
  declare investor: NonAttribute<Investor>
  declare manager: NonAttribute<Manager|null>
  declare managerId: ForeignKey<Manager['id']|null>
  declare depositWallet: NonAttribute<DepositWallet>  
  }

 export class DepositWallet extends Model<InferAttributes<DepositWallet>, InferCreationAttributes<DepositWallet>>{
declare id: CreationOptional<number>;
declare identification: string;
declare investmentId:ForeignKey<Investment['id']>
declare investment: NonAttribute<Investment>
declare depositMeans:string
 }

export class Referral extends Model<InferAttributes<Referral>, InferCreationAttributes<Referral>>  {
declare id: CreationOptional<number>;
declare amount: CreationOptional<number>;
declare referrerId:ForeignKey<Investor['id']>
declare referrer: NonAttribute<Investor>
declare referredId:ForeignKey<Investor['id']>
declare settled: boolean|null
}
export class PendingPromo extends Model<InferAttributes<PendingPromo>, InferCreationAttributes<PendingPromo>>  {
  declare id: CreationOptional<number>;
  declare amount: number;
  declare settled: boolean|null
  declare investorId:ForeignKey<Investor['id']>
  declare investor: NonAttribute<Investor>

  }

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>>   {
declare id: CreationOptional<number>;
declare title:'Earnings'|'Bonus Payout'|'How To Deposit'|'Referral Registration'|'Referral bonus imbursement'|'Promo Bonus'|'Investment deposit'|
    'Investment Deposit'|'Incomplete Investment Deposit'|'Investment Paused' |'Investment Continued'|'Promo Notification'|'How to invest'|'Promo Extension';
declare message:string

declare read:boolean|null
declare investorId:ForeignKey<Investor['id']>
declare investor: NonAttribute<Investor>
 }

 export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>>  {
declare id: CreationOptional<number>;
declare amount: number;
declare participatingAccount: 'Haute'|'Your Wallet';
declare narration: string;
declare date: Date;
declare type: 'Debit' | 'Credit';
declare investorId:ForeignKey<Investor['id']>
declare investor: NonAttribute<Investor>

}
PendingPromo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    settled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

  }, { sequelize, modelName: 'PendingPromo' }
)
Investor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  verificationFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verificationFeeAccountType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verificationFeeAccount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verificationToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    referrerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    changePasswordToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
  },
  { sequelize, modelName: 'Investor' }
);


DepositWallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    identification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    depositMeans:{
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  { sequelize, modelName: 'DepositWallet' }
);

Investment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    earnings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    amountDeposited: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    investmentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'Investment' }
);

Referral.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0,
          },
          referredId: {
              type: DataTypes.INTEGER, // Adjust this to match the foreign key type
              allowNull: false,
             
            },
            settled: {
              type: DataTypes.BOOLEAN, // Adjust this to match the foreign key type
              allowNull: false,
              defaultValue: false,
             
            },
        },
        { sequelize, modelName: 'Referral' }
    
      );
  
 
Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Notification' }
);


Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    participatingAccount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    narration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Debit', 'Credit']],
      },
    },
  },
  { sequelize, modelName: 'Transaction' }
);

DepositWallet.belongsTo(Investment,{
  foreignKey: 'investmentId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Investment.belongsTo(Investor,{
  foreignKey: 'investorId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Investment.belongsTo(Manager,{
  foreignKey: 'managerId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Notification.belongsTo(
  Investor,
  {
    foreignKey: 'investorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
)
Transaction.belongsTo(
  Investor,
  {
    foreignKey: 'investorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
)
Referral.belongsTo(
  Investor,
  {
    foreignKey: 'referrerId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
)
Referral.belongsTo(
  Investor,
  {
    foreignKey: 'referredId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
)

export { Manager };
