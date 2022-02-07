import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { config } from 'dotenv';
config({})
let sequelize;

if (process.env.MODE === 'development') {
    sequelize = new Sequelize({
        storage: './database.db',
        dialect: 'sqlite',
        logging: false,
        timestamps: false
    });
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
     })
}

const Playlist = sequelize.define('playlist', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    descriere: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,10000]
        }
    }
    //vom folosi timestamp-ul creat de sequelize pentru data
})

const Song = sequelize.define('song', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5,1000]
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    stil: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['pop', 'alternativ', 'rock', 'classic' ]]
        }
    }
})


// Playlist.hasMany(Song)
// Song.belongsTo(Playlist)

Playlist.belongsToMany(Song, { through: 'PlaylistSong' })
Song.belongsToMany(Playlist, { through: 'PlaylistSong' })

async function intitialize() {
    await sequelize.authenticate()
    // await sequelize.sync({ alter: true })
    await sequelize.sync()
}

export {
    intitialize,
    Playlist,
    Song
}