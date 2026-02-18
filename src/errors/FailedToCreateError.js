class FailedToCreateError extends Error {
    constructor(resourceType) {
        super(`Failed to create ${resourceType}!`)
        this.name = 'FailedToCreateError'
    }
}

export default FailedToCreateError
