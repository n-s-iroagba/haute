import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute,} from 'sequelize';
import { Investment } from './investorTypes';
import sequelize from '../orm_setup';
import { customError } from '../helpers/commonHelpers';

export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare password: string;
  declare email: string;
  declare changePasswordToken?: string | null;
  declare verificationToken?: string | null;
  declare isVerified: boolean|null;
 
}

export class AdminWallet extends Model<InferAttributes<AdminWallet>, InferCreationAttributes<AdminWallet>> {
  declare id: CreationOptional<number>;
    declare identification: string;
    declare currency: string|null;
    declare identificationType:string;
    declare depositMeans:string
  }

export class Manager extends Model<InferAttributes<Manager>, InferCreationAttributes<Manager>> {
  declare id: CreationOptional<number>;
  declare lastName: string;
  declare firstName: string;
  declare image: Buffer;
  declare minimumInvestmentAmount: number;
  declare percentageYield: number;
  declare duration: number;
  declare qualification:string
 declare investments: NonAttribute<Investment []>
 
}
  
export class Promo extends Model<InferAttributes<Promo>, InferCreationAttributes<Promo>> {
  declare id: CreationOptional<number>;
    declare startDate: Date;
    declare endDate: Date;
    declare bonusPercent: number;
}

AdminWallet.init(
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
    depositMeans: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isRequiredForCryptoWallet(value:string) {
          if (this.identificationType === 'CRYPTOCURRENCY WALLET' && !value) {
            throw customError('Currency is required when identification type is CRYPTO_WALLET',400);
          }
        },
      },
    },
    identificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'AdminWallet', 
    indexes: [
      {
        unique: true,
        fields: ['currency'],
        name: 'unique_currency_index', // Custom index name for the unique pair
      },
    ],
  }
);
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    changePasswordToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    verificationToken: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
   { sequelize, 
    modelName: 'Admin', 
    validate: {
      async uniqueCheck() {
        const count = await Admin.count();
        if (count > 2) {
          throw new Error('There can only be one admin');
        }
      },
    }
  }
);

Manager.init(
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
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.BLOB('long'),
      allowNull: false,
    },
    minimumInvestmentAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentageYield: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },
  {
    sequelize, 
    modelName: 'Manager', 
  }
)

Promo.init(
  {
    startDate: {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    bonusPercent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Promo',
    hooks: {
      beforeCreate: async (promo, options) => {
        const existingPromo = await Promo.findOne();
        if (existingPromo) {
          throw customError('Only one promo can exist at a time',409);
        }
      },

    },
  }
);