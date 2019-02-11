import axios from 'axios'

class FileStorageService {
    static upload(data, onSuccess, onError) {
        axios.post('api/file/upload',
            data,
            { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }

    static getAll(onSuccess, onError) {
        axios.get('api/file/getall',
            { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }

    static getByConcernId(id, onSuccess, onError) {
        axios.get('api/file/getbyconcern/' + id,
            { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }

    static delete(id, onSuccess, onError) {
        axios.delete('api/file/delete/' + id,
            { withCredentials: true })
            .then(onSuccess)
            .catch(onError)
    }
}

export default FileStorageService