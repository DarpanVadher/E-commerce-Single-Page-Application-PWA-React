const baseUrl = 'http://localhost:5000/api/v1'

export const getData = (userId: number): string => {
    return baseUrl + '/data/' + userId
}
