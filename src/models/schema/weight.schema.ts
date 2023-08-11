import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
  } from "sequelize";
  import db from "../../db/index";
import { UserSchema } from "./index.schema";


  class Weight extends Model<InferAttributes<Weight>, InferCreationAttributes<Weight>>{
    declare id: CreationOptional<number>;
    declare UserId: ForeignKey<UserSchema['id']> ;
    declare current_weight: number;
    declare objective_weight: number;
    declare created_at: Date;
    declare updated_at: Date;

    public static associate(){
      Weight.belongsTo(UserSchema)
    }
  }

  Weight.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      current_weight: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      objective_weight: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false,
      },
      UserId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
    }, {sequelize: db, modelName: 'Weight', tableName: 'weights', timestamps: false}
  );

  export default Weight