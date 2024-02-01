export const searchDeveloper = (searchText) => {
    const queryString = new URLSearchParams({ searchText: searchText }).toString()
    location.href=`developer?${queryString}`
}