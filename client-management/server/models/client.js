module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subscriptionStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        subscriptionEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Client.beforeCreate(async (client) => {
        client.password = await bcrypt.hash(client.password, 10);
    });

    return Client;
};
