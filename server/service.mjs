import { response } from 'express';
import Sequelize from 'sequelize';
import 'uuid';

function valid(Model, body) {
    return true;
}

async function getRecords(Model, req, res) {
    try {
        let records = await Model.findAll()
        console.log('records', JSON)
        if (records.length > 0) {
            res.status(200).json(records)
        } else {
            res.status(204).send()
        }
        return records
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json(error)
    }
}

async function postRecords(Model, req, res) {
    console.log("req.body: " + JSON.stringify(req.body))
    try {
        if (valid(Model, req.body)) {
            let record = await Model.create(req.body)
            res.status(201).location(`http://${req.headers.host}${req.baseUrl}${req.url}/${record.id}`).send()
            return record
        } else {
            res.status(400).send
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

async function deleteRecords(Model, req, res) {
    try {
        await Model.truncate()
        res.status(204).send()
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id)
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).send()
        }
        return record
    } catch (error) {
        res.status(500).json(error)
    }
}

async function putRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id)
        if (record) {
            if (valid(Model, req.body)) {
                await record.update(req.body)
                res.status(204).send()
            } else {
                res.status(404).send()
            }
        }
    } catch (error) {
            res.status(500).json(error)
        }
}

async function deleteRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id)
        if (record) {
            await record.destroy()
            res.status(204).send()
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}




export { getRecords, postRecords, deleteRecords, getRecord, deleteRecord, putRecord }