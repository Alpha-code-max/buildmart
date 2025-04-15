import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

// Only throw error if we're not in a build process
if (!MONGODB_URI && process.env.NODE_ENV !== 'production') {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (!MONGODB_URI) {
        return { db: null, client: null };
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db('shopcrud'),
            };
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Default export for backward compatibility
export default connectToDatabase;