import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db";
import { Workshop as WorkshopInterface } from "../../interfaces/index.interfaces"

// Cambio 1: Definimos una interfaz para los atributos opcionales del modelo
interface WorkshopCreationAttributes extends Optional<WorkshopInterface, "id"> {}

// Cambio 2: Extendemos el modelo con la interfaz WorkshopCreationAttributes
class WorkshopModel extends Model<WorkshopInterface, WorkshopCreationAttributes> {
  // Cambio 3: Definimos los campos con sus tipos adecuados y si son opcionales o no
  public id!: number;
  public workshopNumber!: number;
  public dateStart!: Date;
  public dateEnd!: Date;
  public inviteId!: number;
  public dayOne!: number | null;
  public dayTwo!: number | null;
  public dayThree!: number | null;
  public dayFour!: number | null;
  public dayFive!: number | null;
  public daySix!: number | null;
  public daySeven!: number | null;
  public dayEight!: number | null;
  public dayNine!: number | null;
  public dayTen!: number | null;
  public dayEleven!: number | null;
  public dayTwelve!: number | null;
}

// Cambio 4: Inicializamos el modelo con los atributos y opciones de Sequelize
WorkshopModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    workshopNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    inviteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dayOne: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayTwo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayThree: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayFour: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayFive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    daySix: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    daySeven: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayEight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayNine: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayTen: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayEleven: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dayTwelve: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Workshop", // Cambio 5: Nombre del modelo
    tableName: "Workshops", // Cambio 6: Nombre de la tabla en la base de datos
    timestamps: false, // Cambio 7: Deshabilitamos los campos createdAt y updatedAt
  }
);

// Cambio 8: Exportamos el modelo para su uso en otras partes de la aplicación
export default WorkshopModel 