import axios from "axios";
export class    Api {
    static async create(resourceUrl: string, data: any) {
        try {
            const response = await axios.post(resourceUrl, data);
            return response.data;
        } catch (error) {
            console.error('Error creating resource:', error);
            throw new Error('Unable to create resource');
        }
    }

    static async read(resourceUrl: string) {
        try {
            const response = await axios.get(resourceUrl);
            return response.data;
        } catch (error) {
            console.error('Error reading resource:', error);
            throw new Error('Unable to read resource');
        }
    }

    static async update(resourceUrl: string, data: any) {
        try {
            const response = await axios.put(resourceUrl, data);
            return response.data;
        } catch (error) {
            console.error('Error updating resource:', error);
            throw new Error('Unable to update resource');
        }
    }

    static async delete(resourceUrl: string) {
        try {
            const response = await axios.delete(resourceUrl);
            return response.data;
        } catch (error) {
            console.error('Error deleting resource:', error);
            throw new Error('Unable to delete resource');
        }
    }
}