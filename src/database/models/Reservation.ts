import { sequelize } from '../sequelize';
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export type ReservationAttributes = InferAttributes<Reservation>;
export type ReservationCreationAttributes = InferCreationAttributes<Reservation>;

class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> {
  declare reservation_id: CreationOptional<number>

  declare Room_type: 'regular' | 'deluxe' | 'palatial';

  declare Customer_id: number;

  declare Hourly_rate: number;

  declare status: 'paid' | 'unpaid';

  declare Expected_checkin_time: Date;

  declare Expected_checkout_time: Date;
}

Reservation.init(
  {
    reservation_id: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    Room_type: {
      type: DataTypes.ENUM('regular', 'deluxe', 'palatial'),
      allowNull: false
    },
    Customer_id: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    Hourly_rate: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('paid', 'unpaid'),
      defaultValue: 'unpaid',
      allowNull: false
    },
    Expected_checkin_time: DataTypes.DATE(),
    Expected_checkout_time: DataTypes.DATE()
  },
  {
    tableName: 'reservations',
    timestamps: false,
    sequelize
  }
);

export { Reservation };
