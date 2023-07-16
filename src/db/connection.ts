import * as moongose from 'mongoose';

const connection = async () => {
    try {
        await moongose.connect(process.env.MONGO_URI);
        console.log('DB Succesfully Connected');
    } catch (error) {
        console.log(error);
    }
}

export default connection;