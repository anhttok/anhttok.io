import { getByName } from '@/shared/config'

const convertDataPage = (data) => {
    let descriptionCustomField = data.custom_fields ? getByName(data.custom_fields, 'description') : {}
    let tagFilters = data.custom_fields ? getByName(data.custom_fields, 'tag_filters') : []

    let result = {
        meta: {
            title: data.title,
            description: data.description,
        },
        content: {
            name: 'Demos',
            description: descriptionCustomField.value,
            tagFilters: tagFilters.json
        }
    }

    return result
}

export {
    convertDataPage
}