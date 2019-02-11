import axios from 'axios'

class concernsService {

    static listAllConcerns(onSuccess, onError) {
        axios.get('/api/concern')
            .then(onSuccess)
            .catch(onError)
    }

    static selectConcernById(Id, onSuccess, onError) {
        axios.get(`/api/concern/${Id}`)
            .then(onSuccess)
            .catch(onError)
    }

    static upVoteConcern(data, onSuccess, onError) {
        axios.put(`/api/concern/upvote`,
            data)
            .then(onSuccess)
            .catch(onError)
    }

    static ListDepartments(onSuccess, onError) {
        axios
            .get(`/api/department`)
            .then(onSuccess)
            .catch(onError)
    }

    static InsertConcern(concernData, onSuccess, onError) {
        axios
            .post('api/concern', concernData)
            .then(onSuccess)
            .catch(onError)
    }
}

export default concernsService
