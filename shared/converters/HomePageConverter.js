import assign from 'lodash.assign'
import { getByName } from '@/shared/config'

let welcomeDefault = {
  "hello": "Hey folks, I'm",
  "names": [
    "Tran Anh",
    "Web Designer",
    "UI Specialist"
  ],
  upwork: 'https://www.upwork.com/freelancers/~0148625825c92e8e11',
  email: 'anhttok@gmail.com',
  description:
    "I'm a senior web developer with more than 6 years of software development experience.",
}

let projectDefault = {
  name: '',
  projects: ['https://picsum.photos/id/123/1200/600'],
}

let experiencesDefault = [
  {
    "name": "Best Studio",
    "year": "2019",
    "location": "Best Studio",
    "description": "Proin ornare non purus ut rutrum. Nulla facilisi. Aliquam laoreet libero ac pharetra feugiat. Cras ac fermentum nunc, a faucibus nunc."
  }
]

let educationsDefault = [
  {
    "name": "Mobile Web",
    "year": "2017",
    "location": "Master Design",
    "description": "Please tell your friends about Tooplate website. That would be very helpful. We need your support."
  }
]

const convertDataPage = (data) => {
  let welcomeCustomField = data.custom_fields
    ? getByName(data.custom_fields, 'welcome')
    : {}
  let projectCustomField = data.custom_fields
    ? getByName(data.custom_fields, 'project')
    : {}
  let experiencesCustomField = data.custom_fields
    ? getByName(data.custom_fields, 'experiences')
    : []
  let educationsCustomField = data.custom_fields
    ? getByName(data.custom_fields, 'educations')
    : []

  let result = {
    meta: {
      title: data.title,
      description: data.description,
    },
    content: {
      welcome: assign(welcomeDefault, welcomeCustomField.json),
      project: assign(projectDefault, projectCustomField.json),
      experiences: assign(experiencesDefault, experiencesCustomField.json),
      educations: assign(educationsDefault, educationsCustomField.json),
    },
  }

  return result
}

export { convertDataPage }
