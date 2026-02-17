class NotFoundError extends Error {
    constructor(resourceType, id) {
        if (id) super(`${resourceType} with id ${id} was not found!`)
        else super(`${resourceType} was not found!`)
        this.name = 'NotFoundError'
    }
}

export default NotFoundError
